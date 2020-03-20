import "https://api.mapbox.com/mapbox-gl-js/v1.8.0/mapbox-gl.js";

const mapbox_token =
	"pk.eyJ1Ijoic25vd2RlciIsImEiOiJjazgwNnlpZGEwMmk4M2RvZGZtMGo1N2drIn0.SVInkbG2WYBRLNp1Zt5frQ";

mapboxgl.accessToken = mapbox_token;

var map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/mapbox/dark-v10",
	zoom: 1.5,
	center: [0, 20]
});

const getColorFromCount = count => {
	if (count >= 100) {
		return "red";
	}
	if (count >= 10) {
		return "blue";
	}
	return "gray";
};

fetch("/get-latest.json")
	.then(response => response.json())
	.then(data => {
		// const places = data.places;
		// const reports = data.reports;
		const { places, reports } = data;

		reports
			.filter(report => !report.hide)
			.forEach(report => {
				const { infected, placeId } = report;
				const currentPlace = places.find(place => place.id === placeId);
				console.log(infected, currentPlace);
				new mapboxgl.Marker({
					color: "red"
				})
					.setLngLat([currentPlace.longitude, currentPlace.latitude])
					.addTo(map);
			});
	});

// Avoir les données d'infectés en direct
var settings = {
	async: true,
	crossDomain: true,
	url:
		"https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php",
	method: "GET",
	headers: {
		"x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
		"x-rapidapi-key": "6bc7479adfmshbb660935776cbdbp1d7cd9jsn4d267cfbdc8b"
	}
};

$.ajax(settings).done(function(response) {
	console.log(response);
});
