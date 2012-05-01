<?php
class DPics extends DAbstract {
	const nom = 'Pics';

	public function show() {
		if ($this -> gererVide())
			return;

		CHead::addJs('jquery-ui-1.8.19.custom.min');
		CHead::addJs('highstock');
		CHead::addJs('exporting');
		CHead::addJs('multiple_charts');
		CHead::addJs('bootstrap-modal');
		CHead::addJs('bootstrap-tabs');;
		CHead::addJs('bootstrap-popover');
		CHead::addJs('jquery.cookie');
		CHead::addJs('jquery.jsoncookie');
		CHead::addJs('showPics');
		
		echo <<<END
		<script>
		showMinPicsCharts();
		showMaxPicsCharts();
		</script>
		
		<div class="" id="pics" style="margin:20px;float:left;"><h3> Pics Max </h3><div id="picsMax"></div><h3> Pics Min </h3><div id="picsMin"></div></div>
		
END;
		
	}
}
?>