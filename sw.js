const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  './',
  'index.html',
  'css/animate2.css',
  'css/bootstrap.min.css',
  'css/fonts.css',
  'css/owl.carousel.min.css',
  'css/owl.theme.default.min.css',
  'css/style.css',
  'fonts/6xK3dSBYKcSV-LCoeQqfX1RYOo3qNa7lujVj9_mf.woff2',
  'js/bootstrap.min.js',
  'js/jquery.min.js',
  'js/jquery.sticky.js',
  'js/owl.carousel.min.js',
  'js/tilt.jquery.js',
  'js/wow.min.js',
  'img/banner.svg',
  'img/bgDNA.svg',
  'img/bookmark.svg',
  'img/browsers.svg',
  'img/certificate.svg',
  'img/chat.svg',
  'img/colors_wide_2.png',
  'img/dpcicon.png',
  'img/icon.png',
  'img/imgDNA.png',
  'img/envelope.svg',
  'img/good.svg',
  'img/logo.png',
  'img/map-location.svg',
  'img/maps-and-flags.svg',
  'img/menu.svg',
  'img/monitor.svg',
  'img/phone-receiver.svg',
  'img/placeholder.svg',
  'img/purple.svg',
  'img/red.svg',
  'img/screen_2X.png.svg',
  'img/simple-iphone.svg',
  'img/men.svg'

];

self.addEventListener('install', function(event) {
  event.waitUntil( /* Este método estende o evento ONINSTALL e aplica um estado ao evento chamado ONINSTALLING */
    caches.open(CACHE_NAME) /* O objeto caches é criado com um namespace e retorna uma Promise */
      .then(function(cache) {
        // console.log('Cache aberto');
        return cache.addAll(urlsToCache); /* E por fim, conseguimos manipular o objeto de cache corrente */
      })
  );
});

self.addEventListener('activate', function(event) {
    console.log('activate');
      event.waitUntil(
        cache.keys().then(function(keys){
            return Promise.all(keys 
              .filter(function(key){
                  return key.indexOf(CACHE_NAME) !== 0
              })
              .map(function(key){
                return caches.delete(key);
              }) 
            )
        })
      )
})

self.addEventListener('fetch', function(event){
    event.respondWith(
      caches.match(event.request).then(function(response){
        return response || fetch(event.request);
      })
    )

})

