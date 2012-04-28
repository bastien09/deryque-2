var minLine = "", maxLine = "";
var dPicsMin = new Array();
var dPicsMax = new Array();

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
		dPicsMin.push(dCharts);
	});
};

var recupererPicsMax = function () {
	dPicsMax = new Array();
	$.each(charts, function (i, chart) {
		var dChart = new Array();
		$.each(chart.series[0].yData, function (j, data) {
			if (data >= MaxLine)
				dChart.push(chart.series[0].data[j]);
		});
		dPicsMax.push(dCharts);
	});
};


