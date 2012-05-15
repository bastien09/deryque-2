var marqueurs = [];			//Marqueurs enregistrés
var marqueursCourants = [];	//Marqueurs placés
var compteurMarqueur = 0;
var compteur = 0;			

var getMarqueur = function(i) {
	for (var j = 0; j < marqueurs.length; j++) {
		if (i == marqueurs[j].i)
			return marqueurs[j];
	}
}
var createMarqueur = function (nom, abb, desc, couleur) {
	var marqueur = {};
	marqueur.nom = nom;
	marqueur.abb = abb;
	marqueur.desc = desc;
	marqueur.couleur = couleur;
	marqueur.i = compteurMarqueur++;
	
	return marqueur;
};

var addMarqueur = function (nom, abb, desc, couleur) {
	marqueur = createMarqueur(nom, abb, desc, couleur);
	marqueurs.push(marqueur);
	printMarqueurs();
	$('#listeMarqueurs option').eq(marqueurs.length-1).attr('selected', 'selected');
	description();
};

var rmMarqueur = function (i) {
	for (var j = 0; j < marqueurs.length; j++) {
		if (marqueurs[j].i == i) {
			marqueurs.splice(j,1);
			printMarqueurs();
			return;
		}
	}
};

var printMarqueurs = function() {
	var liste = "";
	$.each(marqueurs, function (i, marqueur) {
		liste +="<option value="+ marqueur.i +">"+ marqueur.nom +"</option>";
	});
	$('#listeMarqueurs').html(liste);
};

var placerMarqueur = function (i, x) {
	var marqueur = getMarqueur(i);
	var marqueurCourant = {};
	marqueurCourant.nom = marqueur.nom;
	marqueurCourant.x = x;
	for (var j = 0; j < charts[0].series[0].xData.length; j++) {
		if (charts[0].series[0].xData[j] == x) {
			marqueurCourant.index = j;
			break;
		}
	}
	marqueurCourant.i = compteur++;
	
	$.each(charts, function (i, chart) {
		var ser = chart.get("flags");
		ser.addPoint({
			x : x,
			title : marqueur.nom,
			id : marqueur.nom+marqueurCourant.i
		}); 
		chart.xAxis[0].addPlotLine({ 
			value: x,
			color: marqueur.couleur,
			width: 2,
			id: marqueur.nom+marqueurCourant.i
		});	
	});
	marqueursCourants.push(marqueurCourant);
	printMarqueursCourants();
};

var rmMarqueurCourant = function (id, i) {
	$.each(charts, function (i, chart) {
		chart.xAxis[0].removePlotLine(id);
		point = chart.get(id);
		point.remove(false);
	});
	marqueursCourants.splice(i,1);
	printMarqueursCourants();
};

var printMarqueursCourants = function() {
	var liste = "";
	$.each(marqueursCourants, function (i, marqueurCourant) {
		liste +="<li><a href='#' onClick='if ($(\"#marqueursCourants"+i+"\").is(\":hidden\")) {$(\"#marqueursCourants"+i+"\").fadeIn();}else {$(\"#marqueursCourants"+i+"\").fadeOut();}'>"+ marqueurCourant.nom +" [x = "+ marqueurCourant.x +" ]</a><a href='#' class='close' onClick='rmMarqueurCourant(\""+ marqueurCourant.nom + marqueurCourant.i +"\","+ marqueurCourant.i +")'>x</a></li>";
		liste +="<ol id='marqueursCourants"+i+"'>";
		$.each(charts, function (j, chart) {
			console.log(chart.title);
			liste += "<li>"+ chart.title.textStr +" : "+ chart.series[0].yData[marqueurCourant.index] +"</li>";

		});		
		liste +="</ol>"
	});
	$('#listeMarqueursCourants').html(liste);
};

var description = function() {
	var description = getMarqueur($("#listeMarqueurs").val()).desc;
	console.log(description);
	if (description == "")
		description = "Il n'y a pas de description pour ce marqueur";
	$('#desc').html('<div id="description" class="alert-message info"><a class="close" href="#" onClick="$(\'#description\').remove()">x</a><p>'+ description +'</p></div>');
};

var compoMarqueurs = function() {
	var listeGraphes = "";
	var listeMarqueursCourants = "";

	$.each(charts, function (j, chart) {
		listeGraphes += "<option value='"+ chart.title.textStr +"'>"+chart.title.textStr+"</option>";
	});
	$.each(marqueursCourants, function (j, marqueurCourant) {
		listeMarqueursCourants += "<option value='"+ marqueurCourant.i +"'>"+ marqueurCourant.nom +" &agrave; "+ marqueurCourant.x +"</option>";
	});
	$('#graphe_compo_marqueurs').html(listeGraphes);
	$('#de_compo_marqueurs').html(listeMarqueursCourants);
	$('#a_compo_marqueurs').html(listeMarqueursCourants);
	
}

var compoDates = function() {
	var listeGraphes = "";
	var listeDates = "";

	$.each(charts, function (j, chart) {
		console.log(chart);
		listeGraphes += "<option value='"+ chart.title.textStr +"'>"+chart.title.textStr+"</option>";
	});
	$.each(charts[0].series[0].xData, function (j, timestamp) {
		listeDates += "<option value='"+ j +"'>"+timestamp +" ms : "+ charts[0].series[0].yData[j] +" mV</option>";
	});

	$('#graphe_compo_dates').html(listeGraphes);
	$('#de_compo_dates').html(listeDates);
	$('#a_compo_dates').html(listeDates);
}

var compoSelection = function(graphe, event) {
	if (event.xAxis) {
		//alert('Récupérer '+ event.xAxis[0].min +' et '+event.xAxis[0].max +' dans getChartConfig (multiple_charts.js) ainsi que l\'id du relevé');
		// La selection sur graphe n'est possible que si zoomType est activé, provoquant un zoom. Il faut alors dézoomer :/
		$('#graphe_compo_selection').html(graphe.title.textStr);
		$('#de_compo_selection').html(event.xAxis[0].min);
		$('#a_compo_selection').html(event.xAxis[0].max);
		$('#popup_compo_selection').modal('show');
		setTimeout("Dezoom()", 100);
	}
}

var okMarqueurs = function() {
	var graphe = $('#graphe_compo_marqueurs').val();
	var de = $('#de_compo_marqueurs').val();
	var a = $('#a_compo_marqueurs').val();
	
	console.log('Marqueurs '+ graphe +' '+ de +' '+ a);
	//TODO : BDD
}
var okDates = function() {
	var graphe = $('#graphe_compo_dates').val();
	var de = $('#de_compo_dates').val();
	var a = $('#a_compo_dates').val();

	console.log('Dates '+ graphe +' '+ de +' '+ a);
	//TODO : BDD
	
}
var okSelection = function() {
	var graphe = $('#graphe_compo_selection').text();
	var de = $('#de_compo_selection').text();
	var a = $('#a_compo_selection').text();

	console.log('Selection '+ graphe +' '+ de +' '+ a);
	//TODO : BDD
	
}