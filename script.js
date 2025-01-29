function locomotiveScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

var tl = gsap.timeline();

function loaderAnimation() {
  tl.from(".line h1", {
    y: 150,
    stagger: 0.3,
    opacity: 0,
    duration: 0.6,
    delay: 4,
  });

  tl.from(".line1-part1, .line h2", {
    opacity: 0,
    onStart: function () {
      var h4Timers = document.querySelectorAll(".line1-part1 h4");
      var grow = 0;
      setInterval(function () {
        if (grow <= 100) {
          // Loop through all selected h4 elements
          h4Timers.forEach(function (h4Timer) {
            h4Timer.innerHTML = grow; // Update the inner HTML
          });
          grow++;
        }
      }, 35);
    },
  });

  tl.to(".loader", {
    opacity: 0,
    duration: 0.2,
    delay: 0.5,
  });

  tl.from("#page1", {
    y: 1600,
    opacity: 0,
    delay: 0.2,
    duration: 0.2,
    ease: Power4,
  });

  tl.to(".loader", {
    display: "none",
  });

  tl.from("nav", {
    opacity: 0,
    y: -100,
    duration: 0.5,
  });

  tl.from("#hero1 h1, #hero2 h1, #hero3 h2, #hero4 h1, #page2", {
    y: 150,
    stagger: 0.2,
    opacity: 0,
  });
}

function cursorAnimation() {
  Shery.mouseFollower({
    // skew: true,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1
  });

  Shery.makeMagnet(".nav2 h4", {});

  var videoContainer = document.querySelector(".video-container");
  var video = document.querySelector(".video-container video");

  let flag = 0; // Ensure flag is declared outside

  videoContainer.addEventListener("click", function () {
    if (flag === 0) {
        video.play();
        video.style.opacity = 1;
        document.querySelector(".video-cursor").innerHTML = `<i class="ri-pause-line"></i>`;

        gsap.to(".video-cursor", {
            scale: 0.5,
        });

        flag = 1; // Toggle the flag
    } else {
        video.pause();
        video.style.opacity = 0;
        document.querySelector(".video-cursor").innerHTML = `<i class="ri-play-fill"></i>`;

        gsap.to(".video-cursor", {
            scale: 1,
        });

        flag = 0; // Toggle the flag
    }
});
  // videoContainer.addEventListener("mouseenter", function() {
  //   videoContainer.addEventListener("mousemove", function(dets) {
  //     gsap.to(".mousefollower", {
  //       opacity: 0,
  //     });
  //     gsap.to(".video-cursor", {
  //       left: dets.x - 100,
  //       top: dets.y - 200,
  //       ease: Power4
  //     });
  //   });
  // });

  // videoContainer.addEventListener("mouseleave", function() {
  //   gsap.to(".mousefollower", {
  //       opacity:1
  //   });
  // });
}

function sheryAnimation() {
  Shery.imageEffect(".image-div", {
    style: 5,
    config: {
      a: { value: 2.06, range: [0, 30] },
      b: { value: 0.88, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.8333333333333334 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: false },
      maskVal: { value: 1, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 1 },
      noise_speed: { value: 1.15, range: [0, 10] },
      metaball: { value: 0.34, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0.01, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
    gooey: true,
  });
}

document.addEventListener("mousemove", function(dets) {
  gsap.to("#flag", {
    x:dets.x,
    y:dets.y
  })
})
document.querySelector("#hero3").addEventListener("mouseenter", function(){
  gsap.to("#flag", {
    opacity:1
  })
})
document.querySelector("#hero3").addEventListener("mouseleave", function(){
  gsap.to("#flag", {
    opacity:0
  })
})

gsap.to(".underline", {
  left: 1500, 
  duration: 0.2, 
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".underline",
    scroller: "body",
    start: "top 60%",
    // markers: true
  }
});


loaderAnimation();
cursorAnimation();
locomotiveScroll();
sheryAnimation();
