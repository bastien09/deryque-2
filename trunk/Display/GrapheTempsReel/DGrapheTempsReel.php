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
		CHead::addJs('marqueurs');

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
				$addCharts .= "addChart('" . $k . "', new Array(" . implode(',', $dataToAdd) . "), new Array(". implode(',',$timestamps) ."));";
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
		<div id='holder' style="margin:20px;float:left;"></div>
			<div id='accordion'>
				<div class="well">
					<h3 id="head">Controles</h3>
					<ul>
					    <li onClick="run = false;"> Stop  </li>
						<li onClick="run = true;$.each(charts, function (i, chart) { requestData(lastCall, i, dataCharts[i]); }); "> Go  </li>
						<li onClick="Dezoom();"> Zoom out </button>
						<li><input type="text" id="nb" /></li>
						<li onClick="rmChart($('#nb').val());"> RmChart </li>
					</ul>
				</div>
				<div class="well">
					<h3 id="head">Informations</h3>
					<div class="row">
						<div class="span3">
							<ul>				
							    <li>Information : bla</li>
							    <li>Information : bla</li>
							    <li>Information : bla</li>
							</ul>
					    </div>
					    <div class="span3">
							<ol id="infos">
							</ol>								
					    </div>
					</div>
				</div>
				<div class="well">
					<h3 id="head">Marqueurs</h3>
					<div>
						<ol id="listeMarqueursCourants"></ol>
						<ul id="ulMarqueur" style="text-align:center">
							<li><button class="btn" onClick="setAction('marqueurs')"> Placer </button></li>
							<li style="margin-top:5px;margin-bottom:5px"><label for="listeMarqueurs"> Marqueur </label><select id="listeMarqueurs" class="span3" onChange="description()"></select></li>
							<li><button class="btn" data-controls-modal="popup_ajouter" data-keyboard="true"> Ajouter </button> <button class="btn" data-controls-modal="popup_supprimer" onClick="$('#marqueur').text($('#listeMarqueurs').val())"> Supprimer </button></li>
						</ul>
						<div id="desc"></div>
					</div>
				</div>
				<div class="well">
					<h3 id="head">Detection de pics</h3>
						<ul>
							<li onClick="setAction('yline');"> Line on YAxis </li>
						</ul>
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
	            <label for="abbMarqueur" > Abbréviation </label>
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

	}

}
?>
