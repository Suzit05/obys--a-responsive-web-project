
function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });






    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

function loadingAnimation() {
    var tl = gsap.timeline();

    tl.from(".line h1", {
        opacity: 0,
        y: 150,
        delay: 1,
        stagger: 0.3
    })




    tl.from(".line-part1, .line h2", {
        opacity: 0,
        onStart: function () {  //onStart k dwara koi func gsap m use kr skte hai
            const h5 = document.querySelector(".line-part1 h5")
            let count = 0;
            const timer = setInterval(() => {
                if (count < 100)
                    count++;
                h5.innerHTML = count
                console.log(count)

            }, 35)
        }

    })

    tl.to("#loader", {
        opacity: 0,
        delay: 3.5,
        duration: 2
    })


    tl.from("#page1", {
        opacity: 0,
        delay: 0.2,
        y: 1200
    })
    tl.to("#loader", {
        display: "none",
    })

    tl.from("#nav", {
        opacity: 0
    })


    tl.from("#hero h1", {
        y: 140,
        stagger: 0.2
    })

}

loadingAnimation()

function cursorAnimation() {
    document.addEventListener("mousemove", (dets) => {
        gsap.to("#crsr", {
            left: dets.x,
            top: dets.y,
            opacity: 0.6
        })
    })

    Shery.makeMagnet("#navpart2 h3" /* Element to target.*/);
    const videoContainer = document.querySelector("#video-container")

    videoContainer.addEventListener("mouseenter", () => {
        videoContainer.addEventListener("mousemove", (dets) => {
            gsap.to("#crsr", {
                display: "none",
                opacity: 0, //crsr ko gyb kar do , jb video k andr aaega
            })
            gsap.to("#video-cursor", {
                left: dets.x - 570,
                top: dets.y - 340
            })
        })
    })
    videoContainer.addEventListener("mouseleave", () => {
        gsap.to("#crsr", {
            display: "initial",
            opacity: 1,  //video container k bhar jaega to wps cursor aa jaaega
        })
        gsap.to("#video-cursor", {
            top: "-8%",
            left: "80%", //to its initial positon (jake css m dekh lo)
        })
    })
    var flag = 0;  //ye bnaye video play and pause krne k liye
    videoContainer.addEventListener("click", () => { //click krne k baad img cursor htate hue
        if (flag == 0) {
            gsap.to("#video-container video", {
                opacity: 1
            })
            gsap.to("#video-container img", {
                opacity: 0
            })
            gsap.to("#video-cursor", {
                scale: 0.5
            })
            document.querySelector("#video-cursor").innerHTML = `<i class="ri-pause-mini-line"></i>`
            //back tik lga k "i" bdl do
            flag = 1;
        }
        else {
            gsap.to("#video-container video", {
                opacity: 0
            })
            gsap.to("#video-container img", {
                opacity: 1
            })
            gsap.to("#video-cursor", {
                scale: 1
            })
            document.querySelector("#video-cursor").innerHTML = `<i class="ri-play-mini-fill"></i>`
            //back tik lga k "i" bdl do
            flag = 0;
        }

    })
}

function sheryAnimation() {
    Shery.imageEffect("#image-div", {
        style: 5,
        config: { "a": { "value": 2, "range": [0, 30] }, "b": { "value": 0.75, "range": [-1, 1] }, "zindex": { "value": "9996999", "range": [-9999999, 9999999] }, "aspect": { "value": 0.7272727360300675 }, "ignoreShapeAspect": { "value": true }, "shapePosition": { "value": { "x": 0, "y": 0 } }, "shapeScale": { "value": { "x": 0.5, "y": 0.5 } }, "shapeEdgeSoftness": { "value": 0, "range": [0, 0.5] }, "shapeRadius": { "value": 0, "range": [0, 2] }, "currentScroll": { "value": 0 }, "scrollLerp": { "value": 0.07 }, "gooey": { "value": true }, "infiniteGooey": { "value": false }, "growSize": { "value": 4, "range": [1, 15] }, "durationOut": { "value": 1, "range": [0.1, 5] }, "durationIn": { "value": 1.5, "range": [0.1, 5] }, "displaceAmount": { "value": 0.5 }, "masker": { "value": true }, "maskVal": { "value": 1.24, "range": [1, 5] }, "scrollType": { "value": 0 }, "geoVertex": { "range": [1, 64], "value": 1 }, "noEffectGooey": { "value": true }, "onMouse": { "value": 0 }, "noise_speed": { "value": 0.2, "range": [0, 10] }, "metaball": { "value": 0.46, "range": [0, 2] }, "discard_threshold": { "value": 0.5, "range": [0, 1] }, "antialias_threshold": { "value": 0, "range": [0, 0.1] }, "noise_height": { "value": 0.37, "range": [0, 2] }, "noise_scale": { "value": 10, "range": [0, 100] } },
        gooey: true

    })
}

sheryAnimation()
cursorAnimation()
locomotiveAnimation()

document.addEventListener("mousemove", (dets) => {
    gsap.to("#flag", {
        x: dets.x,
        y: dets.y,
    })
})


document.querySelector("#hero").addEventListener("mouseenter", (dets) => {
    gsap.to("#flag", {
        opacity: 1,

    })
})

document.querySelector("#hero").addEventListener("mouseleave", (dets) => {
    gsap.to("#flag", {
        opacity: 0
    })
})
