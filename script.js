const btn = document.getElementById('toggle')
const linkContainer = document.querySelector('.link-container');
const links = document.querySelectorAll('.scroll-links');
const linkUL = document.querySelector('.links');

btn.addEventListener('click', ()=> {
    const linkHeight = linkUL.getBoundingClientRect().height;
    console.log(linkHeight)
    const containerHeight = linkContainer.getBoundingClientRect().height;
    console.log(containerHeight)
    if(containerHeight === 0) {
        linkContainer.style.height = `${linkHeight}px`
    } else {
        linkContainer.style.height = `0px`
    }
})