import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [MessageService]
})
export class HeaderComponent implements OnInit {
  // users: any = []
  // user_id: any
  // userName: any

  constructor(private router: Router, private fb: FormBuilder, public global: GlobalService, public messageService: MessageService) { }

  searchForm = this.fb.group({
    search: [""],
  })
  @Input()  cartDataofParent : any = [];
  ngOnInit() {
    console.log("cartDataofParent",this.cartDataofParent);
    this.getCartData()
  }

  getCartData() {
    this.global.getAuthenticateData(this.global.basepath + '/admin/getCartData').subscribe((res: any) => {
      this.cartDataofParent = res.data;
      console.log("cardData",this.cartDataofParent.length)
      // this.TotalRecords = res.TotalRecords;
    })
  }

  navigate(val: any) {
    this.router.navigate([val])
  }

  // logout() {
  //   localStorage.clear()
  // }
 
  logout() {
    let data;
    this.global.postAuthenticateData(this.global.basepath + '/user/logout', data).subscribe((res: any) => {
      localStorage.clear()
      sessionStorage.clear()
      Swal.fire({ showConfirmButton: false, timer: 3000, title: res.message, icon: 'success', });
      sessionStorage.setItem('userLogin', 'false');
      this.global.isLogin = 'false'
      setTimeout(() => {
        this.router.navigate(['/auth/login'])
      }, 500);
    })
  }

}


