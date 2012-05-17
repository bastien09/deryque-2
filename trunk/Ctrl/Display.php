<?php
class Display {
    /*private static function tableauRandom($nb = 10, $max = 100){
     for($i = 0 ; $i < $nb ; $i++){
     $tab["abscisse"][$i] = rand(1, $max);
     $tab["ordonnee"][$i] = rand(1, $max);
     }
     return $tab;
     }
     private static function TriPoint($tab){
     array_multisort($tab["abscisse"], SORT_ASC, $tab["ordonnee"]);
     return $tab;
     }*/

    public function index() {
        CNavigation::setTitle('Super page');
        CNavigation::setDescription('Tout reste à faire');
    }

    private function vue_commune() {

        if (isset($_GET['multireleve']) && $_GET['multireleve'] === "true") {
            
            $g = NULL;
            $d = NULL;
            $n_datamod = NULL;
            
            $mreleves = CompositionReleve::getCReleve($_REQUEST['nom']);

            $simpleReleves = R::related($mreleves, "releve");


            foreach ($simpleReleves as $simpleReleve) {
                
                $releve = DataMod::getReleve($simpleReleve->name, $_SESSION['bd_id']);
                
                if ($g === NULL) {                   
                    
                    
                    $n_datamod = DataMod::loadDataType($releve['modname']);

                    $type = isset($_REQUEST['type']) ? $_REQUEST['type'] : (empty($n_datamod -> display_prefs) ? 'default' : $n_datamod -> display_prefs[0]);
                    
                    $d = DisplayMod::loadDisplayType($type);
                    
                    if (!$d) {
                       CTools::hackError();
                    }

                    $g = $d -> instancier();

                }

                foreach ($n_datamod -> getVariables() as $key => $value) {
                    if($key != 'timestamp') {
                        $g -> structure[ sha1($releve['name']).$key] = $releve['name'] . ' [ '. $value . ' ]';
                    } else {
                        $g -> structure['timestamp'] = $value;
                    }
                }
                
                foreach (R::getAll('select * from d_' . $n_datamod -> dossier . ' where user_id = ? and releve_id = ?', array($_SESSION['bd_id'], $releve['id'])) as $index => $data) {
                    foreach ($data as $key => $value) {
                        if($key != 'timestamp') {
                        $g -> data[$index][sha1($releve['name']).$key] = $value;
                        } else {
                           $g -> data[$index][$key] = $value;
                        }
                    }
                }
                
                

            }

            return array($g, $d, $n_datamod, $mreleves);
            
        } else {

            $releve = isset($_REQUEST['nom']) ? DataMod::getReleve($_REQUEST['nom'], $_SESSION['bd_id']) : false;

            if (!$releve) {
                CTools::hackError();
            }

            $n_datamod = DataMod::loadDataType($releve['modname']);

            $type = isset($_REQUEST['type']) ? $_REQUEST['type'] : (empty($n_datamod -> display_prefs) ? 'default' : $n_datamod -> display_prefs[0]);
            $d = DisplayMod::loadDisplayType($type);

            if (!$d) {
                CTools::hackError();
            }

            $g = $d -> instancier();

            /*$salut = 42;
             $coucou = 'salut';
             echo $$coucou;*/

            $g -> structure = $n_datamod -> getVariables();
            $g -> data = R::getAll('select * from d_' . $n_datamod -> dossier . ' where user_id = ? and releve_id = ?', array($_SESSION['bd_id'], $releve['id']));
            
            return array($g, $d, $n_datamod, $releve);

        }
    }

    public function view() {
        $r_vue = $this -> vue_commune();
        $r_vue[0] -> show();
        CNavigation::setTitle($r_vue[0]::nom . ' du relevé «' . $_REQUEST['nom'] . '»');
        CNavigation::setDescription($r_vue[3]['description']);
        DisplayView::showBackButtons(CNavigation::generateUrlToApp('Data', 'view', array('nom' => $_REQUEST['nom'])));
    }

    public function iframe_view() {
        define('NO_HEADER_BAR', true);
        CHead::addCss('iframe_view');

        $r_vue = $this -> vue_commune();
        $data = DisplayMod::getDisplayTypes();
        DisplayView::showGraphChoiceMenu($data, false, $r_vue[2] -> display_prefs, $r_vue[1] -> dossier, 'iframe_view');

        echo '<h2>',    htmlspecialchars($r_vue[0]::nom), ' du relevé «',
        htmlspecialchars($_REQUEST['nom']), '» <small>',
        htmlspecialchars($r_vue[3]['description']), '</small></h2>';
        $r_vue[0] -> show();
    }

}
?>
