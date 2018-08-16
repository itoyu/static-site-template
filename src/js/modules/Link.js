'use strict'

import $ from 'jquery';

const Link = class {
  constructor(el) {
    const tgt = $(el);
    // const tgt = document.querySelector('header.global');

    tgt.each(function(){

      $(this).on('click', function(e){
        e.preventDefault();

        let href = $(this).attr('href'),
          target = $(href == '#' || href == '' ? 'html' : href),
          position = target.offset().top - 80;
        position = (position > 0) ? position - 0 : position;
        $('body,html').animate({scrollTop: position}, 800);
        return false;
      });
    });
  }
}

export default Link;
