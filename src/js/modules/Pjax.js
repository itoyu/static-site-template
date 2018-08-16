import $ from 'jquery';

export default class Pjax {
  constructor(selector) {
    const targets = $(selector);

    targets.each(function(){
      let winW = window.innerWidth * -1;

      $(this).on('click', function(event){
        event.preventDefault();
        let target = $(this).attr('href');

        TweenMax.set('.pageanim', {x: winW});
        TweenMax.to('.pageanim', .8, {ease: Expo.easeOut, x: 0, onComplete: function() {
          console.log(target);
          window.location.href = target;
        }});

        return false;
      });
    });

    window.onresize = function() {
      let ww = window.innerWidth * 1.4;
      $('.pageanim').css('transform', 'matrix(1, 0, 0, 1, ' + ww + ', 0)');
    }
  }
}
