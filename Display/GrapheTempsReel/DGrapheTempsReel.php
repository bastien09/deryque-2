<?php
class DGrapheTempsReel extends DAbstract
{
	const nom = 'Graphe RT';

	public function show()
	{
		if ($this->gererVide()) return;

		CHead::addJs('jquery-1.6.2.min');
		CHead::addJs('jquery.flot.min');
		//CHead::addJs('Plot_js/jquery_realtimelinechart');
		CHead::addJs('highstock');
		CHead::addJs('exporting');
		CHead::addJs('multiple_charts');
		
		echo <<<END
		<div id='holder' style="margin:20px;"></div>
		<button onClick="setAction('flags');"> Flags </button>
		<button onClick="setAction('yline');"> Line on YAxis </button>
		<button onClick="setAction('xline');"> Line on XAxis  </button>
		<button onClick="run = false;"> Stop  </button>
		<button onClick="run = true;requestData(lastCall);"> Go  </button>
		<button onClick="Dezoom();"> Zoom out </button>
		<input type="text" id="nb" /><button onClick="rmChart($('#nb').val());"> RmChart </button>
		<script>
		$.each(data, function (i, data) {
		if (i != 0)
			addChart('Chart'+i, data);
		});
		</script>
END;

	}
}
?>
