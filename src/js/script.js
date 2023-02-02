const button = document.querySelector('.submit')
const shippingFee = document.querySelector('.shipping')
const paypalFee = document.querySelector('.paypal')
const excludingFees = document.querySelector('.excludingFees')
const includingFees = document.querySelector('.includingFees')


class Books {
    constructor(weight, price) {
        // console.log('this', this)
        this.weight = Number(weight);
        this.price = Number((price).toFixed(2));

        //Calculates "USPS Shipping Rate" using Custom Media Mail API
        this.calShipping = async () => {
            await fetch(`https://media-mail-api.vercel.app/api/weight/${weight}`)
                .then(res => res.json())
                .then(data => { 
                    shippingFee.innerText = Number(data)
                    return data
                })
                .catch(err => alert(`Weight must be less than 70 Lbs.`))
            
        };
        
        /*Calculates "Paypal Commission Fee" using calculation found at:
        https://www.paypal.com/us/webapps/mpp/merchant-fees*/
        this.calPayPal =  async () => {
            if (Number(price) > 0){
                let fee = Number(((price * .0349) + 0.49).toFixed(2))
                paypalFee.innerText = fee
                return fee
            }   
            else if (Number(price) <= 0) {
                paypalFee.innerText = "0.00"
                return 0
            }
        }
    }

    calProfit = async () => {
    let shipping = await this.calShipping();
    let paypal = await this.calPayPal();
    console.log(Number(shipping), typeof shipping)
        excludingFees.innerText = Number(this.price - (shipping + paypal));
        includingFees.innerText = Number(this.price + (paypal))
    };

};

async function getValues() {
    let weight = +document.querySelector(".weight").value;
    let price = +document.querySelector(".price").value;
    const packaged_Books = new Books(weight, price);
    await packaged_Books.calShipping();
    await packaged_Books.calPayPal();
    await packaged_Books.calProfit();
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
