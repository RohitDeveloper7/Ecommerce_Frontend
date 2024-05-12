import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'] 
})
export class RegisterComponent {
  steps: number = 0;
  password: any = 'password';
  cnfpassword: any = 'password';
  timer: number = 120;
  interval: any;

  verifyOtpDigit1: any = "";
  verifyOtpDigit2: any = "";
  verifyOtpDigit3: any = "";
  verifyOtpDigit4: any = "";

  verification: boolean = true;

  constructor(public fb: FormBuilder,  private router: Router, public global: GlobalService) { }
  ngOnInit() {
    window.scroll(0, 0)
  }

  SignUpForm = this.fb.group({
    userName: ["", Validators.required],
    useremail: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]],
    userNumber: ["", Validators.required],
    userPassword: ["", Validators.required],
    userConfirmPassword: ["", Validators.required]
  })

  emailVerification = this.fb.group({
    email: [""],
    otp: ["", Validators.required],
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


  userRegistration() {
    let data = {
      name: this.SignUpForm.get('userName')?.value,
      email: this.SignUpForm.get('useremail')?.value,
      mobile: this.SignUpForm.get('userNumber')?.value,
      password: this.SignUpForm.get('userPassword')?.value,
      confirm_password: this.SignUpForm.get('userPassword')?.value,
    }

    this.global.postAuthenticateData(this.global.basepath + '/user/register', data).subscribe((res: any) => {
      Swal.fire({ showConfirmButton: false, timer: 3000, title: res.message, icon: 'success', });
      this.verification = false;
      localStorage.setItem('userEmail', res.data.email)
      this.SignUpForm.reset();
      this.startTimer();
    },
      (err: any) => {
        console.log(err);
        Swal.fire({ showConfirmButton: false, timer: 3000, title: err.error.message, icon: 'error', });
      })
  }

  verifyEmail() {
    let data = {
      email: localStorage.getItem('userEmail'),
      otp: this.emailVerification.get('otp')?.value,
    }

    this.global.postAuthenticateData(this.global.basepath + '/user/auth/verify-email', data).subscribe((res: any) => {
      Swal.fire({ showConfirmButton: false, timer: 3000, title: res.message, icon: 'success', });
      this.verification = true;
      this.SignUpForm.reset();
      this.router.navigate(['/auth/login'])
    },
      (err: any) => {
        console.log(err);
        Swal.fire({ showConfirmButton: false, timer: 3000, title: err.error.message, icon: 'error', });
      })
  }


  onMobileNoInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;

    // Use a regular expression to keep only numeric characters
    const sanitizedValue = inputValue.replace(/[^0-9]/g, '');

    if (inputValue !== sanitizedValue) {
      // If the input value was modified, update the input value
      input.value = sanitizedValue;
    }
  }


  focus(e: any, p: any, c: any, n: any) {
    let length = c.value.length;
    let maxLength = c.getAttribute('maxlength');
    if (maxLength == length) {
      if (!(n == '')) {
        n.focus();
      } else {
        // All OTP digits are filled, so concatenate them and update otp_number
        this.emailVerification.controls['otp'].setValue(this.verifyOtpDigit1 + this.verifyOtpDigit2 + this.verifyOtpDigit3 + this.verifyOtpDigit4);
      }
    }
    if (e.key == 'Backspace') {
      if (!(p == '')) {
        p.focus();
      }
    }
  }
}
