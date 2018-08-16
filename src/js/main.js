import './polyfill'
// import $ from 'jquery';
import Header from './modules/Header';
import HeaderNav from './modules/HeaderNav';
import Pagetop from './modules/Pagetop';
import Link from './modules/Link';

import TopSwiper from './modules/TopSwiper';

import state from './util/state';
state.dev = (window.innerWidth > 768) ? 'pc' : 'sp';

window.addEventListener('DOMContentLoaded', function() {
  new Header();
  new HeaderNav();
  new Pagetop();
  new Link('.slink');

  if(document.querySelector('.swiper')) {
    new TopSwiper('.swiper');
  }

  // new Links('.js-slink');
});

window.onload = function(){
  // console.log('load script');
  if(document.querySelector('.bg_top')) {
    // new TopKv('.bg_top');
  }

  document.querySelector('#wrap').classList.add('ready');
};

window.addEventListener('resize', _.throttle(function() {

}, 500));
