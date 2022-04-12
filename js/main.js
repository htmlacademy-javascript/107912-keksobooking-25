// import {generateCard} from './generate-card.js';
// import {createAdvert} from './create-advert.js';

//Array.from({length:10}, createAdvert); // массив из 10 сгенерированных JS-объектов (объявлений)

//const advert =createAdvert();
//const mapCanvas = document.getElementById('map-canvas');
//map.append(generateCard(advert));

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

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

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


marker.addTo(map);

marker.on('moveend', (evt) => {
  document.getElementById('address').value = evt.target.getLatLng();
});
//mapCanvas.append(map);
