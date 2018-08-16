'use strict'

// import $ from 'jquery';
import _ from 'lodash';
import state from '../util/state.js';

const HeaderNav = class {
  constructor() {
    this.btn = document.querySelector('.js-header-nav');
    this.open = false;
    this.init();
    document.ontouchmove = function(e){ return true; }
  }
  init() {
    const nav = document.querySelector('header.global .nav');
    const bd = document.querySelector('body');

    this.btn.onclick = function(e) {
      e.preventDefault();
      const btn = this;

      if(!this.open) {
        bd.classList.add('fixed');
        document.ontouchmove = function(e){ e.preventDefault(); }
        state.fixed = true;

        _.forEach({ btn, nav }, function(n, key) {
          n.classList.add('current');
        });
      } else {
        bd.classList.remove('fixed');
        document.ontouchmove = function(e){ return true; }
        state.fixed = false;

        _.forEach({ btn, nav }, function(n, key) {
          n.classList.remove('current');
        });
      }
      this.open = !this.open;
    }
  }
};
export default HeaderNav;
