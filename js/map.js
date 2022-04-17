import {roundLatLng} from './util.js';
import {getData} from './api.js';
import {generateCard} from './generate-card.js';
import {activatePage} from './page-behavior.js';
const addressField = document.querySelector('#address');

///////////////////////
import {createAdvert} from './create-advert.js';
//////////////////////

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

const mainMarker = L.marker(
  TOKIO_CENTRE,
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

const setMarkerPointToAdreessField = (marker)=>{
  const currentPoint = roundLatLng(marker.getLatLng(), COORDINATE_ACCURACY);
  addressField.value = `${currentPoint.lat}, ${currentPoint.lng}`;
};

const map = L.map('map-canvas');

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

mainMarker.on('moveend', (evt)=>setMarkerPointToAdreessField(evt.target));
mainMarker.addTo(map);

const markersLayer = L.layerGroup().addTo(map);

const resetMapMainMarker = ()=>{
  map.setView(TOKIO_CENTRE, ZOOM);
  mainMarker.setLatLng(TOKIO_CENTRE);
  setMarkerPointToAdreessField(mainMarker);
  map.closePopup();
};

const renderMarkersOnMap = (adverts)=>{
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
};

const onSuccessRequest = (adverts)=>{
  activatePage();
  console.log(adverts);
  //adverts = Array.from({length:10}, createAdvert);
  renderMarkersOnMap(adverts);
};

map.on('load',()=>{
  getData(
    onSuccessRequest,
    (err)=>console.error(err)
  );}
);

resetMapMainMarker(); //вызов map.on('load'...)

export {renderMarkersOnMap, resetMapMainMarker};
