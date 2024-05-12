import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss'],
  providers: [MessageService]
})
export class SellerComponent {

  constructor(public global:GlobalService, public messageService:MessageService, private fb:FormBuilder){}
  sellers : any =[]
  seller_id : any
  ngOnInit(){
    this.getSellerlist()
  }

  UpdateSellerForm = this.fb.group({
    sellerName: ["", Validators.required],
    sellerEmail: ["", Validators.required],
    sellerNumber: ["", Validators.required]
  })

  // sellers: any[] = [
  //   {

  //     name: 'John',
  //     email: 'John@123',
  //     number: '0000000000'
  //   },
  //   {

  //     name: 'John',
  //     email: 'John@123',
  //     number: '0000000000'
  //   },
  //   {

  //     name: 'John',
  //     email: 'John@123',
  //     number: '0000000000'
  //   },
  //   {

  //     name: 'John',
  //     email: 'John@123',
  //     number: '0000000000'
  //   },
  //   {

  //     name: 'John',
  //     email: 'John@123',
  //     number: '0000000000'
  //   },
  //   {

  //     name: 'John',
  //     email: 'John@123',
  //     number: '0000000000'
  //   },
  //   {

  //     name: 'John',
  //     email: 'John@123',
  //     number: '0000000000'
  //   }
  // ]
  
  getSellerlist(){
    this.global.getAuthenticateData(this.global.basepath+'/admin/seller/get').subscribe((res:any)=>{
      this.sellers = res.data;
    })
  }

  UpdateSeller(){
    let data = {
      name : this.UpdateSellerForm.controls['sellerName'].value,
      email : this.UpdateSellerForm.controls['sellerEmail'].value,
      mobile : this.UpdateSellerForm.controls['sellerNumber'].value,
      id:this.seller_id
    }
    console.log("data is ",data);
    
    this.global.postAuthenticateData(this.global.basepath+'/admin/seller/update',data).subscribe((res:any)=>{
      this.getSellerlist() 
      this.messageService.clear();
      this.messageService.add({ severity: 'success', summary: res.message});
      // this.imageInputVariable.nativeElement.value = ''; // Reset the file input
      // this.categoryImg = null; // Reset the selected image
    },
    (err: any) => {
      console.log(err);
      this.messageService.clear();
      this.messageService.add({ severity: 'error', summary: err.error.message });
    })

  }

  deleteSeller(){
    this.global.postAuthenticateData(this.global.basepath + '/admin/seller/delete', {id:this.seller_id} ).subscribe(
      (res: any) => {
        this.getSellerlist()
        this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: res.message});
      },
      (err: any) => {
        console.log(err);
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: err.error.message });
      })

  }

  patchValue(data : any){
    console.log("hiiii");
    this.UpdateSellerForm?.controls['sellerName'].setValue(data.name)
    this.UpdateSellerForm?.controls['sellerNumber'].setValue(data.mobile)
    this.UpdateSellerForm?.controls['sellerEmail'].setValue(data.email)
    this.UpdateSellerForm?.patchValue(data)
    this.seller_id = Number(data.id)
    console.log("seller id is ", this.seller_id);
    
  }
}

