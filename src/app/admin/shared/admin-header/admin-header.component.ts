import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
  providers: [MessageService]
})
export class AdminHeaderComponent {
  notifications: any = [];
 
  
  constructor(private router: Router, private messageService: MessageService, public global: GlobalService) { }

  ngOnInit() {
   }

  logout() {
    localStorage.clear()
    // this.messageService.clear()
    // this.messageService.add({ severity: 'success', summary: "Logged Out Successfully!" });
    Swal.fire({ showConfirmButton: false, timer: 3000, title: 'Log out Successfully!!!', icon: 'success', });
    setTimeout(() => {
      this.router.navigate(['/admin/auth/admin-login'])
    }, 500);
  }
 

  navigateTo(val: any) {
    this.router.navigate(['/admin/' + val]); 
    console.log(this.global.activeTab)
    this.global.activeTab = val;
    sessionStorage.setItem('adminActiveTab', val)
  }

  toggleMenu() {
    this.global.menu = !this.global.menu;
    console.log(this.global.menu);
  }
}

