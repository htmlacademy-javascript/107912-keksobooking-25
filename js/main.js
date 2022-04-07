import {generateCard} from './generate-card.js';
import {createAdvert} from './create-advert.js';

//Array.from({length:10}, createAdvert); // массив из 10 сгенерированных JS-объектов (объявлений)

const advert =createAdvert();
const map = document.getElementById('map-canvas');
map.append(generateCard(advert));
