'use strict'

import _ from 'lodash';
import Swiper from 'swiper';
import state from '../util/state';

const TopSwiper = class {
  constructor(el) {
    this.tgt = {
      swipers: document.querySelectorAll(el)
    }
    this.init();
  }
  init() {

    const per = (state.dev === 'pc') ? 2 : 1;
    const spd = (state.dev === 'pc') ? 1600 : 1000;
    const spc = (state.dev === 'pc') ? 0 : 50;

    _.forEach(this.tgt.swipers, function(n, key) {
      const TopSwiper = new Swiper (n, {
        effect: 'slide',
        speed: spd,
        slidesPerView: per,
        spaceBetween: spc,
        loop: true,
        centeredSlides: true,
        // autoplay: {
        //   delay: 4000
        // },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
          slideChange: function() {
            // console.log('change');
          },
        }
      });
    });
  }
};
export default TopSwiper;
