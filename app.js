const header = document.querySelector('header');
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
        const startScroll = sectiionHeight * orderIndex;

        if(scrollY >= startScroll){
            const moveFacx
        }
    });    
});