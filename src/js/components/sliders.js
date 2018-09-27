import {tns} from "../../../node_modules/tiny-slider/src/tiny-slider";
import {forLoop} from "./helpers";

export const initSlider = (slidersEl, navContainerEl, tabsEl) => {
    const sliders = document.querySelectorAll(slidersEl);
    forLoop(sliders.length, (i) => {
        const slider = sliders[i];
        
        const sliderInit = tns({
            container: slider,
            autoplay: false,
            controls: false,
            autoHeight: true
        });
        
        // move slider nave to the bottom of the slider container
        if (navContainerEl) {
            const sliderHolder = document.querySelectorAll(navContainerEl);
            setTimeout(() => {
                sliderHolder[i].insertAdjacentElement('beforeend', sliderHolder[i].querySelector('.tns-nav'));
            }, 1000);
        }
        
        // slider tabs
        if (tabsEl) {
            const tabs = document.querySelectorAll(tabsEl)[i].children;
            sliderInit.events.on('transitionEnd', () => {
                const dots = sliderInit.getInfo().navItems;
                let current = 0;
                forLoop(dots.length, (j) => {
                    if (dots[j].classList.contains('tns-nav-active')) current = j;
                });
                forLoop(tabs.length, (j) => {
                    tabs[j].classList.remove('active');
                });
                tabs[current].classList.add('active');
            });
        }
    });
};