var chart;
var run = true, action = 'flags', lastCall = 0;
var charts = [];
var data = new Array(), time = (new Date()).getTime(), i;

for (x = 0; x < 9; x++) {
	data[x] = new Array();
}
for(var i = -999; i <= 0; i++) {
	for (var x = 0; x < 9; x++) {
		if (x == 0) {
			data[x].push([
			              time + i * 1000,
			              null
			              ]);
		}
		else {
			data[x].push([
			              time + i * 1000,
			              Math.round(Math.random() * 100)
			              ]);
		}
	}

}
var getChartConfig = function(renderId, title, i) {
	var config = {};
	config.chart = {
			renderTo: renderId,
			zoomType : "x",
			height:150,
			width:1000,

			events: {
				selection: function(event) {
					if (event.xAxis) {
						$('#infos').html('min: '+ event.xAxis[0].min +', max: '+ event.xAxis[0].max);
						for (x = 0; x < charts.length; x++) {
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
//	buttons: [{
//	count: 10,
//	type: 'second',
//	text: '10s'
//	},
//	{
//	count: 30,
//	type: 'second',
//	text: '30s'
//	}, {
//	count: 1,
//	type: 'minute',
//	text: '1min'
//	}, {
//	type: 'all',
//	text: 'All'
//	}],
//	inputEnabled: false,
//	selected: 0
//	};

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
							case 'flags' :
								for (x = 0; x < charts.length; x++) {
									var ser = charts[x].get("flags");
									ser.addPoint({
										x : this.x
									}); 
									$('#infos').html("Pouet"+ ser.xData);
								}
								break;
							case 'xline' :
								//Multiple x plot lines
								for (x = 0; x < charts.length; x++) {
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

function addChart(name, data) {
	var idHolder = "holder"+(charts.length);
	//$('#holder').height($('#holder').height()+400);
	$('#holder').append('<div id="'+idHolder+'" style="margin:20px;"></div>');
	charts.push(new Highcharts.StockChart(
			getChartConfig(idHolder, name, charts.length)
	));
	requestData(lastCall, charts.length - 1, data);
};

function rmChart(i) {
	charts[i].destroy();
};

function requestData(i, j, data) {
	// add the point
	if (!run) {
		lastCall = i;
		return;
	}
	if (i >= 999)
		i = 0;
	charts[j].series[0].addPoint(data[i], true, false);
	i++;
	// call it again after 100ms
	setTimeout(function() { requestData(i, j, data); }, 100);    
};

//function addSerie(nom, data) {
//	chart.addSeries({
//		name : nom,
//		id : nom,
//		data : data
//	});
//};

function setAction(item) {
	alert('Pouet');
	action = item;
	$('#infos').html(action);
}

function Dezoom() {
	$.each(charts, function (i, chart) {
		chart.xAxis[0].setExtremes(chart.xAxis.min, chart.xAxis.max);
	});
}