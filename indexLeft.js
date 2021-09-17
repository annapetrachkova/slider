let itemsLeft = document.querySelectorAll('.left-item')
let currentItem = 0
let isEnabledLeft = true


function changeCurrentItem(n) {
    currentItem = (n + itemsRight.length) % itemsRight.length
}

function hideItem(directionLeft){
    isEnabledLeft = false;
    itemsLeft[currentItem].classList.add(directionLeft)
    itemsLeft[currentItem].addEventListener('animationend', function () {
        console.log('hello')
        this.classList.remove('activeLeft', directionLeft)
    })
}


function showItem(directionLeft){
    itemsLeft[currentItem].classList.add('nextLeft', directionLeft)
    itemsLeft[currentItem].addEventListener('animationend', function(){
        this.classList.remove('nextLeft', directionLeft);
        this.classList.add('activeLeft')
        isEnabledLeft = true;
    })

}

function previousItem(n) {
    hideItem('to-bottom')
    changeCurrentItem(n - 1)
    showItem('from-top')
}


function nextItem(n) {
    hideItem('to-top')
    changeCurrentItem(n + 1)
    showItem('from-bottom')
}

document.querySelector('.down-button').addEventListener('click', function () {
    if (isEnabled) {
        previousItem(currentItem)
    }
});

document.querySelector('.up-button').addEventListener('click', function () {
    if (isEnabled) {
        nextItem(currentItem)
    }
});