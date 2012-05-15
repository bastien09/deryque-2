// SOUS "CLASSE" DE MINICHART
var composition = [];
var dataCharts = [];
var compteurComposition = 0;

var addComposition = function(nom, debut, fin) {
	var intervalle = [];
	intervalle.min = debut;
	intervalle.max = fin;
	showChart(composition, "composition", compteurComposition, 0, dataCharts, intervalle, nom);
	compteurComposition++;
}

var computeData = function(i, section) {
	var tmp = [];
	for(var x = 1; x < dataCharts[i].length; x++) {
		if (dataCharts[i].data[x].x >= section.max)
			return tmp;
		if (dataCharts[i].data[x].x >= section.min) {
			tmp.push([dataCharts[i].data[x].x*1000, tab[i][x].y]);
		}
	}
	return tmp;
}