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
	$.each(charts, function (i, chart) {
		var dChart = new Array();
		// Pour chaque section < min
		for (var j = 0; j < chart.series[0].yData.length; j++) {
			if (chart.series[0].yData[j] <= minLine && chart.series[0].yData[j] != null) {
				var min = j;
				// On cherche le min, et on prendra un intervalle dont ce min est le milieu
				while(j < chart.series[0].yData.length && chart.series[0].yData[j] <= minLine) {
					if (chart.series[0].yData[j] < chart.series[0].yData[min]) {
						min = j;
					}
					j++;
				}
				// On prend l'intervalle
				var section = new Array();
				for (var h = Math.max(0, min - 3); h < Math.min(min +3, chart.series[0].data.length); h++) {
					console.log(chart.series[0].data[h].x+ ", "+ chart.series[0].data[h].y );
					section.push(chart.series[0].data[h]);
				}
				dChart.push(section);
			}
		}
		if (dChart.length > 0)
			dPicsMin.push(dChart);
	});
//	$.each(charts, function (i, chart) {
//		var dChart = new Array();
//		$.each(chart.series[0].yData, function (j, data) {
//			if (data <= minLine) {
//				dChart.push(chart.series[0].data[j]);
//			}
//		});
//		if (dChart.length > 0)
//			dPicsMin.push(dChart);
//	});
	showMinPicsCharts();
};

var recupererPicsMax = function () {
	dPicsMax = new Array();
	$.each(charts, function (i, chart) {
		var dChart = new Array();
		for (var j = 0; j < chart.series[0].yData.length; j++) {
			if (chart.series[0].yData[j] >= maxLine) {
				var max = j;
				// On cherche le min, et on prendra un intervalle dont ce min est le milieu
				while(j < chart.series[0].yData.length && chart.series[0].yData[j] >= maxLine) {
					if (chart.series[0].yData[j] > chart.series[0].yData[max]) {
						max = j;
					}
					j++;
				}
				// On prend l'intervalle
				var section = new Array();
				for (var h = Math.max(0, max - 3); h < Math.min(max +3, chart.series[0].data.length); h++) {
					console.log(chart.series[0].data[h].x+ ", "+ chart.series[0].data[h].y );
					section.push(chart.series[0].data[h]);
				}
				dChart.push(section);
			}
		}
		if (dChart.length > 0)
			dPicsMax.push(dChart);
//		$.each(chart.series[0].yData, function (j, data) {
//			if (data >= maxLine) {
//				dChart.push(chart.series[0].data[j]);
//			}
//		});
//		if (dChart.length > 0)
//			dPicsMax.push(dChart);
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
		$.each(dChart, function (j, section) {
			$('#picsMax').append('<a class="close" href="#" onClick="rmPicChart(\'max\', '+i+', '+ j +')">x</a><div id="picsMax'+i+'-'+j+'" style="margin:20px;"></div>');
			picsMaxCharts.push(new Highcharts.StockChart(
					getChartConfig('picsMax'+i+'-'+j, "Graphe "+i+"-"+j, picsMaxCharts.length, 200, 200)));
			picsMaxCharts[i].series[0].setData(section);
		});
	});
};

var showMinPicsCharts = function () {
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
