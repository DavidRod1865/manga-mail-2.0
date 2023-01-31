const button = document.querySelector('.submit')
const shippingFee = document.querySelector('.shipping')
const paypalFee = document.querySelector('.paypal')


class Books {
    constructor(weight, price) {
        // console.log('this', this)
        this.weight = weight;
        this.price = (price).toFixed(2);
    }
    calShipping = async () => {
        // console.log(`Wow, this package weighs ${this.weight}.`)
        await fetch(`https://media-mail-api.vercel.app/api/weight/${this.weight}`)
            .then(res => res.json())
            .then(data => shippingFee.innerText = Number(data))
            .catch(err => alert(`Weight must be less than 70 Lbs.`))
    };

    calPayPal = () => {
        console.log(`Wow, this package costs ${this.price}.`)
        if (this.price > 0){
            paypalFee.innerText = ((this.price * .0349) + 0.49).toFixed(2)
        }   
        else paypalFee.innerText = `0.00`
    }

}

function getValues() {
    let weight = +document.querySelector(".weight").value;
    let price = +document.querySelector(".price").value;
    const packaged_Books = new Books(weight, price);
    packaged_Books.calShipping();
    packaged_Books.calPayPal();
}

function appear() {
    if ($('div').hide()) $('div').show();
    else return false;

}function fade() {
    if ($('.fade').css('opacity') == 0) $('.fade').css('opacity', 1);
    else return false;
}

button.addEventListener('click', () => {
    getValues(),
    appear(),
    fade()
})
