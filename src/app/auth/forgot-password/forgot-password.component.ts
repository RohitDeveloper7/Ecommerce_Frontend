import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  steps: any = 0;
  password: any = 'password';
  cnfpassword: any = 'password';
  timer: number = 120;
  interval: any;
  loginOtpDigit1: any = "";
  loginOtpDigit2: any = "";
  loginOtpDigit3: any = "";
  loginOtpDigit4: any = "";

  constructor(public fb: FormBuilder, public global: GlobalService, private router: Router) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  sendOtpForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]],
  })

  verifyOtpForm = this.fb.group({
    otp: ['', [Validators.required]],
  })

  changePasswordForm = this.fb.group({
    password: ["", Validators.required],
    confirm_password: ["", Validators.required]
  })

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {

      }
    }, 1000); // Update every second
  }

  formatTime(time: number): string {
    const minutes: number = Math.floor(time / 60);
    const seconds: number = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }


  focus(e: any, p: any, c: any, n: any) {
    let length = c.value.length;
    let maxLength = c.getAttribute('maxlength');
    if (maxLength == length) {
      if (!(n == '')) {
        n.focus();
      } else {
        // All OTP digits are filled, so concatenate them and update otp_number
        this.verifyOtpForm.controls['otp'].setValue(this.loginOtpDigit1 + this.loginOtpDigit2 + this.loginOtpDigit3 + this.loginOtpDigit4);
      }
    }
    if (e.key == 'Backspace') {
      if (!(p == '')) {
        p.focus();
      }
    }
  }

  sendOtp() {
    let data = {
      username: this.sendOtpForm.get('username')?.value
    }
    this.global.post(this.global.basepath + '/user/auth/request-otp', data).subscribe((res: any) => {
      Swal.fire({ showConfirmButton: false, timer: 3000, title: res.message, icon: 'success', });
      this.steps = 1;
      this.startTimer();
      // this.sendOtpForm.reset();
      // this.router.navigate(['/auth/login'])
    },
      (err: any) => {
        console.log(err);
        Swal.fire({ showConfirmButton: false, timer: 3000, title: err.error.message, icon: 'error', });
      })
  }

  verifyOtp() {
    let data = {
      username: this.sendOtpForm.get('username')?.value,
      otp: this.verifyOtpForm.get('otp')?.value
    }
    this.global.post(this.global.basepath + '/user/auth/verify-otp', data).subscribe((res: any) => {
      Swal.fire({ showConfirmButton: false, timer: 3000, title: res.message, icon: 'success', });
      this.steps = 2
      // this.sendOtpForm.reset();
      // this.router.navigate(['/auth/login'])
    },
      (err: any) => {
        console.log(err);
        Swal.fire({ showConfirmButton: false, timer: 3000, title: err.error.message, icon: 'error', });
      })
  }

  changePassword() {
    let data = {
      username: this.sendOtpForm.get('username')?.value,
      password: this.changePasswordForm.get('password')?.value,
      confirm_password: this.changePasswordForm.get('confirm_password')?.value,
    }
    this.global.post(this.global.basepath + '/user/auth/update-password', data).subscribe((res: any) => {
      Swal.fire({ showConfirmButton: false, timer: 3000, title: res.message, icon: 'success', });
      this.steps = 2
      this.sendOtpForm.reset();
      this.verifyOtpForm.reset();
      this.changePasswordForm.reset();
      this.router.navigate(['/auth/login'])
    },
      (err: any) => {
        console.log(err);
        Swal.fire({ showConfirmButton: false, timer: 3000, title: err.error.message, icon: 'error', });
      })
  }



}
