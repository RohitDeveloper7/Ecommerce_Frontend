import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  providers: [MessageService]
})
export class ContactUsComponent {


  constructor(private fb: FormBuilder, public global: GlobalService, private messageService: MessageService) { }
  ngOnInit() {
    window.scroll(0, 0)
  }

  addContact = this.fb.group({
    name: ["", Validators.required],
    mobile: ["", Validators.required],
    email: ["",[Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]],
    message: ["", Validators.required]
  })



  addUsersContact() {
    let data = {
      name: this.addContact.controls['name'].value,
      mobile: this.addContact.controls['mobile'].value,
      email: this.addContact.controls['email'].value,
      message: this.addContact.controls['message'].value
    }

    this.global.postAuthenticateData(this.global.basepath + '/user/contact', data).subscribe(
      (res: any) => {
        this.addContact.reset();
        Swal.fire({ showConfirmButton: false, timer: 3000, title: res.message, icon: 'success', });
        this.addContact.reset()
      },
      (err: any) => {
        console.log(err);
        Swal.fire({ showConfirmButton: false, timer: 3000, title: err.error.message, icon: 'error', });
      }
    );
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

}
