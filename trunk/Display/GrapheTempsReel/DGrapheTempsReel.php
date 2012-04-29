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
		<ul class="tabs" data-tabs="tabs">
		<li class="active"><a href="#holder"> ECG </a></li>
		<li><a href="#pics" onClick="showPicsCharts()" > Pics </a></li>
		</ul>
		<div id="my-tab-content" class="tab-content">
			<div class="tab-pane active" id="holder" style="margin:20px;float:left;"></div>
			<div class="tab-pane" id="pics" style="margin:20px;float:left;"><h3> Pics Max </h3><div id="picsMax"></div><h3> Pics Min </h3><div id="picsMin"></div></div>
		</div>
			<div id='accordion'>
				<div class="well">
					<h3 id="head">Controles</h3>
					<ul>
					    <li><button class="btn" onClick="run = false;"> Stop </button>
							<button class="btn" onClick="run = true;$.each(charts, function (i, chart) { requestData(lastCall, i, dataCharts[i]); }); "> Go </button>
							<button class="btn" onClick="Dezoom();"> Zoom out </button>							
					     </li>
					</ul>
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
				<div class="well">
					<ul class="tabs" data-tabs="tabs">
						<li class="active"><a href="#divMarqueurs"> Marqueurs </a></li>
						<li><a href="#divPics"> Detection de pics </a></li>
					</ul>
					<div id="my-tab-content" class="tab-content">
						<div id="divMarqueurs" class="tab-pane active">	
							<ol id="listeMarqueursCourants"></ol>
							<ul id="ulMarqueur" style="text-align:center">
								<li><button class="btn" onClick="setAction('marqueurs')"> Placer </button><button class="btn" data-controls-modal="popup_ajouter" data-keyboard="true"> Ajouter </button> <button class="btn" data-controls-modal="popup_supprimer" onClick="$('#marqueur').text($('#listeMarqueurs').val())"> Supprimer </button></li>
								<li style="margin-top:5px;margin-bottom:5px"><label for="listeMarqueurs"> Marqueur </label><select id="listeMarqueurs" class="span3" onChange="description()"></select></li>
								</ul>
							<div id="desc"></div>
						</div>
						<div id="divPics" class="tab-pane">
							<ul>
								<li><button class="btn" onClick="setAction('pics');"> Placer </button><button class="btn" onClick="rmLigne($('#choixLigne').val())"> Supprimer </button></li>
								<li><select id="choixLigne">
								<option value="min"> Minimum </option>
								<option value="max"> Maximum </option>
								</select></li>
								<li> Seuil maximum : <span id="picMax"></span></li>
								<li> Seuil minimum : <span id="picMin"></span></li>
							</ul>
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

	}

}
?>
