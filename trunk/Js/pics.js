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
		recupererPicsMax();
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
	if (maxLine != "" || maxLine == "0") {
		$('#picMax').html(maxLine);
	} else {
		$('#picMax').html('Non defini');	
	}
};

var recupererPicsMin = function () {
	dPicsMin = new Array();
	// Pour chaque graphe
//	$.each(charts, function (i, chart) {
//		var dChart = new Array();
//		// Pour chaque section < min
//		for (var j = 0; j < chart.series[0].yData.length; j++) {
//			if (chart.series[0].yData[j] <= minLine) {
//				var min = j;
//				// On cherche le min, et on prendra un intervalle dont ce min est le milieu
//				while(j < chart.series[0].yData.length && chart.series[0].yData[j] <= minLine) {
//					if (chart.series[0].yData[j] < chart.series[0].yData[min]) {
//						min = j;
//					}
//					j++;
//				}
//				// On prend l'intervalle
//				dChart.push(chart.series[0].data.slice((min - 3 < 0) ? 0 : min - 3, (min + 3 > chart.series[0].data.length) ? chart.series[0].data.length : min + 3));
//			}
//		}
//		if (dChart.length > 0)
//			dPicsMin.push(dChart);
//	});
	$.each(charts, function (i, chart) {
		var dChart = new Array();
		$.each(chart.series[0].yData, function (j, data) {
			if (data <= minLine) {
				dChart.push(chart.series[0].data[j]);
			}
		});
		if (dChart.length > 0)
			dPicsMin.push(dChart);
	});
	showMinPicsCharts();
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
		if (dChart.length > 0)
			dPicsMax.push(dChart);
	});
	showMaxPicsCharts();
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

var showMaxPicsCharts = function () {
	$('#picsMax').empty();
	$.each(dPicsMax, function (i, dChart) {
			$('#picsMax').append('<a class="close" href="#" onClick="rmPicChart(\'max\', i)">x</a><div id="picsMax'+i+'" style="margin:20px;"></div>');
			picsMaxCharts.push(new Highcharts.StockChart(
					getChartConfig('picsMax'+i, "Graphe "+i, picsMaxCharts.length, 200, 200)));
			picsMaxCharts[i].series[0].setData(dChart);
	});
}

var showMinPicsCharts = function () {
	$('#picsMin').empty();
	$.each(dPicsMin, function (i, dChart) {
		$('#picsMin').append('<a class="close" href="#" onClick="rmPicChart(\'min\', i)">x</a><div id="picsMin'+i+'" style="margin:20px;"></div>');
		picsMinCharts.push(new Highcharts.StockChart(
				getChartConfig('picsMin'+i, "Graphe "+i, picsMinCharts.length, 200, 200)));
		picsMinCharts[i].series[0].setData(dChart);
});
	//$('#holder').height($('#holder').height()+400);
}
