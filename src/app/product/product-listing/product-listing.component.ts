import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {
  rangeValues: number[] = [20, 80];
  products: any = []

  constructor(public global: GlobalService, private router: Router) { }


  ngOnInit() {
    window.scroll(0, 0)
    this.getProductlist()
  }


  getProductlist() {
    // console.log("url is ", this.url);
    // console.log("parmasUrl is ", this.paramsUrl);
    // let url = this.paramsUrl ? this.paramsUrl : this.url;
    
    this.global.getAuthenticateData(this.global.basepath + '/admin/getProduct').subscribe((res: any) => {
      console.log("resresres", res.data);
      this.products = res.data
      // this.url = '/admin/getProduct';
      // this.paramsUrl = undefined
    })
  }

  goToDetails(val: any) {
    sessionStorage.setItem('product-detail',JSON.stringify(val))
    this.router.navigate(['/product/product-details'])
    console.log('details=>>>>>>>', val);
    console.log('--->>>>>id:', val.id);
  }
}
