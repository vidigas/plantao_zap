function inject(script) {
  var s = document.createElement('script');
  s.src = chrome.extension.getURL(script);
  s.onload = function() {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(s);
}

window.onload = function() {
  const icons = {
    send: chrome.extension.getURL('/public/assets/icons/send.svg'),
    clip: chrome.extension.getURL('/public/assets/icons/clip.svg'),
    image: chrome.extension.getURL('/public/assets/icons/image.svg')
  };

  window.sessionStorage.setItem('tv-icons', JSON.stringify(icons))

  const root = document.createElement('div');
  root.id = 'tv-whatsapp';
  document.body.appendChild(root);

  inject('public/lib/wapi.js');
  inject('public/dist/app.min.js');
};
