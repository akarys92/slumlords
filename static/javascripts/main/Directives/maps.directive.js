
angular.module('slumlords.main.directives').directive('slumMap', function(){
	return {
		scope: {
			properties: '=properties',
		},
		templateUrl: '/static/templates/snippets/mapTile.html',
		controller: 'mapsController',
		controllerAs: 'maps'
	}
})
.controller('mapsController', function mapsController($scope, $location, Main){
	
	var maps = this;
	google.maps.event.addDomListener(window, 'load', buildMap);
	maps.properties = [];
	maps.map = {};

	function buildMap() {
		var mapOptions ={
			center: new google.maps.LatLng(44.5403, -78.5463),
			zoom: 4,
			disableDefaultUI: true
		};
		var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
		maps.map = map;
		var markers = getPropsInBounds();		

		maps.map.setZoom(maps.map.getZoom() - 1);
		var timeout;
		maps.map.addListener('bounds_changed', function(){
			window.clearTimeout(timeout);
			timeout = window.setTimeout(function () {
				var dims = getBounds();
				var props = Main.getPropsByBounds(dims[0], dims[1], dims[2], dims[3]);
				props.success(function(data, status, headers, config){
					$scope.properties = data;
					getPropsInBounds();
				}).
				error(function(data, status, headers, config){
					alert("Error in updatePropsInBounds!");
				});
				console.log($scope.properties);
			}, 500);

		});
		buildLegend();
		function getBounds() {
			var neLat = maps.map.getBounds().getNorthEast().lat();
			var neLong = maps.map.getBounds().getNorthEast().lng();
			var swLat = maps.map.getBounds().getSouthWest().lat();
			var swLong = maps.map.getBounds().getSouthWest().lng();;
    			return [neLat, neLong, swLat, swLong];
    			//updatePropsInBounds(neLat, neLong, swLat, swLong);
		};
		function buildLegend() {
			map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('legend'));
			var legend = document.getElementById('legend');
			var baseUrl = '/static/assets/markers/';
			var styles = [
				{"name": "No reviews yet",
				"icon": baseUrl + "blackMark.png"
				},
				{"name": "Avg. Review <=1",
				"icon": baseUrl + "redMark.png"
				},
				{"name": "Avg. Review >1 & <=2",
				"icon": baseUrl + "orangeMark.png"
				},
				{"name": "Avg. Review >2 & <=3",
				"icon": baseUrl + "midMark.png"
				},
				{"name": "Avg. Review >3 & <=4",
				"icon": baseUrl + "aquaMark.png"
				},
				{"name": "Avg. Review >4",
				"icon": baseUrl + "greenMark.png"
				}
			];
			for (var style in styles) {
  				var name = styles[style].name;
  				var icon = styles[style].icon;
  				var div = document.createElement('div');
				div.innerHTML = '<img src="' + icon + '"> ' + name;
				legend.appendChild(div);
			}

		};
		
		//console.log(maps.map.getBounds().getNorthEast().lat())
	};
	function getPropsInBounds () {
		var markers = [];
		var map = maps.map;
		for (var prop in $scope.properties) {
			var property = $scope.properties[prop];
			var lat = property.lattitude;
			var lng = property.longitude;
			var icon = getMarkerIcon(property);
			var myLatlng = new google.maps.LatLng(lat, lng);
			var marker = new google.maps.Marker({
			      position: myLatlng,
			      map: map,
			      icon: icon,
			      title: 'Hello World!'
			});
			//var llName = maps.currLandlord.name + " " + maps.currLandlord.last_name;
			var review = property.review;
			var address = property.street_address;

			var card = buildPropCard("Update Needed", review, address);
			var infoWindow = new google.maps.InfoWindow({
				content: card
			});
			google.maps.event.addListener(marker, 'click', function() {
				infoWindow.open(map,marker);
			});

			markers.push(marker);
		}
		var bounds = new google.maps.LatLngBounds();
		for(var i in markers) {
			bounds.extend(markers[i].getPosition());
		}
		//maps.map.setCenter(bounds.getCenter());
		//maps.map.fitBounds(bounds);
		return markers;

	};
	
	function buildPropCard(name, review, address) {
			var output = '<div class="property-card"><div class="header"><h3>' + address + '</h3></div><div class="body"><table><tr><td>Owner: </td><td>' + name + '</td></tr><tr><td>Property Review: </td><td>' + review + '</td></tr></table></div></div>';
			return output;
	}; 
	function getMarkerIcon(prop) {
		var baseUrl = '/static/assets/markers/';
		var suffix = '';
		if (prop.total_reviews == 0) {
			suffix = 'blackMark.png';
		}
		else {
			if (prop.average_review <= 1) {
				suffix = 'redMark.png';
			}
			else if (prop.average_review <= 2) {
				suffix = 'orangeMark.png';
			}
			else if (prop.average_review <= 3) {
				suffix = 'midMark.png';
			}
			else if (prop.average_review <= 4) {
				suffix = 'aquaMark.png';
			}
			else if (prop.average_review <= 5) {
				suffix = 'greenMark.png';
			}
		}
		var icon = {
			url: baseUrl + suffix,
    			scaledSize: new google.maps.Size(10
    				, 10)
    		};
		return icon;
	};
	buildMap();
});
