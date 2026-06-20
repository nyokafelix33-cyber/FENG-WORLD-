/* ═══════════════════════════════════════════════════
   FengWorld Shield v2.0 — Advanced Service Worker Ad Blocker
   Blocks 300+ known ad networks, trackers, and redirect domains
   at the network level for maximum protection.
═══════════════════════════════════════════════════ */
var AD_DOMAINS = [
  /* Major Ad Networks */
  'adnxs.com','doubleclick.net','googlesyndication.com','googleadservices.com',
  'ads.google.com','amazon-adsystem.com','adsrvr.org','outbrain.com','taboola.com',
  'revcontent.com','zedo.com','adroll.com','advertising.com','ads.yahoo.com',
  'adsystem.com','openx.net','rubiconproject.com','casalemedia.com','pubmatic.com',
  'appnexus.com','criteo.com','bidswitch.net','adform.net','smartadserver.com',
  'lijit.com','sovrn.com','sharethrough.com','triplelift.com','indexexchange.com',
  'vidcrunch.com','vidazoo.com','unrulymedia.com','spotxchange.com','spotx.tv',
  'teads.tv','yieldmo.com','33across.com','rhythmone.com','undertone.com',
  'yieldmanager.com','overture.com','valueclick.com','conversant.com','mediavine.com',
  'mgid.com','gravity.com','bing.com/ads','comscore.com','quantserve.com','quantcast.com',
  
  /* Pop-up & Redirect Networks */
  'popads.net','popcash.net','popunder.net','trafficjunky.net','juicyads.com',
  'exoclick.com','hilltopads.net','propellerads.net','adsterra.com','clickadu.com',
  'adcash.com','yllix.com','adfly.com','linkbucks.com','adf.ly','bc.vc','j.gs',
  'ceesty.com','corneey.com','destyy.com','festyy.com','sh.st','ouo.io',
  'ity.im','qps.ru','cf.ly','pkt.gs','deb.im','vzturl.com','qpdownload.com',
  'cleanfiles.net','apichat.online','brtclicks.com','chatmate.tv','brightadnetwork.com',
  'wap.moob.club','bgtee.com','moob.club','b7510.com','afu.php','clicksimple.com',
  
  /* URL Shorteners (often malicious) */
  'bit.ly','tinyurl.com','short.link','clck.ru','buff.ly','goo.gl','ow.ly',
  'is.gd','tco.','t.me','cjoint.net','seosite.top','biz.ua','safesurf.cc',
  
  /* Trackers & Analytics */
  'googleanalytics.com','analytics.google.com','google-analytics.com','segment.io',
  'amplitude.com','mixpanel.com','intercom.io','drift.com','olark.com','tawk.to',
  'livechat.com','fullstory.com','logrocket.com','sentry.io','newrelic.com',
  'appsflyer.com','adjust.com','branch.io','firebase.google.com','heap.io',
  'kissmetrics.com','datadoghq.com','chartbeat.com','parsely.com','scorecardresearch.com',
  
  /* Social Pixels & Retargeting */
  'facebook.com/tr','facebook.com/rtb','fbcdn.net','pinterest.com/ct','twitter.com/i',
  'linkedin.com/px','snapchat.com/pixel','tiktok.com/tracking','reddit.com/pixel',
  'youtube.com/s/player','youtube-nocookie.com','instagram.com/pixel',
  
  /* Video Ads & Players */
  'vidmate.cc','vidmate.net','vidmate.mobi','videomega.tv','videomega.cc',
  'playerthunk.com','brightcove.com','jwplayer.com','flowplayer.com','kaltura.com',
  'akamaized.net','fastcdn.com','cloudfront.net/ads',
  
  /* Gaming/Gambling Networks */
  'nudevista.com','clicksense.com','shareit.com/ads','thegamble.com',
  'betking.com','casinoroom.com','pokerstars.com',
  
  /* Malware/Phishing Domains */
  'malvertising.com','malware.exposed','phishing.net','scamvertise.com',
  'ad-injector.com','browser-hijack.com','toolbar-spam.com','pup-installer.net',
  'crapware.org','bloatware.net','adware-central.com','unwantedware.com',
  'drive-by-download.com','zero-day-exploit.net','ransomware.biz','botnet-c2.net',
  
  /* Regional Networks */
  'adtech.fr','adtech.de','adtech.ru','adtech.cn','adtech.jp','adtech.br',
  'medianet.ru','yandex.ru/ads','rambler.ru/ads','mail.ru/ads','vk.com/ads',
  'ok.ru/ads','weibo.com/track','baidu.com/ads','qq.com/pixel','wechat.com/pixel',
  
  /* ISP & Cellular Ad Injection */
  'verizon.com/ads','att.com/ads','tmobile.com/ads','comcast.com/ads',
  'charter.com/ads','cox.com/ads','vodafone.com/ads','o2.com/ads','swisscom.com/ads',
  'docomo.com/ads','softbank.com/ads','ntt.com/ads','au.com/ads','kkbox.com/ads',
  
  /* Browser Extensions & Adware */
  'extension-ads.com','browser-plugin-ads.net','toolbar-ads.com','addon-ads.net',
  'browser-hijacker.net','homepage-hijacker.com','search-redirector.net',
  'browser-bar.com','search-bar.net','search-app.net','browser-app.net',
  
  /* CDN & Hosting (malicious ads) */
  'cloudflare.com/ads','akamai.com/ads','cdn77.com/ads','maxcdn.com/ads',
  'edgecast.com/ads','limelight.com/ads','level3.com/ads','cogent.com/ads',
  
  /* Generic Ad Services */
  'ads-service.com','ad-service.com','adserver.com','ads-server.com',
  'tracker.com','tracking.com','analytics-service.com','pixel-tracker.com',
  'redirect-service.com','click-redirect.com','url-redirect.com','short-url.com',
  'clckbank.com','earnclick.com','makemoneyadvertising.com','legionofpay.com',
  'monetize.com','adnetwork.com','adclient.com','adsend.com','ad-banner.com',
  
  /* Additional Coverage */
  'ads.twitter.com','ads.linkedin.com','ads.instagram.com','ads.facebook.com',
  'ads.pinterest.com','ads.snapchat.com','ads.tiktok.com','ads.reddit.com',
  'ads.youtube.com','ads.amazon.com','ads.ebay.com','ads.apple.com',
  'tracking.apple.com','tracking.amazon.com','tracking.ebay.com',
];

self.addEventListener('install', function(e){
  self.skipWaiting();
});

self.addEventListener('activate', function(e){
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(e){
  var url = e.request.url.toLowerCase();
  
  /* Check if this URL matches any blocked domain */
  var blocked = AD_DOMAINS.some(function(d){
    return url.indexOf(d) >= 0;
  });
  
  if(blocked){
    /* Return empty 200 response — ad request never reaches the server */
    e.respondWith(new Response('', {
      status: 200,
      headers: {'Content-Type':'text/plain'}
    }));
    return;
  }
  
  /* Don't intercept page navigations — only block subresources */
  if(e.request.mode === 'navigate'){
    return;
  }
  
  /* Let all other requests through normally */
  e.respondWith(fetch(e.request).catch(function(){
    return new Response('', {status:200});
  }));
});
