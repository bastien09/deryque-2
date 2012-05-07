
// Need charts, maxLine, minLine
var picsMaxCharts = [];
var picsMinCharts = [];
var dPicsMin = new Array();
var dPicsMax = new Array();


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

var recupererPicsMin = function () {
	dPicsMin = new Array();
	// Pour chaque graphe
	$.each(charts, function (i, chart) {
		var dChart = new Array();
		// Pour chaque section < min
		for (var j = 0; j < chart.series[0].yData.length; j++) {
			if (chart.series[0].yData[j] <= minLine && chart.series[0].yData[j] != null) {
				var min = j;
				var dChart1 = new Array();
				// On cherche le min, et on prendra un intervalle dont ce min est le milieu
				while(j < chart.series[0].yData.length && chart.series[0].yData[j] <= minLine) {
					if (chart.series[0].yData[j] < chart.series[0].yData[min]) {
						min = j;
					}
					j++;
				}
				// On prend l'intervalle
				dChart1.min = chart.series[0].xData[Math.max(1, min - 3)];
				dChart1.max = chart.series[0].xData[Math.min(min + 3, chart.series[0].data.length - 1)];
				//Structure .min/.max à enregistrer pour chaque pic
				console.log(dChart1.min +", "+ dChart1.max);

				dChart.push(dChart1);
			}
		}
		dPicsMin.push(dChart);
	});
	showMinPicsCharts();
};

var recupererPicsMax = function () {
	dPicsMax = new Array();
	$.each(charts, function (i, chart) {
		var dChart = new Array();
		for (var j = 0; j < chart.series[0].yData.length; j++) {
			if (chart.series[0].yData[j] >= maxLine) {
				console.log("Max : "+ chart.series[0].yData[j]);
				var max = j;
				var dChart1 = new Array();
				// On cherche le max, et on prendra un intervalle dont ce max est le milieu
				while(j < chart.series[0].yData.length && chart.series[0].yData[j] >= maxLine) {
					if (chart.series[0].yData[j] > chart.series[0].yData[max]) {
						max = j;
						console.log("Max : "+ chart.series[0].yData[j]);
					}
					j++;
				}
				// On prend l'intervalle
				dChart1.min = chart.series[0].xData[Math.max(1, max - 3)];
				dChart1.max = chart.series[0].xData[Math.min(max + 3, chart.series[0].data.length - 1)];
				//Structure .min/.max à enregistrer pour chaque pic
				console.log(dChart1.min +", "+ dChart1.max);

				dChart.push(dChart1);
			}
		}
		dPicsMax.push(dChart);
	});
	showMaxPicsCharts();
};

var showMaxPicsCharts = function () {
	$('#picsMax').empty();
	$.each(dPicsMax, function (i, dChart) {
		$.each(dChart, function (j, section) {
			//console.log(section.min +", "+ section.max);
			$('#picsMax').append('<a class="close" href="#" onClick="rmPicChart(\'max\', '+i+', '+ j +')">x</a><div id="picsMax'+i+'-'+j+'" style="margin:20px;"></div>');
			picsMaxCharts.push(
					new Highcharts.StockChart({
						chart : {
							renderTo : 'picsMax'+i+'-'+j,
							height:300,
							width:200
						},
						title : {
							text : 'picsMax'+i+'-'+j
						},

						series : [{
							name : 'data',
							data : (function() {
								var tmp = [];
//								for(var x = 1; x < charts[i].series[0].data.length; x++) {
//									if (charts[i].series[0].xData[x] >= section.max)
//										return tmp;
//									if (charts[i].series[0].xData[x] >= section.min) {
////										tmp.push([
////										charts[i].series[0].xData[x],
////										charts[i].series[0].yData[x]
////										]);	
//										tmp.push(charts[i].series[0].yData[x]);
//										console.log(tmp[tmp.length - 1]);
//									}
//								}
								
								
								return tmp;
							})()
						}],
					}));
			console.log(picsMaxCharts[picsMaxCharts.length - 1].series[0].data);
		});
	});
};

var showMinPicsCharts = function () {
	$('#picsMin').empty();
	$.each(dPicsMin, function (i, dChart) {
		$.each(dChart, function (j, section) {
			$('#picsMin').append('<a class="close" href="#" onClick="rmPicChart(\'min\', '+i+', '+ j +')">x</a><div id="picsMin'+i+'-'+j+'" style="margin:20px;"></div>');
			picsMaxCharts.push(
					new Highcharts.StockChart({
						chart : {
							renderTo : 'picsMin'+i+'-'+j,
							height:300,
							width:200
						},
						title : {
							text : 'picsMin'+i+'-'+j
						},

						series : [{
							name : 'data',
							data : (function() {
								var tmp = [];
								for(var x = 1; x < charts[i].series[0].data.length; x++) {
									if (charts[i].series[0].xData[x] >= section.max)
										return tmp;
									if (charts[i].series[0].xData[x] >= section.min) {
//										tmp.push([
//										charts[i].series[0].xData[x],
//										charts[i].series[0].yData[x]
//										]);	
										tmp.push(charts[i].series[0].yData[x]);
										console.log(tmp[tmp.length - 1]);
									}
								}
								return tmp;
							})()
						}],
					}));
		});
	});
};