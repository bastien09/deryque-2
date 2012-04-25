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
					<ul>
						<li onClick="setAction('flags');"> Flags </li>
						<li onClick="setAction('yline');"> Line on YAxis </li>
						<li onClick="setAction('xline');"> Line on XAxis  </li>
						<li><input type="text" id="nb" /></li>
						<li onClick="rmChart($('#nb').val());"> RmChart </li>
					</ul>
				</div>
				<div class="well">
					<h3 id="head">Detection de pics</h3>
					<div>Texte1</div>
				</div>
			</div>
		</div>
END;

		echo $addCharts;

	}

}
?>
