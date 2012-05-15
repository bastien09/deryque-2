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
};

var computeData = function(i, section, title) {
	var tmp = [];
	var indice = 0;
	for (var y = 0; y < dataCharts.length; y++) {
		if (dataCharts[y].name == title) {
			console.log('Gg');
			indice = y;
			break;
		}
	}
	for(var x = 0; x < dataCharts[indice].length; x++) {
		var leX = dataCharts[indice][x].x*1000;
		if (leX >= section.max)
			return tmp;
		if (leX >= section.min) {
			tmp.push([leX, dataCharts[indice][x].y]);
		}
	}
	return tmp;
};