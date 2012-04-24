<?php
class DGrapheTempsReel extends DAbstract {
	const nom = 'Graphe RT';

	public function show() {
		if ($this -> gererVide())
			return;

		CHead::addJs('jquery-1.6.2.min');
		CHead::addJs('jquery.flot.min');
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

					$dataToAdd[$timestamps[$i]] = $rawData[$k][$i];

				}
				$addCharts .= "addChart('" . $k . "', " . json_encode($dataToAdd) . ");";
			}
		}

		$addCharts .= "</script>";

		echo <<<END
		<div id='holder' style="margin:20px;"></div>
		<button onClick="setAction('flags');"> Flags </button>
		<button onClick="setAction('yline');"> Line on YAxis </button>
		<button onClick="setAction('xline');"> Line on XAxis  </button>
		<button onClick="run = false;"> Stop  </button>
		<button onClick="run = true;requestData(lastCall);"> Go  </button>
		<button onClick="Dezoom();"> Zoom out </button>
		<input type="text" id="nb" /><button onClick="rmChart($('#nb').val());"> RmChart </button>
END;

		echo $addCharts;

	}

}
?>
