
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
             else if(string.startsWith('//s3')) url=`https:${string}`;
                    else url=string;
        return `
        <li class="list-product-item">
            <input type="checkbox" name="" class="seclect-product-input" id="">
            <div class="item-cart-body">
                <div class="item-cart-img" style="background-image: url(${url});"></div>
                <div class="item-cart-name">${item.NameProduct}</div>
                <div class="item-cart-price">${item.PriceProduct}$</div>
            </div> 
         </li>

        `
    })
    document.querySelector('.List-product').innerHTML=html.join(''); 
    GetToltal(ArrrProduct);
}
var arr=[];
var sum=0;
function GetCost(item){
    let string;
    if(!item.PriceProduct.startsWith('null')){
        
        if(item.PriceProduct.indexOf('$')!=-1 ){
            console.log(item.PriceProduct.indexOf('$'))
            string=item.PriceProduct.substring(0,item.PriceProduct.indexOf('$'));
    
        }else string=item.PriceProduct
        let res=string-0;
        return res;
    }
    
    

}

function GetToltal(Products){
    const CheckBoxInput=document.querySelectorAll('.seclect-product-input');
    CheckBoxInput.forEach(function(item,idx){
        item.onchange=function(){
            // console.log(item.checked)    
            let total=GetCost(Products[idx]);
            if(item.checked){
                sum+=total
                arr.push(idx);
            }else {
                sum-=total;
                arr=arr.filter(function(item1,index){
                    return item1!=idx
                })

            }
            console.log(arr,idx)
        document.querySelector('.payment-total').innerHTML=`${sum.toFixed(3)}$`;
        document.querySelector('.payment-quantity').innerHTML=arr.length;
            

            
        }

    })
    document.querySelector('.btn-Buy-Prodcut').onclick=function(){
        let flag=false;
        for(let i=0;i<CheckBoxInput.length;i++){
            if(CheckBoxInput[i].checked==true) {
                flag=true;
                break;
            }
        }
        if(flag){
            alert("Mua Hàng Thành Công");
            window.location.href='./index.html'
        } else alert("Vui Lòng Chọn Í Nhất 1 Sản Phẩm")
    }

}