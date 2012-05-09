
// Need charts, maxLine, minLine
var dataCharts = [];
var maxLine = "";
var minLine = "";
var picsMaxCharts = []; //Graphes des pics max
var picsMinCharts = []; // Graphes des pics min
var dPicsMin = new Array();	//Tableau d'intervalles pour les min
var dPicsMax = new Array();	// pour les max


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
	console.log("Min Line :"+ minLine);
	// Pour chaque graphe
	$.each(dataCharts, function (i, data) {
		var dChart = new Array();
		// Pour chaque section < min
		for (var j = 0; j < data.length; j++) {
			if (data[j].y <= minLine && data[j].y != null) {
				var min = j;
				var dChart1 = new Array();
				// On cherche le min, et on prendra un intervalle dont ce min est le milieu
				while(j < data[j].length && data[j].y <= minLine) {
					if (data[j].y < data[min].y) {
						min = j;
					}
					j++;
				}
				console.log("j = "+ j);	
				// On prend l'intervalle
				dChart1.min = data[Math.max(1, min - 10)].x;
				dChart1.max = data[Math.min(min + 10, data.length - 1)].x;
				j+= 10;
				//Structure .min/.max � enregistrer pour chaque pic
				console.log(dChart1.min +", "+ dChart1.max);

				dChart.push(dChart1);
				if (dChart.length == 3)
					break;
			}
		}
		dPicsMin.push(dChart);
	});
	showMinPicsCharts();
};

var recupererPicsMax = function () {
	dPicsMax = new Array();
	$.each(dataCharts, function (i, data) {
		var dChart = new Array();
		for (var j = 0; j < data.length; j++) {
			if (data[j].y >= maxLine && data[j].y != null) {
				var max = j;
				var dChart1 = new Array();
				// On cherche le min, et on prendra un intervalle dont ce min est le milieu
				while(j < data[j].length && data[j].y >= maxLine) {
					if (data[j].y > data[max].y) {
						max = j;
					}
					j++;
				}
				console.log("j = "+ j);	
				// On prend l'intervalle
				dChart1.min = data[Math.max(1, max - 10)].x;
				dChart1.max = data[Math.min(max + 10, data.length - 1)].x;
				j+= 10;
				//Structure .min/.max � enregistrer pour chaque pic
				console.log(dChart1.min +", "+ dChart1.max);

				dChart.push(dChart1);
				if (dChart.length == 3)
					break;
			}
		}
		dPicsMax.push(dChart);
	});
	showMaxPicsCharts();
};

var showMaxPicsCharts = function () {
	$('#picsMax').empty();
	$('#picsMax').append("<h2 style='text-align:center'> Pics max </h3>");
	$.each(dPicsMax, function (i, dChart) {
		$('#picsMax').append("<h3> Graphe "+ i +"</h3");
		$.each(dChart, function (j, section) {
			//console.log(section.min +", "+ section.max);
			$('#picsMax').append('<div id="chartBloc"><a class="close" href="#" onClick="rmPicChart(\'max\', '+i+', '+ j +')">x</a><div id="picsMax'+i+'-'+j+'" style="margin:20px;"></div></div>');
			picsMaxCharts.push(
					new Highcharts.StockChart({
						chart : {
							renderTo : 'picsMax'+i+'-'+j,
							height:300,
							width:150
						},
						title : {
							text : 'picsMax'+i+'-'+j
						},
						navigator : {
							enabled : false
						},
						rangeSelector : {
							enabled : false
						},
						series : [{
							name : 'data',
							data : (function() {
								var tmp = [];
								for(var x = 1; x < dataCharts[i].length; x++) {
									if (dataCharts[i][x].x >= section.max)
										return tmp;
									if (dataCharts[i][x].x >= section.min) {
										tmp.push(dataCharts[i][x].y);
										console.log(tmp[tmp.length - 1]);
									}
								}
								return tmp;
							})()
						}],
					}));
		});
		$('#picsMax').append('<br />');
	});
};

var showMinPicsCharts = function () {
	$('#picsMin').empty();
	$('#picsMin').append("<h2 style='text-align:center'> Pics min </h3");
	$.each(dPicsMin, function (i, dChart) {
		$('#picsMin').append("<h3> Graphe "+ i +"</h3");
		$.each(dChart, function (j, section) {
			$('#picsMin').append('<div id="chartBloc"><a class="close" href="#" onClick="rmPicChart(\'min\', '+i+', '+ j +')">x</a><div id="picsMin'+i+'-'+j+'" style="margin:20px;"></div></div>');
			picsMaxCharts.push(
					new Highcharts.StockChart({
						chart : {
							renderTo : 'picsMin'+i+'-'+j,
							height:300,
							width:150
						},
						title : {
							text : 'picsMin'+i+'-'+j
						},
						navigator : {
							enabled : false
						},
						rangeSelector : {
							enabled : false
						},
						series : [{
							name : 'data',
							data : (function() {
								var tmp = [];
								for(var x = 1; x < dataCharts[i].length; x++) {
									if (dataCharts[i][x].x >= section.max)
										return tmp;
									if (dataCharts[i][x].x >= section.min) {
										tmp.push(dataCharts[i][x].y);
										console.log(tmp[tmp.length - 1]);
									}
								}
								return tmp;
							})()
						}],
					}));
		});
		$('#picsMin').append('<br />');
	});
};

// chargement des données dans js.

function setMinLine(i) {
	minLine = i;
	recupererPicsMin();
}

function setMaxLine(i) {
	maxLine = i;
	recupererPicsMax();
}

function addChart(name, datas, timestamps) {

	var data = new Array();
	var i;

	for(i = 0; i < timestamps.length; i++) {
		var couple = new Array();
		couple.x = timestamps[i];
		couple.y = datas[i];
		data.push(couple);
	}
	dataCharts.push(data);
};