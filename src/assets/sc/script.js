var data = []
function loadpets(){
    var http=new XMLHttpRequest()
    http.open("GET","data/products.json")
    http.send()
    http.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200)
        {
        var result= JSON.parse(this.response)
        data = result.products
        }
        BindItem(data)
    }
}
loadpets()
function BindItem(arr){
    var temp=``
    arr.forEach((e)=>{
        temp +=`<div class="col-4">
        <div class="card">
        
        <div class="card-body">
            <h2 class="card-text" style="text-align:center">Title : ${e.title}</h2>
            <h4 class="card-title">Id : ${e.id}</h4>
            <p class="card-text"><strong>Price :</strong> ${e.price} Rs.</p>
            <div class="img"><img src="${e.image}" alt="No Image" width="150" height="200"></div>
            <p class="card-text"><strong>Description :</strong> ${e.discription}</p>
            
            <button class="btn btn-info" onclick="addToCart(${e.id},'${e.title}',${e.price})"><i class="fas fa-cart-plus"></i>  Add to Cart</button>
        </div>
    </div>
    </div>`   
    })

document.querySelector(".post").innerHTML=temp;
}

// function addToCart(crt)
function addToCart(pid,pname,price){

    // pid = crt.id
    pname = pname
    // price = crt.price
    console.log(pname)
    let cart = localStorage.getItem("cart");
    if(cart == null)
    {
        //no cart yet
        let products = [];
        let product = {"productId":pid,
                       "productName":pname,
                       "productQuantity":1,
                       "productPrice":price
                    }
        products.push(product);
        localStorage.setItem("cart", JSON.stringify(products));
        console.log("Product is added for the first time")
        console.log(products)
    }
    else{
        //cart is allready present
        // console.log("cart :"+ cart)
        let pcart = JSON.parse(cart);
        let oldProduct = pcart.find((item)=>item.productId == pid)
        // console.log("pcart :"+ pcart)
        if(oldProduct)
        {
            //we have to increase the quantity
            oldProduct.productQuantity = oldProduct.productQuantity + 1
            pcart.map((item) => {
                if(item.productId == oldProduct.productId)
                {
                    item.productQuantity = oldProduct.productQuantity;
                }
            })
            
        localStorage.setItem("cart", JSON.stringify(pcart));
        console.log("Product quantity is increase")
        }
        else{
            //we have add the product
            let product = {"productId":pid,
                "productName":pname,
                "productQuantity":1,
                "productPrice":price
             }
            pcart.push(product) 
            localStorage.setItem("cart", JSON.stringify(pcart));
            console.log("Product is added")
        }
    }
    updateCart();
 }

 function updateCart(){
     let cartString = localStorage.getItem("cart")
     let cart = JSON.parse(cartString)

     if(cart == null || cart.length == 0){
         console.log("cart is empty");
        //  document.getElementsByClassName(".cart-items").innerHTML = ("(0)")
         $(".cart-items").html("(0)");
         $(".cart-body").html("<h3>Cart dose not have items</h3>");
         $(".checkout-btn").addClass('disabled');
     }
     else{
         console.log(cart)
        // document.getElementsByClassName(".cart-items").innerHTML = `(${cart.length})`
        $(".cart-items").html(`(${cart.length})`)
        let table = `
            <table class="table">
                <thead class="thead-light">
                    <tr>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
        `;
        let totalPrice = 0;
        cart.map((item) => {
            table += `
            <tbody>    
                <tr>
                    <td>${item.productName}</td>
                    <td>${item.productPrice}</td>
                    <td>${item.productQuantity}</td>
                    <td>${item.productQuantity*item.productPrice}</td>
                    <td><button class="btn btn-danger">Remove</button></td>
                </tr>
            </tbody>`
            totalPrice += item.productPrice*item.productQuantity;
        })

            table = table +`
            <tr><td class="text-right font-weight-bold" colspan="5">Total Price : <i class="fas fa-rupee-sign ml-2"></i>${totalPrice}</tr></td>
            </table>`
            $(".cart-body").html(table)
     }
 }

//  $(document).ready(function() {
//      updateCart()
//  })