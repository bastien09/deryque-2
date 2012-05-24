var compositions = [];
var dataCharts = [];

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
	var section = new Object();
	section.min = debut;
	section.max = fin;
	selection.graph = graphName;
	selection.section = section;

	compositions[cname].push(selection);
}

var showBigChart = function(divName, composition) {
	$('#'+ divName).append('<div id="chartBloc"><a class="close" href="#" onClick="rmChart(\''+ divName +'\', '+i+')">x</a><div id="'+divName+''+i+'" style="margin:20px;"></div></div>');
	where.push(
			new Highcharts.StockChart({
				chart : {
					renderTo : divName+''+i+'-'+j,
					height:300,
					width:600
				},
				title : {
					text : title
				},
				rangeSelector : {
					buttons: [{
						count: 1,
						type: 'second',
						text: '1s'
					},
					{
						count: 10,
						type: 'second',
						text: '10s'
					},
					{
						count: 30,
						type: 'second',
						text: '30s'
					}, {
						count: 1,
						type: 'minute',
						text: '1min'
					}, {
						type: 'all',
						text: 'All'
					}],
					inputEnabled: false,
					selected: 0
				},
				series : [{
					name : title,
					data : computeData(i, composition)
				}],
				exporting : {
					enabled : false
				}
			}));

};

var computeData = function(i, composition) {
	var indice = 0;
	var tmp = [];
	$.each(composition, function (i, compo) {
		for (var x = 0; x < dataCharts.length; x++) {
			if (compo.graph == dataCharts[x].name) {
				indice = x; 
				break;
			}	
		}
		for(var x = 0; x < dataCharts[indice].length; x++) {
			var leX = dataCharts[indice][x].x*1000;
			if (leX >= compo.section.max)
				break;
			if (leX >= compo.section.min) {
				tmp.push([leX, dataCharts[indice][x].y]);
			}
		}
	});
	return tmp;
};

var initCompositions = function() {
	//TODO utiliser compositions ( modifie le remplissage du tableau composition comme tu veux)
	console.log(compositions);
	$.each(compositions, function (i, compo) {
		console.log("Une compo");
		showBigChart('composition', compo);
	});
}
