// Parallax
export const parallax = (target, parent, speed, rotate) => {
    const item = document.querySelector(target);
    const itemParent = document.querySelector(parent);
    const pos = window.pageYOffset + window.innerHeight;
    const itemParentPos = itemParent.getBoundingClientRect().top + window.pageYOffset;
    const itemParentHeight = itemParent.clientHeight;
    const newPos = (pos - itemParentPos) * speed;
    let newRotate = 0;
    
    if (rotate) {
        newRotate = (pos - itemParentPos) * rotate;
    }
    
    if (item) {
        if (pos > itemParentPos - window.innerHeight && pos <= (itemParentHeight + itemParentPos + window.innerHeight)) {
            item.style.transform = `translateY(${newPos}px) rotate(${newRotate}deg)`;
        } else {
            item.style.transform = `translateY(0px) rotate(0deg)`;
        }
    }
};

export const firstParallax = (target, speed) => {
    const item = document.querySelector(target);
    const newPos = window.pageYOffset * speed;
    
    if (item) {
        item.style.transform = `translateY(${newPos}px)`;
    }
};

// Animate class
export const animateClass = (target) => {
    const items = document.querySelectorAll(target);
    
    if (items) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const itemPos = item.getBoundingClientRect().top + window.pageYOffset;
            const pos = window.pageYOffset - (item.clientHeight / 2);
            
            if (pos > itemPos - window.innerHeight) {
                item.classList.add('animate');
            } else {
                item.classList.remove('animate');
            }
        }
    }
};