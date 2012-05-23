/* ----------------------------------------------- onClick() ------------------------------------------------- */

var selectMarqueurs = function() {
	var listeGraphes = "";
	var listeMarqueursCourants = "";

	$('#graphe_select_marqueurs').empty();
	$('#de_select_marqueurs').empty();
	$('#a_select_marqueurs').empty();
	
	$.each(charts, function (j, chart) {
		if (chart != null && chart.title != null) {
			listeGraphes += "<option value='"+ chart.title.textStr +"'>"+chart.title.textStr+"</option>";
		}
	});
	$.each(marqueursCourants, function (j, marqueurCourant) {
		listeMarqueursCourants += "<option value='"+ marqueurCourant.x +"'>"+ marqueurCourant.nom +" &agrave; "+ marqueurCourant.x +"</option>";
	});
	$('#graphe_select_marqueurs').html(listeGraphes);
	$('#de_select_marqueurs').html(listeMarqueursCourants);
	$('#a_select_marqueurs').html(listeMarqueursCourants);
	
}

var selectDates = function() {
	var listeGraphes = "";
	var listeDates = "";

	$('#graphe_select_dates').empty();
	$('#de_select_dates').empty();
	$('#a_select_dates').empty();
	
	$.each(charts, function (j, chart) {
		if (chart != null && chart.title != null) {
			listeGraphes += "<option value='"+ chart.title.textStr +"'>"+chart.title.textStr+"</option>";
		}
	});
	for (var i = 0; i < charts.length; i++) {
		if (charts[i] != null && charts[i].series != null) {
			$.each(charts[i].series[0].xData, function (j, timestamp) {
				listeDates += "<option value='"+ timestamp +"'>"+timestamp +" ms : "+ charts[i].series[0].yData[j] +" mV</option>";
			});
			break;
		}
	}
	$('#graphe_select_dates').html(listeGraphes);
	$('#de_select_dates').html(listeDates);
	$('#a_select_dates').html(listeDates);
}

var selectSelection = function(graphe, event) {
	if (event.xAxis) {
		//alert('R�cup�rer '+ event.xAxis[0].min +' et '+event.xAxis[0].max +' dans getChartConfig (multiple_charts.js) ainsi que l\'id du relev�');
		// La selection sur graphe n'est possible que si zoomType est activ�, provoquant un zoom. Il faut alors d�zoomer :/
		$('#graphe_select_selection').html(graphe.title.textStr);
		$('#de_select_selection').html(event.xAxis[0].min);
		$('#a_select_selection').html(event.xAxis[0].max);
		$('#popup_select_selection').modal('show');
		setTimeout("Dezoom()", 100);
	}
}

var okMarqueurs = function() {
	var graphe = $('#graphe_select_marqueurs').val();
	var de = $('#de_select_marqueurs').val();
	var a = $('#a_select_marqueurs').val();
	
	console.log('Marqueurs '+ graphe +' '+ de +' '+ a);
	saveSelection(graphe,de,a);
}
var okDates = function() {
	var graphe = $('#graphe_select_dates').val();
	var de = $('#de_select_dates').val();
	var a = $('#a_select_dates').val();

	console.log('Dates '+ graphe +' '+ de +' '+ a);
	saveSelection(graphe,de,a);
	
}
var okSelection = function() {
	var graphe = $('#graphe_select_selection').text();
	var de = $('#de_select_selection').text();
	var a = $('#a_select_selection').text();

	console.log('Selection '+ graphe +' '+ de +' '+ a);
	saveSelection(graphe,de,a);
	
}

function saveSelection(graphName,begin,end) {
	if (graphName != null && begin != null && end != null)
		$.get(document.URL, { 'graphName' : graphName , 'selectionBegin' : begin, 'selectionEnd' : end } );
}