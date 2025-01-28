gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


var tl = gsap.timeline()

function loaderAnimation() {
    tl.from('.line h1', {
        y: 150,
        stagger: 0.3,
        opacity: 0,
        duration: 0.6,
        delay: 0.5
    })
    
    tl.from('.line1-part1, .line h2', {
        opacity:0,
        onStart: function() {
            var h4Timers = document.querySelectorAll('.line1-part1 h4');
            var grow = 0;
            setInterval(function() {
                if (grow <= 100) {
                    // Loop through all selected h4 elements
                    h4Timers.forEach(function(h4Timer) {
                        h4Timer.innerHTML = grow; // Update the inner HTML
                    });
                    grow++;
                }
            }, 35);
        }
    })
    
    tl.to('.loader', {
        opacity: 0,
        duration:0.2,
        // delay: 3.8
    })
    
    tl.from('#page1', {
        y: 1600,
        opacity: 0,
        delay: 0.2,
        duration: 1,
        ease: Power4
    })
    
    tl.to('.loader', {
        display: 'none'
    })

    tl.from('nav', {
        opacity: 0,
        y: -100,
        duration: 0.5,
    })

    tl.from('#hero1 h1, #hero2 h1, #hero3 h2, #hero4 h1', {
        y: 150,
        stagger: 0.2,
        opacity: 0,
    })
}
function cursorAnimation() {
    document.addEventListener('mousemove', function(dets){
        gsap.to('.crsr', {
            left:dets.x,
            top:dets.y,
        })
    });
    
    Shery.makeMagnet(".nav2 h4",{});
}


loaderAnimation();
cursorAnimation();