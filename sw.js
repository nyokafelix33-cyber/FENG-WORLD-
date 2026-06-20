/* ═══════════════════════════════════════════════════
   FengWorld Shield — Service Worker Ad Blocker
   Intercepts ALL network requests and blocks known
   ad/redirect domains at the network level.
═══════════════════════════════════════════════════ */
var AD_DOMAINS = [
  'bgtee.com','moob.club','b7510.com','afu.php',
  'adnxs.com','doubleclick.net','googlesyndication.com',
  'googleadservices.com','ads.google.com','amazon-adsystem.com',
  'adsrvr.org','outbrain.com','taboola.com','revcontent.com',
  'zedo.com','adroll.com','advertising.com','ads.yahoo.com',
  'adsystem.com','popads.net','popcash.net','popunder.net',
  'trafficjunky.net','juicyads.com','exoclick.com',
  'hilltopads.net','propellerads.com','adsterra.com',
  'clickadu.com','adcash.com','yllix.com','adfly.com',
  'linkbucks.com','adf.ly','bc.vc','j.gs','ceesty.com',
  'corneey.com','destyy.com','festyy.com','sh.st','ad.fly',
  'ouo.io','ity.im','qps.ru','cf.ly','pkt.gs','deb.im',
  'vzturl.com','qpdownload.com','cleanfiles.net',
  'apichat.online','brtclicks.com','chatmate.tv',
  'brightadnetwork.com','nectsideaments.com',
  'wap.moob.club','zm.wap','partitial','gamifun',
  'newgrounds.com/adngin','adhigh','adlabel',
  'adskeeper','ad-sterra','pubdirecte','trafftime',
  'go.ad2up','openx.net','rubiconproject.com',
  'casalemedia.com','pubmatic.com','appnexus.com',
  'criteo.com','bidswitch.net','adform.net',
  'smartadserver.com','lijit.com','sovrn.com',
  'sharethrough.com','triplelift.com','indexexchange.com',
  'vidcrunch.com','vidazoo.com','unrulymedia.com',
  'spotxchange.com','spotx.tv','teads.tv','yieldmo.com',
  '33across.com','rhythmone.com','undertone.com',
  'yieldmanager.com','overture.com','valueclick.com',
];

self.addEventListener('install', function(e){
  self.skipWaiting();
});
self.addEventListener('activate', function(e){
  e.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', function(e){
  var url = e.request.url.toLowerCase();
  var blocked = AD_DOMAINS.some(function(d){ return url.indexOf(d) >= 0; });
  if(blocked){
    /* Return empty 200 response — the request never reaches the ad server */
    e.respondWith(new Response('', {
      status: 200,
      headers: {'Content-Type':'text/plain'}
    }));
    return;
  }
  /* Let everything else through normally — never intercept navigation
     requests, only subresource fetches (img/script/iframe/etc) */
  if(e.request.mode === 'navigate'){
    return; /* don't touch page navigations at all */
  }
  e.respondWith(fetch(e.request).catch(function(){
    return new Response('', {status:200});
  }));
});
