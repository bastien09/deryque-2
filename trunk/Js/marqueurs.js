var marqueurs = [];			//Marqueurs enregistrés
var marqueursCourants = [];	//Marqueurs placés
var compteur = 0;			


var getMarqueur = function (nom) {
	$.each(marqueurs, function (i, marqueur) {
		if (marqueur.nom == nom) {
			return marqueur;
		}
	});
	return null;
};

var createMarqueur = function (nom, abb, desc, couleur) {
	var marqueur = {};
	marqueur.nom = nom;
	marqueur.abb = abb;
	marqueur.desc = desc;
	marqueur.couleur = couleur;
	
	return marqueur;
};

var addMarqueur = function (nom, abb, desc, couleur) {
	marqueur = createMarqueur(nom, abb, desc, "red");
	marqueurs.push(marqueur);
	printMarqueurs();
};

var rmMarqueur = function (nom) {
	for (var i = 0; i < marqueurs.length; i++) {
		if (marqueurs[i].nom == nom) {
			marqueurs.splice(i,1);
			printMarqueurs();
			return;
		}
	}
};

var printMarqueurs = function() {
	var liste = "";
	$.each(marqueurs, function (i, marqueur) {
		liste +="<option>"+ marqueur.nom +"</option>";
	});
	$('#listeMarqueurs').html(liste);
};

var placerMarqueur = function (nom, x) {
	var marqueurCourant = {};
	marqueurCourant.nom = nom;
	marqueurCourant.x = x;
	marqueurCourant.i = compteur++;
	
	$.each(charts, function (i, chart) {
		var ser = chart.get("flags");
		ser.addPoint({
			x : x,
			title : nom,
			id : nom+marqueurCourant.i
		}); 
		chart.xAxis[0].addPlotLine({ 
			value: x,
			color: 'red',
			width: 2,
			id: nom+marqueurCourant.i
		});	
	});
	marqueursCourants.push(marqueurCourant);
	printMarqueursCourants();
};

var rmMarqueurCourant = function (id, i) {
	alert("Suppression de "+ id);
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
		liste +="<li>"+ marqueurCourant.nom +"<a href='#' class='close' onClick='rmMarqueurCourant(\""+ marqueurCourant.nom + marqueurCourant.i +"\","+ marqueurCourant.i +")'>x</a></li>";
	});
	$('#listeMarqueursCourants').html(liste);
};