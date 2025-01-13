

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    account_section.classList.remove('active');


}

let shoppingCart = document.querySelector('.shopping-cart');

document.querySelector('#cart-btn').onclick = () =>{
    shoppingCart.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    account_section.classList.remove('active');


}


let loginForm = document.querySelector('.login-form');

let account_section = document.querySelector('.account-section');

document.querySelector('#login-btn').onclick = () =>{
    loginForm.classList.toggle('active');
    account_section.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-bar').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    account_section.classList.remove('active');
    

    
}


window.onscroll = () => {
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');

}


// Abhinab's changes

let productlist = []
// js-image-add
// product-carousel
fetch('/product/guwahati').then(response=>response.json()).then(response=>{
    productlist = response.categories;
    const container = document.getElementById('product-carousel');
    response.categories.forEach(e=>{
        const div = document.createElement('div');
        div.classList.add('box', 'swiper-slide');

        const img = document.createElement('img');
        const imageLink = '/media/pictures' + e.src.slice(1);
        img.src = imageLink

        h3 = document.createElement('h3');
        h3.innerText = e.name;

        a = document.createElement('a');
        a.classList.add('btn');
        a.innerText = "Shop Now";


        p = document.createElement('p');
        p.innerText = `Upto ${Math.floor(Math.random()*(30-10+1)+10)} % off`

        div.appendChild(img);
        div.appendChild(h3);
        div.appendChild(p);
        div.appendChild(a);
        container.appendChild(div);
    })
    addCarouselProduct()

}).catch(err=>{
    if(err){
        console.log(err);
    }
})

let totalPrice = 0;

//  for carousel products
function addCarouselProduct(){
    const container = document.getElementById('js-image-add');
    productlist.forEach(e=>{
        const div = document.createElement('div');
        div.classList.add('swiper-slide', 'box');

        const img = document.createElement('img');
        const imageLink = '/media/pictures' + e.src.slice(1);
        img.src = imageLink

        h3 = document.createElement('h3');
        h3.innerText = e.name;

        a = document.createElement('a');
        let price = Math.floor(Math.random()*(30-10+1)+10)
        a.addEventListener('click', ()=>{
            addToCart(e.name, price);
        })
        a.classList.add('btn');
        a.innerText = "Add to cart";


        p = document.createElement('p');
        p.innerText = price + ' $'

        var starDiv = document.createElement('div');
        starDiv.classList.add('stars');

        starDiv.innerHTML = `                        
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>`

        div.appendChild(img);
        div.appendChild(h3);
        div.appendChild(p);
        div.appendChild(starDiv);
        div.appendChild(a);
        container.appendChild(div);
    })

}
// static picture for customer reviews

document.querySelector('#profile-carousel .swiper-slide:nth-child(2) img').src = '/media/people/person2.png'
document.querySelector('#profile-carousel .swiper-slide:nth-child(1) img').src = '/media/people/person1.png'
document.querySelector('#profile-carousel .swiper-slide:nth-child(3) img').src = '/media/people/person3.jpg'
document.querySelector('#profile-carousel .swiper-slide:nth-child(4) img').src = '/media/people/person4.jpg'
document.querySelector('#profile-carousel .swiper-slide:nth-child(5) img').src = '/media/people/person5.png'


// login

  

const formElement = document.getElementById('login-form');

formElement.addEventListener('submit', (event) => {
event.preventDefault(); 
const formData = new FormData(formElement);
const formObject = {};

formData.forEach((value, key) => {
  formObject[key] = value;
});

fetch('/login', {method: 'POST', headers:{'content-type': 'application/json'}, body: JSON.stringify(formObject)})
.then(response=> response.json()).then(data=>{
    console.log(data);

})
.catch(err=>{
    console.log(err);
})});

// Signup


const signup = document.querySelector('.signup')
    

const signupbtn = document.getElementById('create-account').addEventListener('click', ()=>{
    loginForm.classList.toggle('active');
    signup.toggleAttribute('data-signup-visible');

})

const cancel_button = document.querySelector('.cancel-button').addEventListener('click', ()=>{
    signup.toggleAttribute('data-signup-visible')
})



document.querySelector('.signup-button').addEventListener('click', ()=>{
    const form = document.querySelector('.signup');
    const formData = new FormData(form);
    const formObject = {};

    formData.forEach((value, key) => {
        formObject[key] = value;
      });

    fetch('/signup', {method: 'POST', headers:{'content-type': 'application/json'}, body: JSON.stringify(formObject)})
      .then(response=> response.json()).then(data=>{
            console.log(data);
            loginForm.style.display = 'none';
            signup.toggleAttribute('data-signup-visible')

            account_section.toggleAttribute('data-active');
            account_section.style.display = 'block';

            account_section.children[1].innerText = data.name;
            console.log(document.cookie)


      })
    
});

function checkCookie(cookieName) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        let [name, value] = cookie.trim().split('=');
        if (name === cookieName) {
            return true;  
        }
    }
    return false;  
}

if(checkCookie('username')){
    loginForm.style.display = 'none';

    account_section.style.display = 'block';

    let username = ''
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        let [name, value] = cookie.trim().split('=');
        if (name === 'username') {
            username = value; 
        }
    }

    account_section.children[1].innerText = username;
}

// Logout 


const logout_btn = document.querySelector("#logout-btn").onclick = ()=>{
    fetch('/logout', {method:'POST'}).then(response=>{
        location.reload();
    }).catch(err=>{
        if(err){
            console.log(err);
        }
    })
}

// Appendinng to cart


function addToCart(name, price){
    fetch('/addProduct', {method:'POST',   headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify({product: name})}).then(resposnse=>resposnse.json()).then(data=>{console.log(data)}).catch(err=>{
        if(err){
            console.log(err);
        }
    })
    const container = document.querySelector('.shopping-cart');

    productlist.forEach(e=>{
        if(e.name == name){
    const box = document.createElement('div');
    box.className = 'box';

    const trashIcon = document.createElement('i');
    trashIcon.className = 'fas fa-trash';
    box.appendChild(trashIcon);

    const img = document.createElement('img');
    img.src = '/media/pictures' + e.src.slice(1);
    img.alt = name;
    box.appendChild(img);

    const content = document.createElement('div');
    content.className = 'content';

    const h3 = document.createElement('h3');
    h3.textContent = name;
    content.appendChild(h3);

    const priceSpan = document.createElement('span');
    priceSpan.className = 'price';
    priceSpan.textContent = `$${price}/`;
    content.appendChild(priceSpan);

    const quantitySpan = document.createElement('span');
    quantitySpan.className = 'quantity';
    quantitySpan.textContent = 1;
    content.appendChild(quantitySpan);

    box.appendChild(content);

    container.appendChild(box);
    
    totalPrice += price
    document.querySelector('.total').innerText = ` total : $${totalPrice}/-`

        }
    })



  
}
