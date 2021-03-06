<?php
class DPics extends DAbstract {
    const nom = 'Pics';

    public function show() {
        if ($this -> gererVide())
            return;

        CHead::addJs('jquery-ui-1.8.19.custom.min');
        CHead::addJs('highstock');
        CHead::addJs('exporting');
        CHead::addJs('bootstrap-modal');
        CHead::addJs('bootstrap-tabs');
        CHead::addJs('miniChart');
        CHead::addJs('showPics');
        CHead::addJs('grid');
        
        
        $dataToAdd = array();
        $timestamps = array();
        $rawData = array();

        foreach ($this->data as $data) {
            $timestamps[] = $data['timestamp'];

            foreach ($this->structure as $k => $v) {

                if ($k !== 'timestamp')
                    $rawData[$k][] = $data[$k];
            }
        }

        $addCharts = "<script>\n";

        foreach ($this->structure as $k => $v) {
            if ($k !== 'timestamp') {
                for ($i = 0; $i < count($timestamps); $i++) {

                    $dataToAdd[] = $rawData[$k][$i];

                }
                $addCharts .= "addChart('" . $k . "', new Array(" . implode(',', $dataToAdd) . "), new Array(" . implode(',', $timestamps) . "));\n";
            }
        }

        $addCharts .= "</script>\n";

        echo <<<END
		
		<div id="holder" style="display : none;"></div>
		
		<div class="" id="pics" style="margin:20px;float:left;"><div id="picsMax"><h3> Pics Max </h3></div><div id="picsMin"><h3> Pics Min </h3></div></div>
		
END;

        echo $addCharts;

        $this -> getPics();

    }

    private function getPics() {

        $releve = R::findOne('releve', 'name = ?', array( $_GET['nom']));
        
        if($releve == NULL) {
            $releve = CompositionReleve::getCReleve($_GET['nom']);
        }
        
        $endTime = $releve -> PicEndTime;
        
        if($endTime != NULL) {
            echo "<script> setViewLength(". $releve -> PicBeginTime .", ". $releve -> PicEndTime ."); </script>\n";
        }

        if ($releve -> PicMinLine != NULL) {
            echo "<script> setMinLine(". $releve -> PicMinLine ."); </script>\n";
        }
        if ($releve -> PicMaxLine != NULL) {
            echo "<script> setMaxLine(".$releve -> PicMaxLine ."); </script>\n";
        }
        echo '<script> initPics() </script>';
    }

}
?>