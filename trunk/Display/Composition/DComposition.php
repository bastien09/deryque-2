<?php
class DComposition extends DAbstract {
    const nom = 'Composition';

    public function show() {
        if ($this -> gererVide())
            return;

        CHead::addJs('jquery-ui-1.8.19.custom.min');
        CHead::addJs('highstock');
        CHead::addJs('exporting');
        CHead::addJs('bootstrap-modal');
        CHead::addJs('bootstrap-tabs');
        CHead::addJs('composition');
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

        $addCharts = "<script>";

        foreach ($this->structure as $k => $v) {
            if ($k !== 'timestamp') {
                for ($i = 0; $i < count($timestamps); $i++) {

                    $dataToAdd[] = $rawData[$k][$i];

                }
                $addCharts .= "addChart('" . $v . "', new Array(" . implode(',', $dataToAdd) . "), new Array(" . implode(',', $timestamps) . "));";
            }
        }

        $addCharts .= "</script>";

        echo <<<END
		
		<div id="holder" style="display : none;"></div>
		
		<div class="" id="composition" style="margin:20px;"></div>
		
END;

    
    echo $addCharts;
    
    $this -> getCompositions();
    
    }
    
    private function getCompositions() {
    
    	$compositions = Composition::getCompositions($_GET['nom']);
    
    	foreach ($compositions as $composition) {
    		echo "<script> addComposition('". $composition->name . "'," . $composition->begin . "," . $composition->end .") </script>";
    	}
    
    
    }
}