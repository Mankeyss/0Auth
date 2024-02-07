
const underline = document.getElementById('underline');

let mouseOver = function(e, id) {
    const item = document.getElementById(id);
    underline.style.width = getComputedStyle(item).width;
    underline.style.marginLeft = (item.offsetLeft) + "px";
}

let mouseEnter = function() {
    underline.style.opacity = 1;
}

let mouseLeave = function() {
    underline.style.opacity = 0;
}

document.getElementById('nav-bar-item-1').onmouseenter = mouseEnter;
document.getElementById('nav-bar-item-2').onmouseenter = mouseEnter;
document.getElementById('nav-bar-item-3').onmouseenter = mouseEnter;
document.getElementById('nav-bar-item-4').onmouseenter = mouseEnter;

document.getElementById('nav-bar-item-1').onmouseover = function(event){mouseOver(event, 'nav-bar-item-1')};
document.getElementById('nav-bar-item-2').onmouseover = function(event){mouseOver(event, 'nav-bar-item-2')};
document.getElementById('nav-bar-item-3').onmouseover = function(event){mouseOver(event, 'nav-bar-item-3')};
document.getElementById('nav-bar-item-4').onmouseover = function(event){mouseOver(event, 'nav-bar-item-4')};

document.getElementById('nav-bar-item-1').onmouseleave = mouseLeave;
document.getElementById('nav-bar-item-2').onmouseleave = mouseLeave;
document.getElementById('nav-bar-item-3').onmouseleave = mouseLeave;
document.getElementById('nav-bar-item-4').onmouseleave = mouseLeave;