import {forLoop} from "./helpers";

export const anchors = () => {
    const anchors = document.querySelectorAll('a.anchor');
    const headerHeight = document.querySelector('header.header').clientHeight;
    const scrollBlocks = document.querySelectorAll('.scroll-block');
    const pageNavHolder = document.querySelector('.page-nav__holder');
    let pageNavHolderHeight = 0;
    if (pageNavHolder) pageNavHolderHeight = pageNavHolder.clientHeight;
    
    if (anchors.length > 0) {
        forLoop(anchors.length, (i) => {
            const anchor = anchors[i];
            anchor.addEventListener('click', e => {
                const link = anchor.getAttribute('href');
                const destination = scrollBlocks.length > 0 ? document.querySelector(link).offsetTop + headerHeight + pageNavHolderHeight : document.querySelector(link).offsetTop - headerHeight;
                
                window.scroll({
                    behavior: 'smooth',
                    left: 0,
                    top: destination
                });
                
                e.preventDefault();
            });
        });
    }
};

export const currentScroll = () => {
    const anchors = document.querySelectorAll('a.anchor');
    const scrollBlocks = document.querySelectorAll('.scroll-block');
    
    if (scrollBlocks.length > 0) {
        forLoop(scrollBlocks.length, (i) => {
            const block = scrollBlocks[i];
            const id = block.getAttribute('id');
            
            if (window.scrollY >= block.offsetTop && window.scrollY <= (block.clientHeight + block.offsetTop)) {
                forLoop(anchors.length, (j) => {
                    const anchor = anchors[j];
                    const link = anchor.getAttribute('href');
                    if (link === `#${id}`) {
                        anchor.classList.add('current');
                    } else {
                        anchor.classList.remove('current');
                    }
                });
            }
        });
    }
};

export const fixedNav = () => {
    const pageNav = document.querySelector('.page-nav');
    const pageNavHolder = document.querySelector('.page-nav__holder');
    const headerHeight = document.querySelector('header.header').clientHeight;
    if (pageNav) {
        const rect = pageNav.getBoundingClientRect();
        
        if (rect.top - headerHeight - 15 <= 0) {
            pageNavHolder.classList.add('fixed');
            pageNav.style.paddingTop = `${pageNavHolder.clientHeight}px`;
            pageNavHolder.style.top = `${headerHeight}px`;
        } else {
            pageNavHolder.classList.remove('fixed');
            pageNav.removeAttribute('style');
            pageNavHolder.removeAttribute('style');
        }
    }
};