angular.module('myApp.home', [])
.controller('homeCtrl',['mySocket','$http','homeFac', function(mySocket, $http, homeFac){
	var vm = this;
	homeFac.historical().then(function(graph_data){
		vm.data = {
			graph_data: graph_data.splice(0,15)
		};
		vm.options = {
			margin: {
				top: 80,
				bottom: 30,
				right: 30,
				left: 30
			},
			series: [
			{
				axis: "y",
					dataset: "graph_data",
					key: "price",
					label: "Price",
					color: "hsla(5, 100%, 36%, 1)",
					type: ['line', 'dot', 'area'],
					id: 'mySeries0'
				}
			],
			axes: {x: {key: "t", type:'date', zoomable: true, grid: true}},
			zoom: {
				x:true,
				y:true
			}
		};
	})
	mySocket.on('data', function(data, ack){
		vm.liveClose = data.split(',')[4];
		setTimeout(function(){
			ack(1);
		}, 3000);
	});

	mySocket.on('error', function(error){
		console.log(error);
	});
	mySocket.emit('sub', {state:true}, function(data){
		console.log('3', data);
	});
}])
.factory('homeFac', ['$http', function($http){
	return {
		historical: function(){
			return $http.get('http://kaboom.rksv.net/api/historical?interval=100').then(function(data){
				var historical_data = data.data;
				var graph_data = [];
				for(var i=0; i<historical_data.length; i++){
					var temp = historical_data[i].split(',');
					var time = new Date(parseInt(temp[0]));
					graph_data.push({t: time, price:temp[4]});
				}

				return graph_data;
			})
		}
	}
}]);