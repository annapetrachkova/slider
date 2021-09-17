// let itemsRight = document.querySelectorAll('.item-right')
// let itemsLeft = document.querySelectorAll('.left-item')
// let currentItemRight = 0
// let currentItemLeft = 3
// let isEnabled = true
// let isEnabledLeft = true
//
//
// function changeCurrentItem(n) {
//     currentItemRight = (n + itemsRight.length) % itemsRight.length
// }
//
// function changeCurrentItemLeft(n) {
//     currentItemLeft = (n + itemsLeft.length) % itemsLeft.length
// }
//
// function hideItem(direction, directionLeft){
//     isEnabled = false;
//     isEnabledLeft = false;
//     itemsRight[currentItemRight].classList.add(direction)
//     itemsLeft[currentItemLeft].classList.add(directionLeft)
//     itemsRight[currentItemRight].addEventListener('animationend', function(){
//         this.classList.remove('active', direction);
//     });
//     itemsLeft[currentItemLeft].addEventListener('animationend', function () {
//         this.classList.remove('activeLeft', directionLeft);
//     });
// }
//
//
// function showItem(direction, directionLeft){
//     itemsRight[currentItemRight].classList.add('next', direction)
//     itemsLeft[currentItemLeft].classList.add('nextLeft', directionLeft)
//     itemsRight[currentItemRight].addEventListener('animationend', function(){
//         this.classList.remove('next', direction);
//         this.classList.add('active');
//         isEnabled = true;
//     });
//     itemsLeft[currentItemLeft].addEventListener('animationend', function(){
//         this.classList.remove('nextLeft', directionLeft);
//         this.classList.add('activeLeft');
//         isEnabledLeft = true;
//     });
//
// }
//
// function previousItem(n1, n2) {
//     hideItem('to-top', 'to-bottom')
//     changeCurrentItem(n1 - 1)
//     changeCurrentItemLeft(n2 - 1)
//     showItem('from-bottom', 'from-top')
// }
//
//
// function nextItem(n1, n2) {
//     hideItem('to-bottom', 'to-top')
//     changeCurrentItem(n1 + 1)
//     changeCurrentItemLeft(n2 + 1)
//     showItem('from-top', 'from-bottom')
// }
//
// document.querySelector('.down-button').addEventListener('click', function () {
//     if (isEnabled && isEnabledLeft) {
//         previousItem(currentItemRight, currentItemLeft)
//     }
// });
//
// document.querySelector('.up-button').addEventListener('click', function () {
//     if (isEnabled && isEnabledLeft) {
//         nextItem(currentItemRight, currentItemLeft)
//     }
// })


const sliderContainer = document.querySelector('.carousel')
const slideRight = document.querySelector('.slider-right')
const slideLeft = document.querySelector('.left-slide')
const upButton = document.querySelector('.up-button')
const downButton = document.querySelector('.down-button')
const itemsRight = slideRight.children
const itemsLeft = slideLeft.children

let activeSlideIndex = 0,
    firstRightSlide = itemsRight[0],
    lastRightSlide = itemsRight[itemsRight.length - 1],
    cloneRightFirst = firstRightSlide.cloneNode(true),
    cloneRightLast = lastRightSlide.cloneNode(true),

    firstLeftSlide = itemsLeft[0],
    lastLeftSlide = itemsLeft[itemsLeft.length - 1],
    cloneLeftFirst = firstLeftSlide.cloneNode(true),
    cloneLeftLast = lastLeftSlide.cloneNode(true);


slideRight.appendChild(cloneRightFirst);
slideRight.insertBefore(cloneRightLast, firstRightSlide);


slideLeft.appendChild(cloneLeftFirst);
slideLeft.insertBefore(cloneLeftLast, firstLeftSlide);


slideLeft.style.top = `-${(itemsRight.length - 2) * 100}vh`
slideRight.style.top = `-100vh`

let scrolling = false

upButton.addEventListener('click', () => changeSlide('up'))
downButton.addEventListener('click', () => changeSlide('down'))

const changeSlide = (direction) => {
    const sliderHeight = sliderContainer.clientHeight

    slideRight.classList.add('shifting')
    slideLeft.classList.add('shifting')

    scrolling = true

    if (direction === 'up') {
        activeSlideIndex++
        if (activeSlideIndex > itemsRight.length - 2) {
            activeSlideIndex = 0
        }
        slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`
        slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`

    } else if (direction === 'down') {
        activeSlideIndex--
        if (activeSlideIndex === -1) {
            slideRight.style.transform = `translateY(${sliderHeight}px)`
            slideLeft.style.transform = `translateY(-${sliderHeight}px)`
        } else if (activeSlideIndex >= 0) {
            slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`
            slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`
        }
    }
}



slideRight.addEventListener('transitionend', checkIndex);
slideLeft.addEventListener('transitionend', checkIndex);

function checkIndex() {
    const sliderHeight = sliderContainer.clientHeight
    slideRight.classList.remove('shifting');
    slideLeft.classList.remove('shifting');

    scrolling = false

    if (activeSlideIndex === -1) {
        activeSlideIndex = itemsRight.length - 3;
        slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`
        slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`
    }

    if (activeSlideIndex === itemsRight.length - 2) {
        activeSlideIndex = 0;
        slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`
        slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`
    }

}

const swipedetect = (el) => {
    let surface = el;
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;
    let startTime = 0;
    let elapsedTime = 0;

    let threshold = 150;
    let restraint = 100;
    let allowedTime = 600;

    surface.addEventListener('mousedown', function(e) {
        startX = e.pageX;
        startY = e.pageY;
        startTime = new Date().getTime();
        e.preventDefault();
    });

    surface.addEventListener('mouseup', function(e) {
        distX = e.pageX - startX;
        distY = e.pageY - startY;
        elapsedTime = new Date().getTime() - startTime;
        if (elapsedTime <= allowedTime) {
            if (Math.abs(distY) >= threshold && Math.abs(distX) <=restraint) {
                if (distY > 0) {
                    changeSlide('down')
                } else {
                    changeSlide('up')
                }
            }
        }
        e.preventDefault();
    })
}

let el = document.querySelector('.carousel')
swipedetect(el);

document.querySelector('.carousel').onwheel = function(el) {
    if (scrolling) return;
    if (el.deltaY > 0) {
        changeSlide('down')
    } else {
        changeSlide('up')
    }
}
