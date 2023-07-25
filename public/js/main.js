/*=============== SHOW MENU ===============*/

const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/

const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')

    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
    const header = document.getElementById('header')
   
    this.scrollY >= 50 ? header.classList.add('bg-header')
                       : header.classList.remove('bg-header')
}
window.addEventListener('scroll', scrollHeader)


/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')

    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                        : scrollUp.classList.remove('show-scroll')
}

window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollY = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        } else{
            sectionsClass.classList.remove('active-link')
        }
    })
}

window.addEventListener('scroll', scrollActive)

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

if (selectedTheme){
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)

    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true, // Animations repeat
})

sr.reveal(`.home__img, .newsletter__container, .footer__logo, .footer__description, .footer__content, .footer__info`)
sr.reveal(`.home__data`, {origin: 'bottom'})
sr.reveal(`.jadwal__data, .recently__data`, {origin: 'left'})
sr.reveal(`.jadwal__sholat, .recently__img, .kegiatan__body`, {origin: 'right'})
sr.reveal(`.popular__card`, {interval: 100})

/*=============== OPEN MODAL / POPUP ===============*/
const license = document.querySelectorAll(".license");
const selengkapnya = document.querySelectorAll(".selengkapnya");
const closeBtn = document.querySelectorAll(".close");
const closeBtnPopup = document.querySelectorAll(".closeLicense");
const tabs = document.querySelectorAll('.tab__btn');
const active_tab = document.querySelector('.tab__btn:first-child');
const deactive_tab = document.querySelector('.tab__btn:last-child');
const all_content = document.querySelectorAll('.content__container');
const active_content = document.querySelector('.content__container:first-child');
const deactive_content = document.querySelector('.content__container:last-child');

function openModal(target) {
    document.getElementById(target).style.display = "flex";
    document.querySelector('body').classList.add('.overlay');
}

function closeModal(target) {
    document.getElementById(target).style.display = "none";
}


license.forEach(function(button) {
    button.addEventListener("click", function() {
        var target = button.getAttribute("data-target");
        openModal(target);
    });
});

selengkapnya.forEach(function(button) {
    button.addEventListener("click", function() {
        var target = button.getAttribute("data-target");

        for (let i = 0; i <= all_content.length/2; i = i + 2){
            all_content[i].classList.add('active');
            all_content[i+1].classList.remove('active');
        }

        for (let i = 0; i <= tabs.length/2; i = i + 2){
            tabs[i].classList.add('active');
            tabs[i+1].classList.remove('active');
        }
        
        openModal(target);
    });
});


closeBtn.forEach(function(button) {
    button.addEventListener("click", function() {
        var target = button.getAttribute("data-target");

        for (let i = 0; i <= tabs.length/2; i = i + 2){
            tabs[i].classList.add('active');
            tabs[i+1].classList.remove('active');
        }

        for (let i = 0; i <= all_content.length/2; i = i + 2){
            all_content[i].classList.add('active');
            all_content[i+1].classList.remove('active');
        }

        closeModal(target);
    });
});

closeBtnPopup.forEach(function(button) {
    button.addEventListener("click", function() {
        var target = button.getAttribute("data-target");
        closeModal(target);
    });
});


/*=============== Email Subscribe ===============*/
const scriptURL = 'https://script.google.com/macros/s/AKfycbxEYzEtQYGLjcM7kikIY93CyOlVhh6tnSwCAI5yETqitnSwadSZ-qCdi52k-sFtdUDc-w/exec'
const form = document.forms['submit-to-google-sheet']
const inputEmail = document.querySelector('input[name=Email]');

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            form.reset();
            inputEmail.placeholder = "Berhasil, terima kasih!"
            console.log('Success', response)
        })
        .catch(error => {
            form.reset();
            inputEmail.placeholder = "Anda sudah subscribe!"
        })
})

/*=============== Nav Tab ===============*/



tabs.forEach((tab, index) => {
    tab.addEventListener('click', (e) => {
        tabs.forEach(tab=>{tab.classList.remove('active')});
        tab.classList.add('active');

        // var line = document.querySelector('.line');
        // line.style.width = e.target.offsetWidth + "px";
        // line.style.left = e.target.offsetLeft + "px";

        all_content.forEach(content=>{content.classList.remove('active')})
        all_content[index].classList.add('active')
    })
})