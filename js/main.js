import {generateCard} from './generate-card.js';
import {createAdvert} from './create-advert.js';
const MAIN_PIN_SIZE = 52;
const PIN_SIZE = 40;

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [MAIN_PIN_SIZE, MAIN_PIN_SIZE],
  iconAnchor: [MAIN_PIN_SIZE/2, MAIN_PIN_SIZE],
});

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [PIN_SIZE, PIN_SIZE],
  iconAnchor: [PIN_SIZE/2, PIN_SIZE],
});

//Array.from({length:10}, createAdvert); // массив из 10 сгенерированных JS-объектов (объявлений)

// const advert = createAdvert();
// const map = document.getElementById('map-canvas');
// map.append(generateCard(advert));


const map = L.map('map-canvas')
  .setView({
    lat: 59.92749,
    lng: 30.31127,
  }, 11);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const marker = L.marker(
  {
    lat: 59.96831,
    lng: 30.31748,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

const marker2 = L.marker(
  {
    lat: 59.95515,
    lng: 30.31748,
  },
  {
    draggable: false,
    icon: pinIcon,
  }
);
//const markersLayer = L.layerGroup().addTo(map);

marker.addTo(map);
marker2.addTo(map).bindPopup(generateCard(createAdvert()));

marker.on('moveend', (evt) => {
  document.getElementById('address').value = evt.target.getLatLng();
});
