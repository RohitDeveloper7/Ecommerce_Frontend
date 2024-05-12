import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
  providers: [MessageService],
})

export class AdminLoginComponent {

  password = 'password';
  constructor(private fb: FormBuilder, private router: Router, private messageService: MessageService, private global: GlobalService) { }

  adminlogin = this.fb.group({
    email: ["", [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required]],
    password: ["", Validators.required],
  })

  adminLogin() {
    console.log(this.adminlogin.value);
    this.global.post(this.global.basepath + '/admin/login', this.adminlogin.value).subscribe((res: any) => {
      // this.messageService.clear()
      // this.messageService.add({ severity: 'success', summary: res.message });
      Swal.fire({ showConfirmButton: false, timer: 3000, title: res.message, icon: 'success', });
      setTimeout(() => {
        localStorage.clear()
        localStorage.setItem('isAdminLogin', 'true');
        localStorage.setItem('type', 'admin');
        localStorage.setItem('id', res.admin_id);
        localStorage.setItem('admin_email', res.email);
        localStorage.setItem("token", res.token);
        this.router.navigate(['/admin/dashboard']);
      }, 500);
    }, (err: any) => {
      // this.messageService.clear()
      // this.messageService.add({ severity: 'error', summary: err.error.message });
      Swal.fire({ showConfirmButton: false, timer: 3000, title: err.error.message, icon: 'error', });
    })
  }
}
