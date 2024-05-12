import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  password: any = 'password';

  ngOnInit() {
    window.scroll(0, 0) 
  }
}
