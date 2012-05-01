
var picsMaxCharts = [];
var picsMinCharts = [];


function rmPicChart(choice, i) {
	if (choice == 'min') {
		picsMinCharts[i].destroy();
		picsMinCharts.splice(i,1);
		$('#picsMin'+i).prev().remove();
		$('#picsMin'+i).remove();
	} else if (choice == 'max') {
		picsMaxCharts[i].destroy();
		picsMaxCharts.splice(i,1);
		$('#picsMax'+i).prev().remove();
		$('#picsMax'+i).remove();
	}
//	printCharts();
};

var showMaxPicsCharts = function () {
	var dPicsMax = $.JSONCookie('maxPics');
	console.log(dPicsMax);
	$('#picsMax').empty();
	$.each(dPicsMax, function (i, dChart) {
		$.each(dChart, function (j, section) {
			$('#picsMax').append('<a class="close" href="#" onClick="rmPicChart(\'max\', '+i+', '+ j +')">x</a><div id="picsMax'+i+'-'+j+'" style="margin:20px;"></div>');
			picsMaxCharts.push(new Highcharts.StockChart(
					getChartConfig('picsMax'+i+'-'+j, "Graphe "+i+"-"+j, picsMaxCharts.length, 200, 200)));
			picsMaxCharts[i].series[0].setData(section);
		});
	});
};

var showMinPicsCharts = function () {
	var dPicsMin = $.JSONCookie('minPics');
	console.log(dPicsMin);
	
	$('#picsMin').empty();
	$.each(dPicsMin, function (i, dChart) {
		$.each(dChart, function (j, section) {
			$('#picsMin').append('<a class="close" href="#" onClick="rmPicChart(\'min\', '+i+', '+ j +')">x</a><div id="picsMin'+i+'-'+j+'" style="margin:20px;"></div>');
			picsMinCharts.push(new Highcharts.StockChart(
					getChartConfig('picsMin'+i+'-'+j, "Graphe "+i+"-"+j, picsMinCharts.length, 200, 200)));
			picsMinCharts[i].series[0].setData(section);
		});
	});
	//$('#holder').height($('#holder').height()+400);
};