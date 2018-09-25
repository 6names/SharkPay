import {browserDetect} from "./components/browser-detect";
import {uiIcons} from "./components/icons";
import {checkStyle} from "./components/form-elements";
import {getModal, testModal} from "./components/modals";
import {validate} from "./components/validation";
import {mobileSubNav, navTrigger} from "./components/mobile-nav";
import {accordion, hideDropdownOnDocumentClick, tabs} from "./components/accordions";
import {animateClass, firstParallax, parallax} from "./components/parallax";
import {forLoop} from "./components/helpers";

const windowScroll = () => {
    // Launch animation on desktop only
    if (!document.querySelector('html').classList.contains('mobile')) {
        firstParallax('.hero__image', 0.1);
        firstParallax('.hero__inner', 0.2);
        
        animateClass('.tabs__list-item');
        animateClass('.payment-info__images-item');
        animateClass('.tabs__content');
        animateClass('.cards__item');
        animateClass('.cards .main-butn');
        animateClass('.platforms__inner');
        animateClass('.customers__inner');
        animateClass('.developer__list');
        animateClass('.developer__image');
        animateClass('.main-butn');
    }
};

// Check if content loaded
document.addEventListener('DOMContentLoaded', () => {
    // Detect browser and platform
    browserDetect();
    
    // Download UI icons
    uiIcons();
    
    // Mobile nav
    navTrigger();
    mobileSubNav();
    
    // Modals
    getModal(() => {
    
    });
    
    // Accordions
    accordion('.header__lang-trigger', '.header__lang-list');
    hideDropdownOnDocumentClick('.header__lang-trigger', '.header__lang-list');
    
    // Tabs
    tabs('.payment-info__tab', '.payment-info__content', (i) => {
        const images = document.querySelectorAll('.payment-info__images-item');
        forLoop(images.length, (j) => {
           images[j].classList.remove('active');
        });
        images[i].classList.add('active');
        animateClass('.payment-info__content');
        animateClass('.payment-info__images-item');
        animateClass('.main-butn');
    });
    
    /*testModal('blank-modal', () => {
    
    });*/
    
    checkStyle();
    
    // Window events
    window.addEventListener('resize', () => {
    
    });
    
    window.addEventListener('scroll', () => {
        windowScroll();
    });
});
