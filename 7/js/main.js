import {activatePage,deactivatePage} from './page-behavior.js';
import {loadMap} from './map.js';

deactivatePage();

const map = L.map('map-canvas').on('load',activatePage);
loadMap(map);
