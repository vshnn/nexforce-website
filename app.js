const header = document.querySelector('.header');
const letters = document.querySelectorAll('.letter');
const logo = document.querySelector('.logo a');
const websiteContent = document.querySelector('.website-content');


let lastscroll = 0;
const sectionHeight = 150;

window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    if (scroll < 900){
        websiteContent.style.position = 'fixed';
        websiteContent.style.top = '0px';
    } else{
        websiteContent.style.position = 'absolute';
        websiteContent.style.top = '900px';
    }

    const orderPairs = [
        [3,4],
        [2,5],
        [1,6],
        [0,7]
    ]

    orderPairs.forEach((pair, orderIndex) => {
        const startScroll = sectionHeight * orderIndex;

        if(scrollY >= startScroll){
            const moveFactor = Math.min(1, (scroll - startScroll) / sectionHeight);
            const translateY = -moveFactor * header.offsetHeight;

            pair.forEach((idx)=>{
                const letter = letters[idx];
                console.log(letter);
                gsap.to(letter, {
                    y: translateY,
                    zIndex: 1-moveFactor,
                });
            });
        }else{
            pair.forEach((idx)=>{
                const letter = letters[idx];
                gsap.to(letter, {
                    y: 0,
                    zIndex: 1,
                });
            });
        }
    });
    
    const buffer = 50;
    if(scrollY >= orderPairs.length * sectionHeight + buffer && 
        !gsap.isTweening(logo)){
            gsap.to(logo, {
                top:"0px",
                ease:"power1.out",
                overwrite:"true"
                
            });

            gsap.to(".logo-revealer",{
                scaleY: 0,
                overwrite: true,
            });
        } else if(
            scrollY <= (orderPairs.length -1) * sectionHeight &&
            !gsap.isTweening(logo)
        )   {
            gsap.to(logo, {
                top: "20px",
                ease: "power1.out",
                overwrite: true,
            });

            gsap.to(".logo-revealer", {
                scaleY: 1,
                overwrite: true,
            });
        } 
        lastscroll = scrollY;

});