import { Component,OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  providers:[MessageService]
})
export class ContactUsComponent implements OnInit{
  usersContact : any
  contact_id : any

  
  
  constructor(private fb: FormBuilder,public global:GlobalService, private messageService:MessageService) { }
  
  ngOnInit(){
    this.getUsersContact();
  }
  
  addContact = this.fb.group({
    name: ["", Validators.required],
    mobile: ["", Validators.required],
    email: ["", Validators.required],
    message: ["", Validators.required]
  })

  updateContact = this.fb.group({
    name: ["", Validators.required],
    mobile: ["", Validators.required],
    email: ["", Validators.required],
    message: ["", Validators.required]
  })


  getUsersContact() {
    this.global.getAuthenticateData(this.global.basepath + '/admin/getContact').subscribe((res: any) => {
      this.usersContact = res.data;
      console.log("users", this.usersContact)
    })
  }


  addUsersContact() { 
  let data = {
    name : this.addContact.controls['name'].value,
    mobile : this.addContact.controls['mobile'].value,
    email : this.addContact.controls['email'].value,
    message : this.addContact.controls['message'].value
  }    
    
    this.global.postAuthenticateData(this.global.basepath + '/admin/contact/create', data).subscribe(
      (res: any) => {
        this.addContact.reset();
        this.getUsersContact()
        this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: res.message});
      },
      (err: any) => {
        console.log(err);
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: err.error.message });
      }
    );
  }
   
}
