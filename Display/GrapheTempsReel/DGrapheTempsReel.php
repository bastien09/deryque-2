<?php
class DGrapheTempsReel extends DAbstract {
    const nom = 'Graphe RT';

    public function show() {
        if ($this -> gererVide())
            return;

        CHead::addJs('jquery-ui-1.8.19.custom.min');
        //CHead::addJs('jquery.flot.min');
        //CHead::addJs('Plot_js/jquery_realtimelinechart');
        CHead::addJs('highstock');
        CHead::addJs('exporting');
        CHead::addJs('multiple_charts');
        CHead::addJs('bootstrap-modal');
        CHead::addJs('bootstrap-tabs');
        CHead::addJs('jquery.cookie');
        CHead::addJs('jquery.jsoncookie');
        CHead::addJs('marqueurs');
        CHead::addJs('pics');

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
                $addCharts .= "addChart('" . $k . "', new Array(" . implode(',', $dataToAdd) . "), new Array(" . implode(',', $timestamps) . "));";
            }
        }

        $addCharts .= "</script>";

        // 			<script>
        // 		jQuery(document).ready(function(){
        // 			$('#head').click(function() {
        // 				$(this).next().toggle('slow');
        // 				return false;
        // 			}).next().hide();
        // 		});
        // 			$(function() {
        // 				$( "#accordion" ).accordion({
        // 					collapsible: true
        // 				});
        // 			});

        // 		</script>
        echo <<<END
		<div id="englober" style="height:650px;">
			<div class="tab-pane active" id="holder" style="margin:20px;float:left;"></div>
			<div id='accordion'>
				<div class="well">
					<h3 id="head">Controles</h3>
						<div style="text-align:center"><a href="#" class="btn" onClick="if (run) {run = false; } else {run = true;$.each(charts, function (i, chart) { requestData(lastCall, i, dataCharts[i]); });}"><img src="/InspecteurDeryque/Img/icons/key_play_pause.png" alt="Lecture/pause" /></a>
						<a href="#" class="btn" onClick="Dezoom();"><img src="/InspecteurDeryque/Img/icons/zoom_out.png" alt="Dezoom" /></a></div>							
					    
					<ul class="tabs" data-tabs="tabs">
						<li class="active"><a href="#divMarqueurs"> Marqueurs </a></li>
						<li><a href="#divPics"> Detection de pics </a></li>
					</ul>
					<div id="my-tab-content" class="tab-content">
						<div id="divMarqueurs" class="tab-pane active">	
							<ol id="listeMarqueursCourants"></ol>
							<select id="listeMarqueurs" class="span3" onChange="description()"></select>
							<a class="btn" onClick="setAction('marqueurs')"><img src="/InspecteurDeryque/Img/icons/Cible.png" alt="Placer" /></a>
							<a class="btn" data-controls-modal="popup_ajouter" data-keyboard="true"><img src="/InspecteurDeryque/Img/icons/plus.png" alt="Ajouter" /></a> 
							<a class="btn" data-controls-modal="popup_supprimer" onClick="$('#marqueur').text($('#listeMarqueurs').val())"><img src="/InspecteurDeryque/Img/icons/supprimer.png" alt="Supprimer" /></a>
							
							<div id="desc" style="text-align:center"></div>
						</div>
						<div id="divPics" class="tab-pane">
							<table id="tablePics">
								<tr>
								<td> Seuil maximum : <span id="picMax"></span></td><td><a class="btn" onClick="setAction('pics');minOrMax='max'"><img src="/InspecteurDeryque/Img/icons/Cible.png" alt="Placer" /></a><a class="btn" onClick="rmLigne('max')"><img src="/InspecteurDeryque/Img/icons/supprimer.png" alt="Supprimer" /></a></td>
								</tr><tr>
								<td> Seuil minimum : <span id="picMin"></span></td><td><a class="btn" onClick="setAction('pics');minOrMax='min'"><img src="/InspecteurDeryque/Img/icons/Cible.png" alt="Placer" /></a><a class="btn" onClick="rmLigne('min')"><img src="/InspecteurDeryque/Img/icons/supprimer.png" alt="Supprimer" /></a></td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<div class="well">
					<h3 id="head">Informations</h3>
					<div class="row">
						<div class="span3">
							<ul>				
							    <li>Information : bla</li>
							</ul>
					    </div>
					    <div class="span3">
							<ol id="infos">
							</ol>								
					    </div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- Modaux -->
		<div id="popup_ajouter" class="modal hide fade">
          <div class="modal-header">
            <a href="#" class="close">x</a>
            <h3>Ajouter un marqueur</h3>
          </div>
          <div class="modal-body">
          <fieldset>
          	<div>
	            <label for="nomMarqueur" > Nom </label>
	            <input id="nomMarqueur" class="span3" />
            </div>
          	<div >
	            <label for="abbMarqueur" > Abbr�viation </label>
	            <input id="abbMarqueur" class="span3" />
            </div>
          	<div>
	            <label for="descMarqueur" > Description </label>
	            <textarea id="descMarqueur"></textarea>
            </div>
            <div>
            	<label for="coulMarqueur"> Couleur </label>
	            <select id="coulMarqueur" class="span3">
	            <option value="black">Noir</option>
	            <option value="red">Rouge</option>
	            <option value="blue">Bleu</option>
	            <option value="green">Vert</option>
	            <option value="yellow">Jaune</option>
	            </select>
            </div>
          </fieldset>
          </div>
          <div class="modal-footer">
            <a href="#" class="btn primary" onClick="addMarqueur($('#nomMarqueur').val(),$('#abbMarqueur').val(),$('#descMarqueur').val(), $('#coulMarqueur').val());$('#popup_ajouter').modal('hide');">Ajouter</a>
            <a href="#" class="btn secondary" onClick="$('#popup_ajouter').modal('hide')">Annuler</a>
          </div>
		</div>
		<div id="popup_supprimer" class="modal hide fade">
          <div class="modal-header">
            <a href="#" class="close">x</a>
            <h3>Ajouter un marqueur</h3>
          </div>
          <div class="modal-body">
          	<p> Etes vous sur de vouloir supprimer le marqueur <span id="marqueur"></span> ? </p>
          </div>
          <div class="modal-footer">
            <a href="#" class="btn danger" onClick="rmMarqueur($('#listeMarqueurs').val());$('#popup_supprimer').modal('hide')">Supprimer</a>
            <a href="#" class="btn secondary" onClick="$('#popup_supprimer').modal('hide')">Annuler</a>
          </div>
		</div>
END;

        echo $addCharts;

        if (isset($_GET['minLine']) or isset($_GET['maxLine'])) {
            $this -> addPics();
        }

    }

    private function addPics() {

        $releveRow = DataMod::getReleve($_GET['nom'], $_SESSION['bd_id']);

        $mode = R::findOne('datamod', 'modname = ?', array($releveRow['modname']));

        $releve = R::load('releve', $releveRow['id']);

        $releve -> mod = $mode;

        if (isset($_GET['minLine'])) {
            $releve -> PicMinLine = $_GET['minLine'];
        }

        if (isset($_GET['maxLine'])) {
            $releve -> PicMaxLine = $_GET['maxLine'];
        }
        
        $releve->PicEndTime = $_GET['endTime'];
        
        R::store($releve);

    }

}
?>
