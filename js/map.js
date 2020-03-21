import "https://api.mapbox.com/mapbox-gl-js/v1.8.0/mapbox-gl.js";

//API KEY
const mapbox_token =
	"pk.eyJ1Ijoic25vd2RlciIsImEiOiJjazgwNnlpZGEwMmk4M2RvZGZtMGo1N2drIn0.SVInkbG2WYBRLNp1Zt5frQ";

mapboxgl.accessToken = mapbox_token;
// création de la map
var map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/mapbox/dark-v10",
	zoom: 1.5,
	center: [0, 20]
});

// Couleur du marker selon le nb d'infectés
//(obsolete comme il y'en a trop mtn)
const getColorFromCount = count => {
	if (count >= 100) {
		return "red";
	}
	if (count >= 10) {
		return "blue";
	}
	return "gray";
};

// requête vers le fichier json qu'on a recuperer du site coronaAPP car API Payant
// données pas à jour
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
//Decalring the Different Variable and Objects
let new_cases = document.getElementById("new_case");
let new_death = document.getElementById("new_death");
let total_death = document.getElementById("total_death");
let total_recovered = document.getElementById("total_recovered");
let total_cases = document.getElementById("total_cases");
let table = document.getElementById("countries_stat");
// Fetching the Data from the server

//Fetching the World Data

var settings = {
	async: true,
	crossDomain: true,
	url: "https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php",
	method: "GET",
	headers: {
		"x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
		"x-rapidapi-key": "6bc7479adfmshbb660935776cbdbp1d7cd9jsn4d267cfbdc8b"
	}
};

$.ajax(settings).done(function(response) {
	console.log(response);
	var data = JSON.parse(response);
	total_cases.innerHTML = data.total_cases;
	new_cases.innerHTML = data.new_cases;
	new_death.innerHTML = data.new_deaths;
	total_death.innerHTML = data.total_deaths;
	total_recovered.innerHTML = data.total_recovered;
});

//Fetching The Case by Country Data

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
	var data = JSON.parse(response);
	let countries_stat = data.countries_stat;
	//Getting all the country statistic using a loop
	for (let i = 0; i < countries_stat.length; i++) {
		console.log(countries_stat[i]);
		//we will start by inserting the new rows inside our table
		let row = table.insertRow(i + 1);
		let country_name = row.insertCell(0);
		let cases = row.insertCell(1);
		let deaths = row.insertCell(2);
		let serious_critical = row.insertCell(3);
		let recovered_per_country = row.insertCell(4);
		country_name.innerHTML = countries_stat[i].country_name;
		cases.innerHTML = countries_stat[i].cases;
		deaths.innerHTML = countries_stat[i].deaths;
		serious_critical.innerHTML = countries_stat[i].serious_critical;
		recovered_per_country.innerHTML = countries_stat[i].total_recovered;
	}
});
