import { Component, OnInit } from '@angular/core';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faCartPlus=faCartPlus
  src = "https://www.chetu.com/img/chetu-logo-white.png"

  data:any
  constructor() {
    
  }

  ngOnInit(): void {
    let cartString = localStorage.getItem("cart")
    let data = JSON.parse(cartString)
    let l = data.length
    console.log(l)
  }

  
}
