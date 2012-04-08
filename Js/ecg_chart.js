var chart;

$(document).ready(function() {
	idWhere = 'container';	
	title = 'Random';

	Highcharts.setOptions({
		global : {
			useUTC : false
		}
	});

	chart = new Highcharts.StockChart({
		chart : {
			renderTo : idWhere,
			zoomType : "x",
		},

		rangeSelector: {
			buttons: [{
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

		title : {
			text : title
		},

		exporting: {
			enabled: false
		},

		series : [         
		          {
		        	  name : 'serie1',
		        	  id : 'serie1',
		        	  data : [[(new Date()).getTime(), null]]
		          },
		          {
		        	  name : 'serie2',
		        	  id : 'serie2',
		        	  data : [[(new Date()).getTime(), null]]

		          },
		          //FLAGS
		          {
		        	  id: "flags",
		        	  name: "flagflag",
		        	  type: "flags",
		        	  data: []
		          }
		          ]
	});

	function requestData() {
		var x = (new Date()).getTime(), // current time
		y = Math.round(Math.random() * 100);
		y1 = Math.round(Math.random() * 100);
		// add the point
		chart.series[0].addPoint([x, y], true, false);
		chart.series[1].addPoint([x, y1], true, false);
		// call it again after 100ms
		setTimeout(requestData, 100);    
	};

	requestData();
});

function addFlag() {
	var ser = chart.get("flags");
//	var serie = chart.get("serie1");
	ser.addPoint({
		x : (new Date()).getTime()
	}); 
};

function addSerie(nom, data) {
	chart.addSeries({
		name : nom,
		id : nom,
		data : data
	});
};

function rmSerie(nom) {
	chart.get(nom).remove();
}

var data1 = [], time = (new Date()).getTime(), i;

for(var i = -999; i <= 0; i++) {
    data1.push([
        time + i * 1000,
        Math.round(Math.random() * 100)
    ]);
}
