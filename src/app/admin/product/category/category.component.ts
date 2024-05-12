import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { GlobalService } from 'src/app/global.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [MessageService]
})

export class CategoryComponent implements OnInit, OnDestroy {
  product_categories: any = [];
  imageExtensionsArray: any = ['apng', 'jpg', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp'];
  categoryImg: any = [];
  isExpanded: boolean = false;
  private unsubscribe$: Subject<void> = new Subject<void>();
  @ViewChild('imageInput') imageInputVariable: any = ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder, private global: GlobalService, private messageService: MessageService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCategory();
    console.log('Form Valid:', this.addCategoryForm.valid);

  }

  category_id: any

  addCategoryForm = this.fb.group({
    category_name: ["", Validators.required],
    image: [null, Validators.required],
    description: [""]
  })

  updateCategoryForm = this.fb.group({
    category: ["", Validators.required],
    image: ["", Validators.required],
    description: ["", Validators.required]
  })

  handleFileInput(event: any) {
    const file = event?.target?.files?.[0];
    if (file) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (this.imageExtensionsArray && this.imageExtensionsArray.includes(fileExtension)) {
        this.categoryImg = file;
        console.log(" this.categoryImg", this.categoryImg);

        this.addCategoryForm.get('image')?.setErrors(null); // Set image control as valid
      } else {
        this.imageInputVariable.nativeElement.value = '';
        this.addCategoryForm.get('image')?.setErrors({ 'invalidImage': true }); // Set image control as invalid
      }
    }
  }





  getCategory() {
    this.global.getAuthenticateData(this.global.basepath + '/admin/getCategoriesList').pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
      this.product_categories = res.data;
      console.log(this.product_categories)
      // this.TotalRecords = res.TotalRecords;
    })
  }

  navigateCopyClipboard(text: string) {
    const clipBoard = navigator.clipboard;
    clipBoard.writeText(text).then(() => {
      this.messageService.add({severity:'success', summary:"Copy text SuccessFully"})
    });
  }

  openFolder(data: any) {
    console.log("data", data);
    // localStorage.setItem("category",data.category_name)
    // this.router.navigate(['admin/product/sub-category'])
    this.router.navigate(['admin/product/sub-category'], {
      queryParams: {
        category: data.category_name,
        category_id: data.id
      }
    })
  }


  addServiceCategory() {
    console.log(this.addCategoryForm.value);

    const formData = new FormData();

    if (this.categoryImg) {
      formData.append('file', this.categoryImg);
    }
    formData.append('admin_id', localStorage.getItem('id')!);
    formData.append('categoryName', this.addCategoryForm.get('category_name')?.value!);
    formData.append('catDesc', this.addCategoryForm.get('description')?.value!);
    console.log("formData", formData);

    this.global.postAuthenticateData(this.global.basepath + '/admin/CreateCategory', formData).pipe(takeUntil(this.unsubscribe$)).subscribe(
      (res: any) => {
        this.getCategory()
        this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: res.message });
        this.addCategoryForm.reset();
        this.imageInputVariable.nativeElement.value = ''; // Reset the file input
        this.categoryImg = null; // Reset the selected image
      },
      (err: any) => {
        console.log(err);
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: err.error.message });
      }
    );
  }

  updatecategory() {

    const formdata = new FormData();
    if (this.categoryImg) {
      formdata.append('image', this.categoryImg);
    }
    formdata.append('category_name', this.updateCategoryForm.get('category')?.value!);
    formdata.append('description', this.updateCategoryForm.get('description')?.value!);
    formdata.append('id', this.category_id)
    console.log("formData", formdata);

    // let data = {
    //   id: this.category_id,
    //   image :this.categoryImg,
    //   category_name:this.updateCategoryForm.get('category')?.value,
    //   description:this.updateCategoryForm.get('category')?.value,
    //   category_id:this.category_id
    // };

    this.global.postAuthenticateData(this.global.basepath + '/admin/category/update', formdata).pipe(takeUntil(this.unsubscribe$)).subscribe(
      (res: any) => {
        this.getCategory()
        this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: res.message });
        this.imageInputVariable.nativeElement.value = ''; // Reset the file input
      },
      (err: any) => {
        console.log(err);
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: err.error.message });
      }
    );

  }

  deleteCategory() {
    console.log("this.category_id", this.category_id);
    this.global.postAuthenticateData(this.global.basepath + '/admin/category/delete', { id: this.category_id }).pipe(takeUntil(this.unsubscribe$)).subscribe(
      (res: any) => {
        this.getCategory()
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
    console.log("hiiii", data);
    this.updateCategoryForm?.controls['category'].setValue(data.category_name)
    this.updateCategoryForm?.controls['description'].setValue(data.description)
    this.category_id = Number(data.id)
    console.log("cat id is ", this.category_id);

  }

  notMoreThan50Words(word: any): string {
    if (!word) return ''; // Handle null or undefined
    const words = word.split(' ');
    return words.slice(0, 20).join(' ');
  }

  isDataAvailable(): boolean {
    return !this.product_categories?.description;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }



}
