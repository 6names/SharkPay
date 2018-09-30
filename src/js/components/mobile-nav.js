import {forLoop} from "./helpers";

export const navTrigger = () => {
    const mobileNavClose = document.querySelector('.header__mobile-close'),
        mobileButton = document.querySelector('.header__mobile-button'),
        mobileNav = document.querySelector('.header__mobile'),
        mobileDropdown = document.querySelectorAll('.header__mobile-dropdown'),
        allMobileElements = [mobileNavClose, mobileButton, mobileNav];
    
    const navClose = () => {
        allMobileElements.forEach((element) => {
            element.classList.remove('active');
        });
        forLoop(mobileDropdown.length, (i) => {
            mobileDropdown[i].classList.remove('active');
        })
    };
    
    const navOpen = () => {
        allMobileElements.forEach((element) => {
            element.classList.add('active');
        })
    };
    
    if (mobileNav) {
        mobileNavClose.addEventListener('click', () => {
            navClose();
        });
        
        mobileButton.addEventListener('click', () => {
            if (mobileButton.classList.contains('active')) {
                navClose();
            } else {
                navOpen();
            }
        });
    }
};

export const mobileSubNav = () => {
    const mobileDropdownTriggers = document.querySelectorAll('.header__mobile-sublink_trigger');
    const mobileDropdowns = document.querySelectorAll('.header__mobile-dropdown');
    
    const hideDropdown = (exit) => {
        exit.addEventListener('click', () => {
            exit.parentElement.classList.remove('active');
        });
    };
    
    const showDropdown = () => {
        forLoop(mobileDropdownTriggers.length, (i) => {
            const trigger = mobileDropdownTriggers[i];
            const target = trigger.dataset.target;
            
            trigger.addEventListener('click', () => {
                forLoop(mobileDropdowns.length, (j) => {
                    const dropdown = mobileDropdowns[j];
                    const name = dropdown.dataset.name;
                    
                    if (target === name) {
                        dropdown.classList.add('active');
                        const mobileDropdownsTitle = document.querySelector('.header__mobile-dropdown-title');
                        hideDropdown(mobileDropdownsTitle);
                    } else {
                        dropdown.classList.remove('active');
                    }
                });
            });
        });
    };
    
    return showDropdown();
};