'use strict'

var nav = document.querySelector("nav");
// var dropdownMenu = document.querySelector("#dropdown-menu");
// var dropdownItem = document.querySelector('#dropdown-item');
// var dropdownItem2 = document.querySelector('#dropdown-item2');
// var dropdownItem3 = document.querySelector('#dropdown-item3');
// var dropdownItem4 = document.querySelector('#dropdown-item4');

window.addEventListener('scroll', function(){
    if(window.pageYOffset > 100){
        nav.classList.add('bg-secondary', 'shadow');
        // dropdownMenu.classList.add('bg-secondary');
        // dropdownItem.classList.add('text-white');
        // dropdownItem2.classList.add('text-white');
        // dropdownItem3.classList.add('text-white');
        // dropdownItem4.classList.add('text-white');
    } else {
        nav.classList.remove('bg-secondary', 'shadow');
        // dropdownMenu.classList.remove('bg-secondary');
        // dropdownItem.classList.remove('text-white');
        // dropdownItem2.classList.remove('text-white');
        // dropdownItem3.classList.remove('text-white');
        // dropdownItem4.classList.remove('text-white');
    }
    console.log("me ejectuo")
});
