import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss'],
  providers: [
    MessageService
  ]
})
export class SubCategoryComponent implements OnInit, OnDestroy {
  category_id: any
  paramsUrl: any
  url: any
  isExpanded: boolean = false
  private unsubscribe$: Subject<void> = new Subject<void>();
  product_categories: any = []
  imageExtensionsArray: any = ['apng', 'jpg', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp'];
  categoryImg: any = [];
  product_Subcategories: any = []
  filter_subcategoriesName: any = []
  selectedCategoryValue: any;
  selectedItemId: any;
  selectedCategoryName: any;
  Subcategory_id: any
  private queryParamsSubscription: Subscription | undefined;
  ngOnInit() {

    this.queryParamsSubscription = this.route.queryParams.subscribe((params: any) => {
      console.log("parmas is the ", params);
      if (params['category_id']) {
        this.category_id = params['category_id']
        this.paramsUrl = `/admin/getAllSubCategoriesList?category_id=${encodeURIComponent(this?.category_id)}`
        console.log("this.category_id", this.category_id);
      }
      else {
        this.url = '/admin/getAllSubCategoriesList'
      }
      this.getCategory()
      this.getSubCategory()


    })

  }


  constructor(private fb: FormBuilder, public global: GlobalService, public messageService: MessageService, private route: ActivatedRoute, private router: Router) { }

  addSubCategoryForm = this.fb.group({
    category: ["", Validators.required],
    SubCategory: ["", Validators.required],
    image: ["", Validators.required],
    description: ["", Validators.required],
  })

  updateSubCategoryForm = this.fb.group({
    category: ["", Validators.required],
    SubCategory: ["", Validators.required],
    image: ["", Validators.required],
    description: ["", Validators.required],
  })


  openFolder(data: any) {
    console.log("data", data);

    // localStorage.setItem("category",data.category_name)
    // this.router.navigate(['admin/product/sub-category'])
    this.router.navigate(['admin/product'], {
      queryParams: {
        subcategory: data.name,
        subcategory_id: data.id
      }
    })
  }

  navigateback(){
    // if(this?.category_id){
    //   console.log(">>>>>>> inisde the funciton");
    //   this.router.navigate(['admin/product/category'])
    // }
    this.router.navigate(['admin/product/category'])
  }

  navigateCopyClipboard(text: string) {
    const clipBoard = navigator.clipboard;
    clipBoard.writeText(text).then(() => {
      this.messageService.add({severity:'success', summary:"Copy text SuccessFully"})
    });
  }

  handleFileInput(event: any) {
    const file = event?.target?.files?.[0];
    if (file) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (this.imageExtensionsArray && this.imageExtensionsArray.includes(fileExtension)) {
        this.categoryImg = file;
        console.log("this.categoryImg", this.categoryImg);

        this.addSubCategoryForm.get('image')?.setErrors(null); // Set image control as valid
      } else {
        this.addSubCategoryForm.get('image')?.setErrors({ 'invalidImage': true }); // Set image control as invalid
      }
    }


  }

  isDataAvailable() {
    return (!this?.product_Subcategories?.description);
  }

  notMoreThan50Words(word: any): string {
    if (!word) return ''; // Handle null or undefined
    const words = word.split(' ');
    return words.slice(0, 20).join(' ');
  }

  getSubCategory() {
    console.log("url is ", this.url);
    console.log("parmasUrl is ", this.paramsUrl);

    let url = this.paramsUrl ? this.paramsUrl : this.url;
    this.global.getAuthenticateData(this.global.basepath + url).pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
      url = ""
      // this.product_Subcategories = res.data?.subcategories;
      this.product_Subcategories = res.data

      this.url = '/admin/getAllSubCategoriesList';
      this.paramsUrl = undefined
      console.log(this.product_Subcategories)
    })
  }
  // console.log(this.product_categories)
  // this.TotalRecords = res.TotalRecords;


  // getSubCategryId(event: any) {
  //   this.selectedCategoryValue = event.target.value;
  //   // console.log('Selected Category ID:', this.selectedItemId);
  //   const [categoryId, categoryName] = this.selectedCategoryValue.split(',');
  //   this.selectedItemId = categoryId
  //   this.selectedCategoryName = categoryName
  //   console.log('Selected Category ID:', categoryId);
  //   console.log('Selected Category Name:', categoryName);
  //   // You can perform further actions here based on the selected category ID
  // }

  getCategory() {
    this.global.getAuthenticateData(this.global.basepath + '/admin/getCategoriesList').pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
      this.product_categories = res.data;
      console.log(this.product_categories)
      // this.TotalRecords = res.TotalRecords;
    })
  }



  addServiceCategory() {
    console.log("add servce ", this.categoryImg);

    const formData = new FormData();

    if (this.categoryImg) {
      formData.append('file', this.categoryImg);
    }
    // formData.append('category', this.selectedCategoryName);
    formData.append('admin_id' ,localStorage.getItem('id')!);
    formData.append('subCategoryName', this.addSubCategoryForm.get('SubCategory')?.value!);
    formData.append('subDisc', this.addSubCategoryForm.get('description')?.value!);
    formData.append('category_id', this.addSubCategoryForm.get('category')?.value!);

    

    this.global.postAuthenticateData(this.global.basepath + '/admin/addSubCategory', formData).pipe(takeUntil(this.unsubscribe$)).subscribe(
      (res: any) => {
        this.addSubCategoryForm.reset();
        this.getSubCategory()
        this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: res.message });
        // this.imageInputVariable.nativeElement.value = ''; // Reset the file input
        // this.categoryImg = null; // Reset the selected image
      },
      (err: any) => {
        console.log(err);
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: err.error.message });
      }
    );
  }

  UpdateServiceCategory() {
    console.log("add servce ", this.categoryImg);

    const formData = new FormData();

    if (this.categoryImg) {
      formData.append('image', this.categoryImg);
    }
    // formData.append('category',this.selectedCategoryName);
    formData.append('sub_category', this.updateSubCategoryForm.get('SubCategory')?.value!);
    formData.append('description', this.updateSubCategoryForm.get('description')?.value!);
    formData.append('id', this.Subcategory_id);//subcategoryid
    formData.append('category_id', this.updateSubCategoryForm.get('category')?.value!);

    this.global.postAuthenticateData(this.global.basepath + '/admin/subcategory/update', formData).pipe(takeUntil(this.unsubscribe$)).subscribe(
      (res: any) => {
        this.getSubCategory()
        this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: res.message });
        this.addSubCategoryForm.reset();
        // this.imageInputVariable.nativeElement.value = ''; // Reset the file input
        // this.categoryImg = null; // Reset the selected image
      },
      (err: any) => {
        console.log(err);
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: err.error.message });
      }
    );
  }

  deleteSubCategory() {
    console.log("this.category_id", this.Subcategory_id);
    this.global.postAuthenticateData(this.global.basepath + '/admin/subcategory/delete', { id: this.Subcategory_id }).pipe(takeUntil(this.unsubscribe$)).subscribe(
      (res: any) => {
        this.getSubCategory()
        this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: res.message });
      },
      (err: any) => {
        console.log(err);
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: err.error.message });
      })


  }

  patchValue(data: any) {
    // console.log("hiiii",data);
    // const categoryName = data?.category?.name;
    // const selectedItem = this.product_categories.find((item:any) => item.name === categoryName);
    // if (selectedItem) {
    //     this.updateSubCategoryForm?.controls['category'].setValue(selectedItem?.id + ',' + selectedItem?.name);
    // }
    console.log();

    this.updateSubCategoryForm?.controls['category'].setValue(data.category_id);
    this.updateSubCategoryForm?.controls['SubCategory'].setValue(data.name)
    this.updateSubCategoryForm?.controls['description'].setValue(data.description)
    this.Subcategory_id = Number(data.id)
    console.log("cat id is ", this.Subcategory_id);
    // this.updateSubCategoryForm.patchValue(data)
  }

  ngOnDestroy() {
    this.queryParamsSubscription?.unsubscribe()
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}


