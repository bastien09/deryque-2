var compositions = [];

var addComposition = function(cname) {
	compositions[cname] = [];
}

/**
 * Ajoute une sélection à la composition donnée.
 * @param {Object} cname Le nom de la composition
 * @param {Object} graphName Le nom du graphe duquel est issu la sélection
 * @param {Object} debut
 * @param {Object} fin
 */
var addSelectionToComposition = function(cname,graphName,debut,fin) {
	var selection = new Object();
	selection.graph = graphName;
	selection.debut = debut;
	selection.fin = fin;
	
	compositions[cname].push(selection);
}

var initCompositions = function() {
	//TODO utiliser compositions ( modifie le remplissage du tableau composition comme tu veux)
}
