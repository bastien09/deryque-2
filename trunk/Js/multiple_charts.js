var run = true, action = 'marqueur', lastCall = 0, minOrMax = '';
var charts = [];
var dataCharts = [];


//Fonction pour cr�er un graphe facilement
var getChartConfig = function(renderId, title, i, width, height) {
	var config = {};
	config.chart = {
			renderTo: renderId,
			zoomType : "x",
			height:height,
			width:width,

			events: {
				selection: function(event) {
					if (event.xAxis) {
						for (var x = 0; x < charts.length; x++) {
							charts[x].xAxis[0].setExtremes(event.xAxis[0].min,event.xAxis[0].max);
							charts[x].setSize(300, 200);
						}
					}
				}
			}
	};
	config.i = i;
	config.rangeSelector = {
				buttons: [{
					count: 1,
					type: 'second',
					text: '1s'
				},
				{
					count: 10,
					type: 'second',
					text: '10s'
				},
				{
					count: 30,
					type: 'second',
					text: '30s'
				}, {
					count: 1,
					type: 'minute',
					text: '1min'
				}, {
					type: 'all',
					text: 'All'
				}],
				inputEnabled: false,
				selected: 0
	};
	config.title = {
			text : title
	};
	config.legend = {
			enabled: false
	};
	config.scrollbar = {
			height: 7
	};
	config.xAxis = {
			dateTimeLabelFormats : '%S',
			title : {
				text : "Temps (ms)"
			}
	};
	config.yAxis = {
			title : {
				text : "Voltage (mV)"
			}
	};
	config.navigator = {
			height : 15
	};
	config.plotOptions = {
			series : {
				cursor: 'pointer',
				point : {
					events: {
						click: function() {
							//Multiple flags
							switch (action) {
							case 'marqueurs' :
								placerMarqueur($('#listeMarqueurs').val(), this.x);
								break;
							case 'pics' :
								//Multiple x plot lines
								placerLigne(minOrMax, this.y);
								break;
							}
						}
					}
				}
			}
	};

	config.series =  [{ name: 'data'+i, data :[[0, null]]}, 
	                  {
		id: "flags",
		name: "flagflag",
		type: "flags",
		showInLegend: false,
		data: []
	                  }
	];

	return config;
};

//Ajouter un graphe avec un tableau de y, et de x
function addChart(name, datas, timestamps) {

	var data = new Array();
	var i;
	for(i = 0; i < timestamps.length; i++) {
		data.push([
		           timestamps[i]*1000,
		           datas[i]
		           ]);
	}

	var idHolder = "holder"+(charts.length);
	//$('#holder').height($('#holder').height()+400);
	$('#holder').append('<a class="close" href="#" onClick="rmChart('+charts.length+');">x</a><div id="'+idHolder+'" style="margin:20px;"></div>');
	charts.push(new Highcharts.StockChart(
			getChartConfig(idHolder, name, charts.length, 700, 300)
	));
	dataCharts[charts.length - 1] = data;
	inf = "infos"+(charts.length-1);
	$('#infos').append("<li>"+ name +" : <span id="+ inf +"></span></li>");
	printCharts();
	requestData(lastCall, charts.length - 1, data);
	console.log("Length : "+data.length);
};

function rmChart(i) {
	charts[i].destroy();
	charts.splice(i,1);
	$('#holder'+i).prev().remove();
	$('#holder'+i).remove();
	printCharts();
};

//Temps r�el
function requestData(i, j, data) {
	// add the point
	if (!run) {
		lastCall = i;
		return;
	}
	if (i >= data.length - 1) {
		run = false;
		return;
	}
	var tmp = i;
	while (i < data.length && i < (tmp + 4)) {
		charts[j].series[0].addPoint(data[i], false, false);
		i++;
	}
	//Rafraichissement qu'un sur 5, faster faster !
	if (i < data.length) {
		charts[j].series[0].addPoint(data[i], true, false);
		i++;
	}
	afficheInfos(j, charts[j].series[0].yData[i]);
	// call it again after.. guess it
	var timeOut = 0;
	if (i == 0)
		timeOut = 0;
	else 
		timeOut = (data[i].x - data[i - 1].x);
	setTimeout(function() { if (charts[j]) requestData(i, j, data); }, 10);    
};

// Info en temps r�el � droite
function afficheInfos(i, data) {
	$('#infos'+i).html(data+ "unite");
}
//Action � effectuer, placer des marqueurs ou des pics
function setAction(item) {
	action = item;
	//$('#infos').html(action);
}

function Dezoom() {
	$.each(charts, function (i, chart) {
		chart.xAxis[0].setExtremes(chart.xAxis.min, chart.xAxis.max);
		chart.setSize(700, 300);
	});
}

function printCharts() {
	var liste = "";
	$.each(charts, function (i, chart) {
		liste += "<option value="+ i +">Graphe "+ i +"</option>";
	});
	$('#listeCharts').html(liste);
}