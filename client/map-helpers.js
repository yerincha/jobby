const createMapOptions = () => ({
  panControl: false,
  mapTypeControl: false,
  scrollwheel: false,
  zoomControl: true,
  fullscreenControl: false,
  styles: [{ stylers: [{ saturation: -100 }, { gamma: 0.8 }, { lightness: 4 }, { visibility: 'on' }] }],
});


export default { createMapOptions };
