import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subject,takeUntil} from 'rxjs';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-fresh-deals',
  templateUrl: './fresh-deals.component.html',
  styleUrls: ['./fresh-deals.component.scss'],
  providers: [MessageService]
})
export class FreshDealsComponent implements OnInit {

  categories: any = [];
  subcategories: any = [];
  freshDeal: any = [];
  products: any = [];
  fdealId: string = ''
  catId: string = ''
  private unsubscribe$: Subject<void> = new Subject<void>(); 

  constructor(private fb: FormBuilder, private global:GlobalService , private messageService:MessageService ) { }

  ngOnInit(): void {
    this.getCategory()
    this.getFreshDeal()
  }
 
  addSubCategoryForm = this.fb.group({
    category: ["", Validators.required],
    SubCategory: ["", Validators.required],
    product: ["", Validators.required]
  })

  updateSubCategoryForm = this.fb.group({
    category: ["", Validators.required],
    SubCategory: ["", Validators.required],
    product: ["", Validators.required]
  })

  getCategory() {
    this.global.getAuthenticateData(this.global.basepath + '/admin/getCategoriesList').pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
      this.categories = res.data;
      console.log(this.categories)
      // this.TotalRecords = res.TotalRecords;
    })
  }
  getFreshDeal() {
    this.global.getAuthenticateData(this.global.basepath + '/admin/getFreshDeal').pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
      this.freshDeal = res.data;
      console.log(this.freshDeal)
      // this.TotalRecords = res.TotalRecords;
    })
  }

  

  updateFreshDeal(){
    console.log("this.fdealId",this.fdealId);
    
    let data = {
      fdealId: this.fdealId,
      category_id: this.updateSubCategoryForm.controls['category'].value,
      subCategory_id: this.updateSubCategoryForm.controls['SubCategory'].value,
      product_id: this.updateSubCategoryForm.controls['product'].value,
      productName:this.products[0].productName,
      ProductPrice:this.products[0].ProductPrice,
      discountPrice:this.products[0].discountPrice,
      productQuantity:this.products[0].productQuantity,
      productDescription:this.products[0].productDescription,
      avaliability:this.products[0].avaliability,
      productImages:JSON.stringify(this.products[0].productImages),
    }
    console.log("data",data);
    
    this.global.post(this.global.basepath + '/admin/updateFreshDeal',data).pipe(takeUntil(this.unsubscribe$)).subscribe((res:any)=>{
      this.getFreshDeal()
      this.updateSubCategoryForm.reset()
      this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: res.message });
    },err=>{
      this.messageService.clear();
      this.messageService.add({ severity: 'error', summary: err.error.message });
    })
  }


  addFreshDeal(){
    let data = {
      admin_id: localStorage.getItem('id'),
      category_id: this.addSubCategoryForm.controls['category'].value,
      subCategory_id: this.addSubCategoryForm.controls['SubCategory'].value,
      product_id: this.addSubCategoryForm.controls['product'].value,
      productName:this.products[0].productName,
      ProductPrice:this.products[0].ProductPrice,
      discountPrice:this.products[0].discountPrice,
      productQuantity:this.products[0].productQuantity,
      productDescription:this.products[0].productDescription,
      avaliability:this.products[0].avaliability,
      productImages:JSON.stringify(this.products[0].productImages),
    }
    console.log("data",data);
    
    this.global.post(this.global.basepath + '/admin/addFreshDeal',data).pipe(takeUntil(this.unsubscribe$)).subscribe((res:any)=>{
      this.getFreshDeal()
      this.addSubCategoryForm.reset()
      this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: res.message });
    },err=>{
      this.messageService.clear();
      this.messageService.add({ severity: 'error', summary: err.error.message });
    })
  }

  deleteFreshDeal(){
    this.global.post(this.global.basepath + '/admin/deleteFreshDeal',{fdealId:this.fdealId}).pipe(takeUntil(this.unsubscribe$)).subscribe((res:any)=>{
      this.getFreshDeal()
      this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: res.message });
    },err=>{
      this.messageService.clear();
      this.messageService.add({ severity: 'error', summary: err.error.message });
    })
  }

  getCategryId(event: any) {
    console.log("event is", event.target.value)
    let data = event.target.value;
    this.catId = data;
    console.log("data is", data);
    if (data) {
      this.getSubCategory(data)
    }
  }

  getprodcutbysubId(event: any) {
    console.log("event is", event.target.value)
    let data = event.target.value;
    console.log("data is", data);
    // if (data) {
      this.getProductlist(data)
    // }
  }

  getProductlist(data:any) {
    console.log("url is ", data);
    let sendData = {
      category_id : this.catId,
      subCategory_id : data
    }
    let queryParams = new URLSearchParams(sendData)
    this.global.getAuthenticateData(this.global.basepath + `/admin/getProduct?${queryParams}`).pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
      this.products = res.data;
      console.log("resresres", this.products);
    })
  }

  getSubCategory(category_id: any) {
    console.log("category_id", category_id);

    this.global.getAuthenticateData(this.global.basepath + `/admin/getAllSubCategoriesList?category_id=${encodeURIComponent(category_id)}`).pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
      this.subcategories = res.data
    })
  }

  patchValue(data:any){
    console.log("data",data);
    // this.updateSubCategoryForm.patchValue(data)
    // this.updateSubCategoryForm.setValue(data)
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
