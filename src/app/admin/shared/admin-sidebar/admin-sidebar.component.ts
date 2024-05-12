import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss'],
  providers: [MessageService]
})
export class AdminSidebarComponent {

  activeIndexVal: any = sessionStorage.getItem('admin-sidebar-activeIndex') ? Number(sessionStorage.getItem('admin-sidebar-activeIndex')) : 100;
  activeTab: any = sessionStorage.getItem('adminActiveTab') ? sessionStorage.getItem('adminActiveTab') : 'dashboard';


  constructor(private router: Router, public global: GlobalService, private messageService: MessageService,) { }

  navigateTo(val: any) {
    this.activeTab = val;
    sessionStorage.setItem('adminActiveTab', val)

    if (val == 'product/category' || val == 'product/sub-category' || val == 'product') {
      this.activeIndexVal = 0;
    } else if (val == 'user' || val == 'user/contact-us') {
      this.activeIndexVal = 1;
    } else if (val == 'admin-home/fresh-deals' || val == 'admin-home/our-recommends' || val == 'admin-home/banner') {
      this.activeIndexVal = 2;
    } else if (val == 'seller') {
      this.activeIndexVal = 3;
    } else if (val == 'orders') {
      this.activeIndexVal = 4;
    } else if (val == 'auth/change-password') {
      this.activeIndexVal = 5;
    } else {
      this.activeIndexVal = 100
    }
    sessionStorage.setItem('admin-sidebar-activeIndex', this.activeIndexVal)
    this.router.navigate(['/admin/' + val]);
  }

  logout() {
    localStorage.clear()
    this.messageService.clear()
    this.messageService.add({ severity: 'success', summary: "Logged Out Successfully!" });
    setTimeout(() => {
      this.router.navigate(['/admin/admin-login'])
    }, 500);
  }
}
