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
	
	var chartsLength = charts[0].series[0].xData.length;
	
	if (choix == "min") {
		minLine = y;
		//recupererPicsMin();
		$.get(document.URL, { 'minLine' : minLine, 'endTime' : chartsLength } );
	} else if (choix == "max") {
		maxLine = y;
		//recupererPicsMax();
		$.get(document.URL, { 'maxLine' : maxLine, 'endTime' : chartsLength } );
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
