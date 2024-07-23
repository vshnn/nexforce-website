const header = document.querySelector('.header');
const letters = document.querySelectorAll('.letter');
const logo = document.querySelector('.logo-img');
const websiteContent = document.querySelector('.website-content');
const nav = document.querySelector('.nav');

let lastScroll = 0;
const sectionHeight = 150;

// Prevent scroll restoration
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    const isScrollingUp = scroll < lastScroll;

    // Handle website content position
    if (scroll < 900) {
        websiteContent.style.position = 'fixed';
        websiteContent.style.top = '0px';
    } else {
        websiteContent.style.position = 'absolute';
        websiteContent.style.top = '900px';
    }

    // Handle letter animations
    const orderPairs = [
        [3, 4],
        [2, 5],
        [1, 6],
        [0, 7]
    ];

    orderPairs.forEach((pair, orderIndex) => {
        const startScroll = sectionHeight * orderIndex;

        if (scroll >= startScroll) {
            const moveFactor = Math.min(1, (scroll - startScroll) / sectionHeight);
            const translateY = -moveFactor * header.offsetHeight;

            pair.forEach((idx) => {
                const letter = letters[idx];
                gsap.to(letter, {
                    y: translateY,
                    zIndex: 1 - moveFactor,
                });
            });
        } else {
            pair.forEach((idx) => {
                const letter = letters[idx];
                gsap.to(letter, {
                    y: 0,
                    zIndex: 1,
                });
            });
        }
    });

    // Handle navbar visibility and z-index
    const buffer = 50;
    if (scroll >= orderPairs.length * sectionHeight + buffer && !gsap.isTweening(logo)) {
        gsap.to(logo, {
            top: "0px",
            ease: "power1.out",
            overwrite: "true"
        });

        gsap.to(".logo-revealer", {
            scaleY: 0,
            overwrite: true,
        });

        gsap.to(".sub-text", {
            opacity: 0,
            overwrite: true,
        });

        gsap.to(nav, {
            opacity: 1,
            visibility: 'visible',
            zIndex: 1000,
            overwrite: true,
        });
    } else if (scroll <= (orderPairs.length - 1) * sectionHeight && !gsap.isTweening(logo)) {
        gsap.to(logo, {
            top: "20px",
            ease: "power1.out",
            overwrite: true,
        });

        gsap.to(".logo-revealer", {
            scaleY: 1,
            overwrite: true,
        });

        gsap.to(".sub-text", {
            opacity: 1,
            overwrite: true,
        });

        gsap.to(nav, {
            opacity: isScrollingUp ? 0 : 1,
            visibility: isScrollingUp ? 'hidden' : 'visible',
            zIndex: isScrollingUp ? 0 : 1000,
            overwrite: true,
        });
    }

    lastScroll = scroll;
});
