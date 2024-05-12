import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [
    MessageService
  ]
})
export class CartComponent {

  products: any = []
  constructor(public global: GlobalService,private messageService: MessageService){}
  ngOnInit() {
    window.scroll(0, 0) 
    this.getCartData()
  }

  getCartData() {
    this.global.getAuthenticateData(this.global.basepath + '/admin/getCartData').subscribe((res: any) => {
      this.products = res.data;
      console.log("cardData",this.products)
      // this.TotalRecords = res.TotalRecords;
    })
  }

  removeFromCart(id:any){
    this.global.postAuthenticateData(this.global.basepath + '/admin/removeFromCart',{product_id:id}).subscribe((res: any) => {
      this.messageService.clear();
      this.messageService.add({ severity: 'success', summary: res.message });
      this.getCartData()
    },
    (err: any) => {
      console.log(err);
      this.messageService.clear();
      this.messageService.add({ severity: 'error', summary: err.error.error });
    })
  }
}
