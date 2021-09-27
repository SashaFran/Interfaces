document.addEventListener('DOMContentLoaded', () => {
  setTimeout(setVisible, 2000);
});



function setVisible() {
  document.getElementById("page").style.visibility = "visible";
  document.getElementById("loader_").style.visibility = "hidden";
  countDown();
  starCarousel();
}


document.addEventListener("mousemove", parallax);
const elem = document.getElementById("parallax");
    // Magic happens here
    function parallax(e) {
        let _w = window.innerWidth/2;
        let _h = window.innerHeight/2;
        let _mouseX = e.clientX;
        let _mouseY = e.clientY;
        let _depth1 = `${50 - (_mouseX - _w) * 0.02}% ${50 - (_mouseY - _h) * 0.02}%`;
        let _depth2 = `${50 - (_mouseX - _w) * 0.04}% ${50 - (_mouseY - _h) * 0.04}%`;
        let _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${50 - (_mouseY - _h) * 0.06}%`;
        let x = `${_depth3}, ${_depth2}, ${_depth1}`;
        elem.style.backgroundPosition = x;
    }

// CARDS
const boxes = document.querySelectorAll(".box");
window.addEventListener("scroll", scrollNow);
window.addEventListener("wheel", scrollNow);
function scrollNow(){
  const triggerTop = window.innerHeight - 100;
  boxes.forEach((box, idx) => {
    const boxTop = box.getBoundingClientRect().top;

    if (boxTop < triggerTop) {
      box.classList.add("show");
    } else {
      box.classList.remove("show");
    }
  });
}
// FIN CARDS


// Entrada elementos
var $animation_elements = $('.animation-element');
var $window = $(window);

function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);

  $.each($animation_elements, function() {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);

    //check to see if this current container is within viewport
    if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
      $element.addClass('in-view');
    } else {
      $element.removeClass('in-view');
    }
  });
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');
// Fin entrada elementos

//carousel
function starCarousel(){
  const elementosCarousel = document.querySelectorAll('.carousel');
  M.Carousel.init(elementosCarousel, {
    duration: 100,
    dist: -80,
    shift: 2,
    padding: 5,
    numVisible: 3,
    indicators: true,
    noWrap: false
  });
};

//countdown
var digitSegments = [
    [1,2,3,4,5,6],
    [2,3],
    [1,2,7,5,4],
    [1,2,7,3,4],
    [6,7,2,3],
    [1,6,7,3,4],
    [1,6,5,4,3,7],
    [1,2,3],
    [1,2,3,4,5,6,7],
    [1,2,7,3,6]
]

function countDown(){
  const second = 1000,
       minute = second * 60,
       hour = minute * 60,
       day = hour * 24;

 let estreno = "Dec 30, 2020 00:00:00",
     countDown = new Date(estreno).getTime(),
     x = setInterval(function() {

       let now = new Date().getTime(),
           distance = countDown - now;

       document.getElementById("days").innerText = Math.floor(distance / (day)),
         document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
         document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
         document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

       //do something later when date is reached
       if (distance < 0) {
         let headline = document.getElementById("headline"),
             countdown = document.getElementById("countdown"),
             content = document.getElementById("content");

         headline.innerText = "Se etreno!";
         countdown.style.display = "none";
         content.style.display = "block";

         clearInterval(x);
       }
       //seconds
     }, 0)
 }
 function validateEmail(emailField){
         var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

         if (reg.test(emailField.value) == false)
         {
             alert('Invalid Email Address');
             return false;
         }

         return true;

 }
 AOS.init({
  duration: 1200,
})
