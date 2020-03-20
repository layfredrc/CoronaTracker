var paris = [48.8534, 2.3488];
//création de la map
var map = L.map("map").setView([48.8534, 2.3488], 6);
//création du calque images
L.tileLayer(
	"https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
	{
		maxZoom: 20
	}
).addTo(map);

// ajout d'un marker

var marker = L.marker(paris).addTo(map);
//ajout d'un popup
marker.bindPopup("<h3> Paris,France.</h3>");

fetch("/get-latest.json")
	.then(response => response.json())
	.then(data => {
		// const places = data.places;
		// const reports = data.reports;
		const { places, reports } = data;
		console.log(places, reports);
		reports
			.filter(report => !report.hide)
			.forEach(report => {
				const { infected, placeId } = report;
				const currentPlace = places.find(place => place.id === placeId);
				console.log(infected, currentPlace);
				L.marker([currentPlace.longitude, currentPlace.latitude]).addTo(map);
			});
	});
