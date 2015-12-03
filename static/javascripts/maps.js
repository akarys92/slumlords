function buildMap() {
	var mapOptions = {
		zoom: 4
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	for (var prop in vm.currLandlord.properties) {
		var property = vm.currLandlord.properties[prop];
		var lat = property.lattitude;
		var lng = property.longitude;

		console.log(property);
		console.log(lng);

		var myLatlng = new google.maps.LatLng(lat, lng);
		var marker = new google.maps.Marker({
		      position: myLatlng,
		      map: map,
		      title: 'Hello World!'
		});
	}
}

google.maps.event.addDomListener(window, 'load', buildMap);