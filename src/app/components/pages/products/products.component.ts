import { Component, OnInit } from '@angular/core';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  faCartPlus=faCartPlus

  products:any;
  constructor(private _httpClient:HttpClient) { 

  }

  ngOnInit(): void {
    this.loadProducts()
  }


  loadProducts(){
    this._httpClient.get("assets/data/products.json").subscribe((r:any) => {
      console.log(r)
      console.log(typeof r)
      this.products=r;
    })
  }


  addToCart(pid:any,pname:any,price:any){
    
    let cart = localStorage.getItem("cart");
    if(cart == null)
    {
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
      let pcart = JSON.parse(cart);
      let oldProduct = pcart.find((item:any)=>item.productId == pid)
      if(oldProduct)
      {
          oldProduct.productQuantity = oldProduct.productQuantity + 1
          pcart.map((item:any) => {
              if(item.productId == oldProduct.productId)
              {
                  item.productQuantity = oldProduct.productQuantity;
              }
          })
          
      localStorage.setItem("cart", JSON.stringify(pcart));
      }
      else{
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

    
    this.updateCart()
  }

  updateCart(){
    let cartString = localStorage.getItem("cart")
    let cart = JSON.parse(cartString)
    let l = cart.length
       
       let totalPrice = 0;
       cart.map((item:any) => {
           totalPrice += item.productPrice*item.productQuantity;
       })
}


}
