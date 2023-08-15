
const product = {

    forse: {
        name: 'Forse',
        price: 449000,
        amount: 0,
        img: './img/product1.webp',
        get totalSumm() {
            return this.price * this.amount;
        },
    },

    max: {
        name: 'Max',
        price: 419000,
        amount: 0,
        img: './img/product2.webp',
        get totalSumm() {
            return this.price * this.amount;
        },
    },

    max90: {
        name: 'Max90',
        price: 399000,
        amount: 0,
        img: './img/product4.webp',
        get totalSumm() {
            return this.price * this.amount;
        },
    },

    run: {
        name: 'Run',
        price: 399000,
        amount: 0,
        img: './img/product3.webp',
        get totalSumm() {
            return this.price * this.amount;
        },
    },

};



const


    productBtns = document.querySelectorAll('.wrapper__bottom-btn'),
    basketBtn = document.querySelector('.wrapper__top-btn'),
    basketIndecator = document.querySelector('.wrapper__top-indecator'),
    basketModal = document.querySelector('.basket'),
    closeBasketModal = document.querySelector('.basket__top-btnClose'),
    basketCheklist = document.querySelector('.basket__checklist'),
    basketTotalPrice = document.querySelector('.basket__bottom-totalPrice'),
    basketPrint = document.querySelector('.basket__bottom'),
    printChecklist = document.querySelector('.print__body'),
    printTotalSumm = document.querySelector('.print__footer');





productBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        plusOrMinus(this);
    })
})


function plusOrMinus(knopka) {

    let parent = knopka.closest('.wrapper__bottom-block');

    let parentId = parent.getAttribute('id');

    product[parentId].amount++;

    basket();
}


function basket() {
    const productArray = [];
    let totalCount = 0;



    for (const key in product) {
        const po = product[key];

        const productCard = document.querySelector(`#${po.name.toLowerCase()}`);

        const productCardInd = productCard.querySelector('.wapper__bottom-count');

        if (po.amount) {
            productArray.push(po);
            basketIndecator.classList.add('active');
            totalCount += po.amount;

            productCardInd.classList.add('active');
            productCardInd.innerHTML = po.amount;
        } else {
            productCardInd.classList.remove('active');
            productCardInd.innerHTML = 0
        }
        basketIndecator.innerHTML = totalCount;
    }

    basketCheklist.innerHTML = ' ';

    for (let i = 0; i < productArray.length; i++) {

        basketCheklist.innerHTML += cardItemNike(productArray[i])
    }

    basketTotalPrice.innerHTML = totalSummProduct()

}


function cardItemNike(dataNike) {

    const { name, totalSumm: price, amount, img } = dataNike;

    return `
     <div class="basket__checklist-product">
    <div class="basket__checklist-info">

        <img src="${img}" alt="">

        <div class="basket__cheklist-sub">
            <p class="basket__cheklist-name">${name}</p>
            <p class="basket__cheklist-price"><span>${price}</span>сум</p>
        </div>

    </div>

    <div class="basket__checklist-counter" id="${name.toLowerCase()}__card">
        <button class="basket__checklist-symbol" data-symbol="-">-</button>
        <output class="basket__cheklist-output">${amount}</output>
        <button class="basket__checklist-symbol" data-symbol="+">+</button>
    </div>
</div>  
    
    `
}


window.addEventListener('click', function (event) {

    const btn = event.target;

    if (btn.classList.contains('basket__checklist-symbol')) {
        const attr = btn.getAttribute('data-symbol');
        const parent = btn.closest('.basket__checklist-counter')

        if (parent) {
            const idProduct = parent.getAttribute('id').split('__')[0];

            if (attr == '+') {
                product[idProduct].amount++
            } else if (attr == '-') {
                product[idProduct].amount--
            }
            basket()
        }
    }
})


function totalSummProduct() {
    let total = 0;

    for (const key in product) {
        total += product[key].totalSumm
    }

    return total.toLocaleString()
}



basketBtn.addEventListener('click', () => basketModal.classList.add('active'))
closeBasketModal.addEventListener('click', () => basketModal.classList.remove('active'))



basketPrint.addEventListener('click', function() {

    printChecklist.innerHTML = ''

    for(const  key  in  product ){
        const {name, totalSumm, amount} = product[key]


        if(amount) {
            printChecklist.innerHTML += `
            
            <div class="print__body-item">
            <p class="print__body-item_name">
                <span class="name">${name}</span>
                <span class="count">${amount}</span>
                <p class="print__body-item_summ">${totalSumm}</p>
            </p>
        </div>
            `
        }
    }


    printTotalSumm.innerHTML = totalSummProduct()
    window.print()
})







