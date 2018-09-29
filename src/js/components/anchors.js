// Anchors
const anchors = document.querySelectorAll('a.anchor'),
    scrollBlocks = document.querySelectorAll('.scroll-block');

if (anchors) {
    for (let i = 0; i < anchors.length; i++) {
        anchors[i].addEventListener('click', e => {
            const link = anchors[i].getAttribute('href');
            let destination = document.querySelector(link).getBoundingClientRect().top + window.pageYOffset + 30;
            
            window.scrollTo({
                behavior: 'smooth',
                left: 0,
                top: destination
            });
            
            e.preventDefault();
        });
    }
}

function currentScroll() {
    for (let i = 0; i < scrollBlocks.length; i++) {
        let block = scrollBlocks[i];
        const id = block.getAttribute('id');
        
        for (let j = 0; j < anchors.length; j++) {
            let anchor = anchors[j];
            const link = anchor.getAttribute('href');
            let distance = 0;
            
            if (block.classList.contains('footer')) {
                distance = block.offsetTop - 500;
            } else {
                distance = block.offsetTop;
            }
            
            if (window.pageYOffset >= distance && window.pageYOffset <= (block.clientHeight + block.offsetTop)) {
                if (link === `#${id}`) {
                    anchor.classList.add('current');
                } else {
                    anchor.classList.remove('current');
                }
            } else {
                if (link === `#${id}`) {
                    anchor.classList.remove('current');
                }
            }
        }
    }
}