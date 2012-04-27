var minLine = "", maxLine = "";

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