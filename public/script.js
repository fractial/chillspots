var map = L.map('map', {zoomControl: false});

map.setView([50.110924, 8.682127], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data by &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(map);

var attribution = map.attributionControl;

attribution.setPrefix('Made by &copy; 2023 Christian Staab & Timo Staab');

var searchContainer = L.DomUtil.create('div', 'search-container', document.getElementById('search'));

var search = L.Control.openCageGeocoding({
    key: '693ad8cafc2a4bc78adde85f04c77458',
    position: 'topleft',
    placeholder: 'Search for a city, plz, etc...',
    errorMessage: '',
}).addTo(map);

searchContainer.appendChild(search.getContainer());

var icon = L.icon({
    iconUrl: 'assets/icon.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    markerAnchor: [15, 15]
});

fetch('markers.json').then(response => {
    return response.json();
}).then(data => {
    data.forEach(element => {
        if (element.auth == true) {
            var marker = L.marker([element.lat, element.lng], {icon: icon}).addTo(map);
            var popup = `<img class="popup" src="../uploads/${element.image}" alt="${element.name}"><h1>${element.name}</h1><p>${element.desc}</p><a href="https://www.google.com/maps?q=${element.lat},${element.lng}" target="_blank">Google Maps</a>`
            marker.bindPopup(popup).closePopup();
        }
    });
}).catch(error => {
    console.log('Error fetching or parsing data', error);
})

map.on('click', () => {
    var alternatives = document.querySelector('.leaflet-control-opencage-geocoding-alternatives');
    if (alternatives) {
        alternatives.remove();
    }
})

const add = document.getElementById('add');
const formContainer2 = document.getElementsByClassName('form-container-2')[0];

let is_clicked = false;

add.addEventListener('click', () => {
    if (is_clicked == false) {
        console.log('OOONNNN')
        is_clicked = true;
        formContainer2.style.opacity = 1;
        formContainer2.style.pointerEvents = 'all'
    } else {
        console.log('OOOFFFF')
        if (currentMarker) {
            map.removeLayer(currentMarker);
        }
        is_clicked = false;
        formContainer2.style.opacity = 0;
        formContainer2.style.pointerEvents = 'none'
    }
});

let currentMarker = null;

let lat;
let lng;

map.on('click', (e) => {
    if (is_clicked == true) {
        if (currentMarker) {
            map.removeLayer(currentMarker);
        }
        currentMarker = L.marker(e.latlng, {icon: icon}).addTo(map);
        
        lat = e.latlng.lat;
        lng = e.latlng.lng;
    }
});

function submitForm() {
    document.getElementById('lat').value = lat;
    document.getElementById('lng').value = lng;
    form.submit();
}