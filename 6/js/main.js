import {generateCard} from './generate-card.js';
import {createAdvert} from './create-advert.js';

//Array.from({length:10}, createAdvert); // массив из 10 сгенерированных JS-объектов (объявлений)

//const advert =createAdvert();
//const mapCanvas = document.getElementById('map-canvas');
//map.append(generateCard(advert));

const map = L.map('map-canvas')
  .setView({
    lat: 59.92749,
    lng: 30.31127,
  }, 10);

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
  },
);

marker.addTo(map);

//mapCanvas.append(map);
