'use strict'

import state from '../util/state';

const Pagetop = class {
  constructor() {
    this.tgt = {
			btn: document.querySelector('#pagetop'),
      spc: (state.dev === 'pc') ? 120 : 88,
    }
    window.addEventListener('scroll', _.throttle(this.scrl.bind(this), 50));
    this.scrl();
  }
  scrl() {
    const pos = document.querySelector('footer.global').getBoundingClientRect().top + this.tgt.spc;
    if (window.innerHeight >= pos) {
      this.tgt.btn.classList.remove('fixed');
    } else {
      this.tgt.btn.classList.add('fixed');
    }
  }
};
export default Pagetop;
