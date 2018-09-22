import {browserDetect} from "./components/browser-detect";
import {uiIcons} from "./components/icons";
import {checkStyle} from "./components/form-elements";
import {getModal, testModal} from "./components/modals";
import {validate} from "./components/validation";
import {mobileSubNav, navTrigger} from "./components/mobile-nav";
import {accordion, hideDropdownOnDocumentClick} from "./components/accordions";

// Window resize
window.addEventListener('resize', () => {

});

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
    /*testModal('blank-modal', () => {
    
    });*/
    
    checkStyle();
});
