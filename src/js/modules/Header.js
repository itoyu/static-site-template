'use strict'

import _ from 'lodash';

const Header = class {
  constructor() {
    const hd = document.querySelector('header.global');
    this.tgt = {
			hd: document.querySelector('header.global'),
      hdH: hd.offsetHeight,
      pos: 0
    }
    window.addEventListener('scroll', _.throttle(this.scrl.bind(this), 500));
    this.scrl();
  }
  scrl() {
    const val = window.pageYOffset;
    if (val > this.tgt.pos && val > this.tgt.hdH) {
      this.tgt.hd.style.top = '-' + this.tgt.hdH + 'px';
    } else {
      this.tgt.hd.style.top = 0;
    }
    this.tgt.pos = val;
  }

};
export default Header;
