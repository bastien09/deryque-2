var run = true, action = 'marqueur', lastCall = 0;
var charts = [];
var dataCharts = [];


//Fonction pour créer un graphe facilement
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
						$('#infos').html('min: '+ event.xAxis[0].min +', max: '+ event.xAxis[0].max);
						for (var x = 0; x < charts.length; x++) {
							charts[x].xAxis[0].setExtremes(event.xAxis[0].min,event.xAxis[0].max);
						}
					} else {
						$('#infos').html ('Selection reset');
					}
				}
			}
	};
	config.i = i;
	config.rangeSelector = {
			enabled : false
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
							case 'xline' :
								//Multiple x plot lines
								for (var x = 0; x < charts.length; x++) {
									charts[x].xAxis[0].removePlotLine('xmark');
									charts[x].xAxis[0].addPlotLine({ 
										value: this.x,
										color: 'red',
										width: 2,
										id: 'xmark'
									});	
								} 
								break;
							case 'yline' :
								//Multiple x plot lines
								for (x = 0; x < charts.length; x++) {
									charts[x].yAxis[0].removePlotLine('ymark');
									charts[x].yAxis[0].addPlotLine({ 
										value: this.y,
										color: 'red',
										width: 2,
										id: 'ymark'
									});	
								} 
								break;
							}
						}
					}
				}
			}
	};

	config.series =  [{ name: 'data'+i, data :[[(new Date()).getTime() - 1000 * 1000, null]]}, 
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

Highcharts.setOptions({
	global : {
		useUTC : true
	}
});

//Ajouter un graphe avec un tableau de y, et de x
function addChart(name, datas, timestamps) {

	var data = new Array();
	var i;

	for(i = 0; i < timestamps.length; i++) {
		data.push([
		           timestamps[i],
		           datas[i]
		           ]);
	}

	var idHolder = "holder"+(charts.length);
	//$('#holder').height($('#holder').height()+400);
	$('#holder').append('<div id="'+idHolder+'" style="margin:20px;"></div>');
	charts.push(new Highcharts.StockChart(
			getChartConfig(idHolder, name, charts.length, 500, 200)
	));
	dataCharts[charts.length - 1] = data;
	inf = "infos"+(charts.length-1);
	$('#infos').append("<li>"+ name +" : <span id="+ inf +"></span></li>");
	requestData(lastCall, charts.length - 1, data);
};

function rmChart(i) {
	charts[i].destroy();
};

//Temps réel
function requestData(i, j, data) {
	// add the point
	if (!run) {
		lastCall = i;
		return;
	}
	if (i >= data.length - 1)
		i = 0;
	charts[j].series[0].addPoint(data[i], true, false);
	afficheInfos(j, charts[j].series[0].yData[i]);
	i++;
	// call it again after 100ms
	setTimeout(function() { requestData(i, j, data); }, 100);    
};

// Info en temps réel à droite
function afficheInfos(i, data) {
	$('#infos'+i).html(data+ "unite");
}
//Action à effectuer, placer des marqueurs ou des pics
function setAction(item) {
	action = item;
	//$('#infos').html(action);
}

function Dezoom() {
	$.each(charts, function (i, chart) {
		chart.xAxis[0].setExtremes(chart.xAxis.min, chart.xAxis.max);
	});
}