var minLine = "", maxLine = "";
var dPicsMin = new Array();
var dPicsMax = new Array();
var picsMaxCharts = [];
var picsMinCharts = [];

var placerLigne = function(choix, y) {
	var color = (choix == 'min') ? 'green' : 'red';
	$.each(charts, function(i, chart) {
		chart.yAxis[0].removePlotLine(choix);
		chart.yAxis[0].addPlotLine({ 
			value: y,
			color: color,
			width: 2,
			id: choix
		});	
	});
	if (choix == "min") {
		minLine = y;
		recupererPicsMin();
	} else if (choix == "max") {
		maxLine = y;
	}
	printLignes();
};

var rmLigne = function(choix) {
	if (choix == "min") {
		$.each(charts, function(i, chart) {
			chart.yAxis[0].removePlotLine(choix);
		});
		minLine = "";
	} else if (choix == "max") {
		$.each(charts, function(i, chart) {
			chart.yAxis[0].removePlotLine(choix);
		});
		maxLine = "";
	}
	printLignes();
};

var printLignes = function() {
	if (minLine != "" || minLine == "0") {
		$('#picMin').html(minLine);
	} else {
		$('#picMin').html('Non defini');	
	}
	if (maxLine != "" || minLine == "0") {
		$('#picMax').html(maxLine);
	} else {
		$('#picMax').html('Non defini');	
	}
};

var recupererPicsMin = function () {
	dPicsMin = new Array();
	$.each(charts, function (i, chart) {
		var dChart = new Array();
		$.each(chart.series[0].yData, function (j, data) {
			if (data <= minLine) {
				dChart.push(chart.series[0].data[j]);
			}
		});
		dPicsMin.push(dChart);
	});
};

var recupererPicsMax = function () {
	dPicsMax = new Array();
	$.each(charts, function (i, chart) {
		var dChart = new Array();
		$.each(chart.series[0].yData, function (j, data) {
			if (data >= maxLine) {
				dChart.push(chart.series[0].data[j]);
			}
		});
		dPicsMax.push(dChart);
	});
};

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

var showPicsCharts = function () {
	$('#picsMax').empty();
	$('#picsMin').empty();
	$.each(dPicsMax, function (i, dChart) {
			$('#picsMax').append('<a class="close" href="#" onClick="rmPicChart(\'max\', i)">x</a><div id="picsMax'+i+'" style="margin:20px;"></div>');
			picsMaxCharts.push(new Highcharts.StockChart(
					getChartConfig('picsMax'+i, "Graphe "+i, picsMaxCharts.length, 200, 200)));
			picsMaxCharts[i].series[0].setData(dChart);
	});
	$.each(dPicsMin, function (i, dChart) {
		$('#picsMin').append('<a class="close" href="#" onClick="rmPicChart(\'min\', i)">x</a><div id="picsMin'+i+'" style="margin:20px;"></div>');
		picsMinCharts.push(new Highcharts.StockChart(
				getChartConfig('picsMin'+i, "Graphe "+i, picsMinCharts.length, 200, 200)));
		picsMinCharts[i].series[0].setData(dChart);
});
	//$('#holder').height($('#holder').height()+400);
}
