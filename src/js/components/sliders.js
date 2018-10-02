import {tns} from "../../../node_modules/tiny-slider/src/tiny-slider";
import {forLoop} from "./helpers";

export const initSlider = (slidersEl, navContainerEl) => {
    const sliders = document.querySelectorAll(slidersEl);
    forLoop(sliders.length, (i) => {
        const slider = sliders[i];
        
        tns({
            container: slider,
            autoplay: false,
            controls: false,
            autoHeight: true
        });
        
        // move slider nav to the bottom of the slider container
        if (navContainerEl) {
            const sliderHolder = document.querySelectorAll(navContainerEl);
            setTimeout(() => {
                sliderHolder[i].insertAdjacentElement('beforeend', sliderHolder[i].querySelector('.tns-nav'));
            }, 1000);
        }
    });
};