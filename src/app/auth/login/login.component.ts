import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {
  password: any = 'password';

  constructor(public fb: FormBuilder, public messageService: MessageService, private router: Router, public global: GlobalService) { }

  ngOnInit() {
    window.scroll(0, 0) 
  }

  loginForm = this.fb.group({
    useremail: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]],
    userPassword: ["", Validators.required]
  })

  userLogin() {
    let data = {
      email: this.loginForm.get('useremail')?.value,
      password: this.loginForm.get('userPassword')?.value,
    }
    localStorage.setItem('useremail', this.loginForm.get('useremail')?.value!)
    this.global.postAuthenticateData(this.global.basepath + '/user/login', data).subscribe((res: any) => {
      Swal.fire({ showConfirmButton: false, timer: 3000, title: res.message, icon: 'success', });
      this.loginForm.reset()
      localStorage.setItem('userName',res.data.name)
      localStorage.setItem('userId',res.data.id)
      this.global.userName = res.data.name;
      this.global.isLogin='true'
      sessionStorage.setItem('userLogin', 'true')
      localStorage.setItem("token", res.data.token);
      this.router.navigate(['/Home']) 
    },
      (err: any) => {
        console.log(err);
        console.log(err.error.message); 
        Swal.fire({ showConfirmButton: false, timer: 3000, title: err.error.message, icon: 'error', });
      })
  }
}
