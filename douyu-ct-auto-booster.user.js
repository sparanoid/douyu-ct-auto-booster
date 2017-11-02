// ==UserScript==
// @name         Douyu CT Auto Booster
// @namespace    https://sparanoid.com/work/douyu-ct-auto-booster/
// @version      1.0.1
// @description  Auto start China Telecom upload boosting service
// @author       Tunghsiao Liu
// @include      *://*.douyu.com/*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

window.addEventListener('load', function(e) {

  'use strict';

  var reloadInterval = 2; // mins

  console.log('Douyu CT Auto Booster loaded!');

  // https://stackoverflow.com/a/2706236/412385
  function eventFire(el, etype){
    if (el.fireEvent) {
      el.fireEvent('on' + etype);
    } else {
      var evObj = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }

  var el = document.querySelector('#up_div > a');

  if (el) {

    var text = el.textContent;
    console.log('Current button status: ' + text);

    if (text === '启用服务') {
      console.log('Douyu CT Auto Booster not enabled, activating...');
      eventFire(el, 'click');
    } else {
      console.log('Douyu CT Auto Booster enabled, refreshing page in ' + reloadInterval + ' mins...');

      // https://regex101.com/r/ZjdDTQ/1
      var timeText = text.match(/\d+:\d+:\d+/g) || ['00:00:00'];
      var timePart = timeText[0].split(':');
      var remainingTime = (+timePart[0]) * 60 * 60 + (+timePart[1]) * 60 + (+timePart[2]);
      console.log('Remainning time in ' + remainingTime + ' secs');

      // If remainingTime is long enough, lazy refresh the page to get the most
      // accurate remaining time.
      if (remainingTime > 600) {
        setTimeout(function() {
          location.reload();
        }, 1000 * 60 * reloadInterval);
      } else {
        setTimeout(function() {
          location.reload();
        }, 1000 * 10);
      }
    }
  } else {
    console.log('Not Douyu CT Booster page, stop processing...');
  }

}, false);
