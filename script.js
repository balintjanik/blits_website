let canvas, ctx;
let phone = false;



window.onload = function(){

    // FOOTER ITEMS COPY TO CLIPBOARD
    contactitems = document.querySelectorAll('.footer-item');
    for (let i = 0; i < contactitems.length; i++){
        contactitems[i].addEventListener("click", (e) => {
            //navigator.clipboard.writeText(contactitems[i].childNodes[3].innerHTML)
            navigator.clipboard.writeText(contactitems[i].childNodes[3].innerHTML).then(function() {
                var notification = document.getElementById('notification');

                // Reset animation by removing and reinserting the element
                var parent = notification.parentNode;
                var nextSibling = notification.nextSibling;
                parent.removeChild(notification);
                parent.insertBefore(notification, nextSibling);

                notification.textContent = 'Vágólapra másolva';
                notification.style.display = 'block';
                notification.style.opacity = 0.9;
                notification.style.top = (e.clientY-35) + "px";
                notification.style.left = e.clientX + "px";
              }).catch(function(err) {
                console.error('Unable to copy text to clipboard', err);
              });
        })
    }

    // STICKY NAVBAR
    if(this.scrollY > 20){
        document.getElementById('navbar').classList.add("sticky");
    } else {
        document.getElementById('navbar').classList.remove("sticky");
    }

    // REVEAL ON SCROLL
    var reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++){
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 50;

        if (revealtop < windowheight - revealpoint){
            reveals[i].classList.add('active');
        } else{
            reveals[i].classList.remove('active');
        }
    }


    // WAIT TILL THE END OF RESIZE TO UPDATE ANIMATION
    var rtime;
    var timeout = false;
    var delta = 50
    function resizeend() {
        if (new Date() - rtime < delta) {
            setTimeout(resizeend, delta);
        } else {
            timeout = false;
            if (!phone){
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                init();
            }
        }               
    }

    // DYNAMIC CSS
    var isTouchScreen = 'ontouchstart' in window || navigator.msMaxTouchPoints;
    var dyncss = document.getElementById('dynamic')
    if(isTouchScreen === true) {
        //alert("You are using a touch screen")
        dyncss.setAttribute("href", "touch.css")
        phone = true;
        // reorganize odd teachers
        const psliders = document.querySelectorAll(".slider-container")
        const pslidercontents = document.querySelectorAll(".slider-content")
        for (let i = 1; i < pslidercontents.length; i+=2){
            for (var j = 1; j < pslidercontents[i].childNodes.length; j++){
                pslidercontents[i].insertBefore(pslidercontents[i].childNodes[j], pslidercontents[i].firstChild);
            }
        }
    }else {
        //alert("You are not using a touch screen")
        dyncss.setAttribute("href", "pc.css")
        phone = false
    }
    // MENU BTN EVENT LISTENER
    menubtns = document.querySelectorAll('.menu-btn')
    menubtns.forEach(e => {
        e.addEventListener("click", (function(){
            document.querySelector('.navbar .menu').classList.toggle("active");
            document.getElementById('menu-btn').classList.toggle("active");
        }));
    });
    

    // SCROLL EVENT LISTENER
    addEventListener("scroll", (event) => {
        // STICKY NAVBAR
        if(this.scrollY > 20){
            document.getElementById('navbar').classList.add("sticky");
        } else {
            document.getElementById('navbar').classList.remove("sticky");
        }


        // REVEAL ON SCROLL
        var reveals = document.querySelectorAll('.reveal');

        for (var i = 0; i < reveals.length; i++){
            var windowheight = window.innerHeight;
            var revealtop = reveals[i].getBoundingClientRect().top;
            var revealpoint = 50;

            if (revealtop < windowheight - revealpoint){
                reveals[i].classList.add('active');
            } else{
                reveals[i].classList.remove('active');
            }
        }
    });
    
    // SLIDER ANIMATION
    let w = 1300;
    sliders = document.getElementsByClassName("slider-container")
    let isLefts = []
    for (let i = 0; i < sliders.length; i++) { if (!phone) {isLefts[i] = false;} else {isLefts[i] = true;}}
    slidercontents = document.getElementsByClassName("slider-content")
    lefts = document.getElementsByClassName("tname")
    rights = document.getElementsByClassName("tmore")
    readmores = document.getElementsByClassName("readmore")
    if (!phone){
        for (let i = 0; i < sliders.length; i++){
            w = sliders[i].getBoundingClientRect().width
            slidercontents[i].style.width = w*2 + "px"
            lefts[i].style.width = (w - 250) + "px"
            rights[i].style.width = (w - 250) + "px"

            if (i % 2 == 0){
                const sliderContent = slidercontents[i];
                sliderContent.style.transform = "translateX(0px)";
                isLefts[i] = true
            } else {
                const sliderContent = slidercontents[i];
                sliderContent.style.transform = "translateX(" + (-(w-250)) + "px)";
                isLefts[i] = true
            }

        }
    }

    // RESIZE EVENT
    addEventListener("resize", (event)=>{
        /*canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();*/

        rtime = new Date();
        if (timeout === false) {
            timeout = true;
            setTimeout(resizeend, delta);
        }

        // sliders
        if (!phone){
            for (let i = 0; i < sliders.length; i++){
                w = sliders[i].getBoundingClientRect().width
                slidercontents[i].style.width = w*2 + "px"
                lefts[i].style.width = (w - 250) + "px"
                rights[i].style.width = (w - 250) + "px"
    
                if (i % 2 == 0){
                    const sliderContent = slidercontents[i];
                    sliderContent.style.transform = "translateX(0px)";
                    isLefts[i] = true
                } else {
                    const sliderContent = slidercontents[i];
                    sliderContent.style.transform = "translateX(" + (-(w-250)) + "px)";
                    isLefts[i] = true
                }
                
            }
        } else {
            for (let i = 0; i < sliders.length; i++){
                const tmore = rights[i];
                tmore.style.transform = "translateY(0px)";
                isLefts[i] = true;
                readmores[i].style.transform = "translateY(0px)";
                readmores[i].style.opacity = 1;
            }
        }
        
        // PHONE SLIDER HEIGHT
        if (phone){
            if (window.innerWidth <= 800 && window.innerWidth > 400){
                for (let i = 0; i < sliders.length; i++){
                    sliders[i].style.height = (sliders[i].getBoundingClientRect().right-sliders[i].getBoundingClientRect().left + lefts[i].getBoundingClientRect().top - lefts[i].getBoundingClientRect().bottom) + "px"
                }
            } else if (window.innerWidth > 800){
                for (let i = 0; i < sliders.length; i++){
                    sliders[i].style.height = "38vw";  
                }
            } else {
                for (let i = 0; i < sliders.length; i++){
                    sliders[i].style.height = "80vw";  
                }
            }
        }
    });


    // SLIDER ANIMATION REST
    if (!phone){
        for (let i = 0; i < sliders.length; i++){
            w = sliders[i].getBoundingClientRect().width
            slidercontents[i].style.width = w*2 + "px"
            lefts[i].style.width = (w - 250) + "px"
            rights[i].style.width = (w - 250) + "px"
    
            sliders[i].addEventListener("click", function() {
                if (i % 2 == 0){
                    if (isLefts[i]){
                        const sliderContent = slidercontents[i];
                        sliderContent.style.transform = "translateX(" + (-(w-250)) + "px)";
                        isLefts[i] = false;
                    } else {
                        const sliderContent = slidercontents[i];
                        sliderContent.style.transform = "translateX(0px)";
                        isLefts[i] = true;
                    }
                } else {
                    if (isLefts[i]){
                        const sliderContent = slidercontents[i];
                        sliderContent.style.transform = "translateX(0px)";
                        isLefts[i] = false;
                    } else {
                        const sliderContent = slidercontents[i];
                        sliderContent.style.transform = "translateX(" + (-(w-250)) + "px)";
                        isLefts[i] = true;
                    }
                }
                
            });
        }
    } else {
        for (let i = 0; i < sliders.length; i++){
            w = sliders[i].getBoundingClientRect().height
    
            sliders[i].addEventListener("click", function() {
                if (isLefts[i]){
                    const tmore = rights[i];
                    const owntop = tmore.getBoundingClientRect().top;
                    const bot = lefts[i].getBoundingClientRect().bottom;
                    tmore.style.transform = "translateY(" + (-(owntop-bot)) + "px)";
                    isLefts[i] = false;
                    readmores[i].style.transform = "translateY(100px)";
                    readmores[i].style.opacity = 0;
                } else {
                    const tmore = rights[i];
                    tmore.style.transform = "translateY(0px)";
                    isLefts[i] = true;
                    readmores[i].style.transform = "translateY(0px)";
                    readmores[i].style.opacity = 1;
                }
                
            });
        }
    }


    // HOME CANVAS ANIMATION
    canvas = document.getElementById('home-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const MAX_SPEED = 2;
    const MIN_SIZE = 40;
    const MAX_SIZE = 80;
    let NUM = 30;

    // create particle
    class Particle{
        constructor(x,y,directionX,directionY, size,color){
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
        //method to draw individual particle
        draw(){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        // check particle position, check mouse position, move the particle, draw the particle
        update(){
            // check if particle is still within canvas
            if (this.x > canvas.width || this.x < 0){
                this.directionX = -this.directionX;
            }
            if(this.y > canvas.height || this.y < 0){
                this.directionY = -this.directionY;
            }
            // move particle
            this.x += this.directionX/6;
            this.y += this.directionY/6;
            // draw particle
            this.draw();
        }
    }

    // initialize particles
    function init(){
        particlesArray = [];
        let numberOfParticles;
        NUM = (innerWidth*innerHeight)/30000
        numberOfParticles = NUM; // Math.pow(canvas.height * canvas.width, 1/4)*10;
        for(let i = 0; i < numberOfParticles; i++){
            let size = Math.floor(Math.random()*(MAX_SIZE-MIN_SIZE))+MIN_SIZE;
            let x = (Math.random() * ((innerWidth - size) - (size)) + size);
            let y = (Math.random() * ((innerHeight - size) - (size)) + size);
            let directionX = (Math.random() * MAX_SPEED) - (MAX_SPEED/2);
            let directionY = (Math.random() * MAX_SPEED) - (MAX_SPEED/2);

            let color = ''
            rnd = Math.floor(Math.random()*3);
            switch(rnd){
                case 0:
                    //color = 'rgba(168, 213, 237, 0.7)';
                    color = 'rgba( 146,  178, 238, 0.3)'
                    break;
                case 1:
                    //color = 'rgba(221, 240, 247, 0.7)';
                    color = 'rgba( 156,  198, 255, 0.3)'
                    break;
                case 2:
                    //color = 'rgba(240, 247, 253, 0.9)';
                    color = 'rgba( 176,  218, 255, 0.3)'
                    break;
            }

            particlesArray.push(new Particle(x, y, directionX/2, directionY/2, size, color));
        }
    }
    function animate(){
        requestAnimationFrame(animate);
        ctx.clearRect(0,0,innerWidth, innerHeight);

        for(let i = 0; i < particlesArray.length; i++){
            particlesArray[i].update();
        }
    }

    init();
    animate();
}

function sendMail() {
    var name = encodeURIComponent(document.getElementById("name").value);
    var email = encodeURIComponent(document.getElementById("email").value);
    var message = encodeURIComponent(document.getElementById("message").value);

    var mailtoLink = "mailto:example@gmail.com?subject=Subject&body=Name: " + name + "%0AEmail: " + email + "%0AMessage: " + message;

    window.location.href = mailtoLink;
}