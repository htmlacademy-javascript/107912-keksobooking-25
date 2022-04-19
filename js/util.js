const roundLatLng = (location,accuracy)=>({
  lat : Number(location.lat.toFixed(accuracy)),
  lng : Number(location.lng.toFixed(accuracy))
});

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export{roundLatLng, debounce};
