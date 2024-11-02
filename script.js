// ===== FIXED NAVBAR =====
const nav = document.getElementById('nav');
const links = document.querySelector('.links');
const linkContainer = document.querySelector('.link-container');
const scrollLinks = document.querySelectorAll('.scroll-links')
const ham = document.getElementById('toggle');
// HamClicker
ham.addEventListener('click', ()=> {
    const linksHeight = links.getBoundingClientRect().height;
    const containerHeight = linkContainer.getBoundingClientRect().height;
    if(containerHeight == 0) {
        linkContainer.style.height = `${linksHeight}px`
    } else {
        linkContainer.style.height = `0px`
    };
});
// Fixed navigation bar
document.addEventListener('scroll', ()=> {
    const windowHeight = window.pageYOffset;
    if(windowHeight > 200) {
        nav.classList.add('fixed-navbar');
    } else {
        nav.classList.remove('fixed-navbar');
    };
});
// Jump to page
scrollLinks.forEach((link)=> {
    link.addEventListener('click', (e)=> {
        e.preventDefault();
        const id = e.currentTarget.getAttribute('href').slice(1);
        const linkLocation = document.getElementById(id);
        console.log(linkLocation);
        const navHeight = nav.getBoundingClientRect().height;
        const containerHeight = linkContainer.getBoundingClientRect().height;
        const fixedNav = nav.classList.contains('fixed-navbar');
        let position = linkLocation.offsetTop - navHeight;
        if(fixedNav) {
            position = position - navHeight;
        };
        if(navHeight > 20) {
            position = position + containerHeight ;
        }
        
        window.scrollTo({
            left: 0,
            top : position
        })
        linkContainer.style.height = '0px'
    })
})