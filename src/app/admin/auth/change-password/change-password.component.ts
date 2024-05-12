import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  providers: [MessageService]
})
export class ChangePasswordComponent {

  password = 'password';
  newpassword = 'password';
  cnfpassword = 'password';

  constructor(private fb: FormBuilder, private router: Router, private messageService: MessageService, private global: GlobalService) { }

  ngOnInit() {
    this.patchvalue()
  }

  adminChangePassword = this.fb.group({
    email: [""],
    current_password: ["", [Validators.required]],
    new_password: ["", [Validators.required]],
    confirm_new_password: ["", Validators.required],
  })

  changePassword() {
    let data = {
      email: localStorage.getItem('admin_email'),  
      current_password: this.adminChangePassword.get('current_password')?.value,
      new_password: this.adminChangePassword.get('new_password')?.value,
      confirm_new_password: this.adminChangePassword.get('confirm_new_password')?.value,
    }
    this.global.postAuthenticateData(this.global.basepath + '/admin/auth/change-password',data).subscribe((res: any) => {
      this.messageService.clear()
      this.messageService.add({ severity: 'success', summary: res.message });
      this.adminChangePassword.reset()
    }, (err: any) => {
      this.messageService.clear()
      this.messageService.add({ severity: 'error', summary: err.error.message });
    })
  }

  patchvalue() {
    // this.adminChangePassword.controls['email'].setValue(localStorage.getItem('admin_email'))
  }
}
