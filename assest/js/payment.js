
if(localStorage.getItem('KeyCart')){
    let arr=JSON.parse(localStorage.getItem('KeyCart'));
    RenderList(arr);
}

function RenderList(ArrrProduct){
    let html=ArrrProduct.map(function(item,idx){
        let url;
        let string=item.ImageURl;
            if(string.startsWith('url('))
              url=string.substring( string.indexOf('"')+1,string.lastIndexOf('"'))
             else url=string;
        return `
        <li class="list-product-item">
            <input type="checkbox" name="" class="seclect-product-input" id="">
            <div class="item-cart-body">
                <div class="item-cart-img" style="background-image: url(${url});"></div>
                <div class="item-cart-name">${item.NameProduct}</div>
                <div class="item-cart-price">${item.PriceProduct}</div>
            </div> 
         </li>

        `
    })
    document.querySelector('.List-product').innerHTML=html.join(''); 
}