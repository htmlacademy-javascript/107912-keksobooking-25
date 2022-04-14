import {generateCard} from './generate-card.js';
import {createAdvert} from './create-advert.js';
import {roundLatLng} from './util.js';

const MAIN_PIN_SIZE  = 52;
const PIN_SIZE = 40;
const COORDINATE_ACCURACY = 5;
const ZOOM = 13;
const TOKIO_CENTRE = {lat:35.68260, lng:139.75220};

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

const loadMap = (map)=>{
  map.setView(TOKIO_CENTRE, ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainMarker = L.marker(
    TOKIO_CENTRE,
    {
      draggable: true,
      icon: mainPinIcon,
    }
  );

  const adverts = Array.from({length:10}, createAdvert);
  const markersLayer = L.layerGroup().addTo(map);

  adverts.forEach((advert)=>{
    const popupCard = document.createElement('div');
    popupCard.append(generateCard(advert));

    const markerCard = L.marker(
      advert.location,
      {
        draggable: false,
        icon: pinIcon,
      }
    );
    markerCard.addTo(markersLayer).bindPopup(popupCard);
  });

  mainMarker.addTo(map);

  mainMarker.on('moveend', (evt) => {
    const currentPoint = roundLatLng(evt.target.getLatLng(), COORDINATE_ACCURACY);
    document.getElementById('address').value = `${currentPoint.lat}, ${currentPoint.lng}`;
  });

};

export {loadMap};
