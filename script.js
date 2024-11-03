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
        const navHeight = nav.getBoundingClientRect().height;
        const containerHeight = linkContainer.getBoundingClientRect().height;
        const fixedNav = nav.classList.contains('fixed-navbar');
        let position = linkLocation.offsetTop - navHeight;
        if(fixedNav) {
            position = position - navHeight;
        };
        if(navHeight > 60) {
            position = position + containerHeight + containerHeight;
        }
        console.log(navHeight)
        window.scrollTo({
            left: 0,
            top : position
        })
        linkContainer.style.height = '0px'
    });
});

// ==== DROPDOWN SECTION ====
const dropdownContainer = document.querySelectorAll('.dropdown');
const submitSection = document.querySelector('.submit-section');
const formText = document.querySelectorAll('.selected');
dropdownContainer.forEach((btn) => {
    const button = btn.querySelector('.select');
    const menu = btn.querySelector('.menu')
    const caret = btn.querySelector('.caret')
    button.addEventListener('click', ()=> {
        dropdownContainer.forEach((el)=> {
            const newMenu = el.querySelector('.menu');
            const newCaret = el.querySelector('.caret');
            if(newMenu !== menu) {
                newCaret.classList.remove('rotate');
                newMenu.classList.remove('show-menu');
            }
        })
        caret.classList.toggle('rotate');
        menu.classList.toggle('show-menu');
    });
});

// ==== CREATE LIST FUNCTION ====
const alert = document.querySelector('.alert');
const form =  document.querySelector('.list-form');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.list-container');
const list = document.querySelector('.country-list');
const clearBtn = document.querySelector('.clear-btn');
const inputUser = document.getElementById('input');

// edit option
let editElement;
let editFlag = false;
let editID = '';

// Event handling
form.addEventListener('submit', addItems);
clearBtn.addEventListener('click', clearItems);
// window.addEventListener('DOMContentLoaded', setupItems)

// FUNCTION
function addItems(e) {
    e.preventDefault();
    const valueInput = inputUser.value;
    const ID = new Date().getTime().toString();

    if(valueInput && !editFlag) {
        createItemList(ID, valueInput);
        displayAlert('succes', 'succes');
        container.classList.add('show-list');
        setToDefault();
    } else if(valueInput && editFlag ) {
        editElement.innerHTML = valueInput;
        displayAlert('Content edited', 'succes')
        setToDefault();
    } else {
        displayAlert('Please input some value', 'danger')
    };
};

function deleteItem(e) {
    const item = e.currentTarget.parentElement.parentElement;
    const id = item.dataset.id;
    list.removeChild(item);
    if(list.children.length > 0) {
        displayAlert('Item has been deleted', 'succes')
    } else {
        displayAlert('Item is empty', 'danger')
        container.classList.remove('show-list')
    };
    setToDefault();
}; 
function editItem(e) {
    const item = e.currentTarget.parentElement.parentElement
    editElement = e.currentTarget.parentElement.previousElementSibling;
    // change the value
    inputUser.value = editElement.innerHTML;
    editFlag = true
    editID = item.dataset.id;
    // btn change
    submitBtn.textContent = 'Edit';
}

// displayAlert
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    setTimeout(() => {
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 1000);
};
// setToDefault
function setToDefault() {
    submitBtn.textContent = 'Submit';
    inputUser.value = ''
    editFlag = false;
    editID = '';
};
function clearItems() {
    const items = document.querySelectorAll('.list-item');
    if(items.length > 0) {
        items.forEach((item)=> {
            list.removeChild(item)
        });
    };
    container.classList.remove('show-list');
    displayAlert('item was deleted', 'succes')
    setToDefault();
};

// Create Items
function createItemList(ID, value) {
    // create items
    const element = document.createElement('div');
    // add class
    element.classList.add('list-item');
    // add ID
    const attr = document.createAttribute('data-id');
    attr.value = ID
    element.setAttributeNode(attr);
    element.innerHTML = `
    <p class="title">${value}</p>
    <div class="list-btn-container">
        <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
        </button>
        <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
        </button>
    </div>
    `

     // delete and edit btn
    const deleteBtn = element.querySelector('.delete-btn');
    const editBtn = element.querySelector('.edit-btn');
    deleteBtn.addEventListener('click', deleteItem)
    editBtn.addEventListener('click', editItem)
          
    // append child
    list.appendChild(element);
};