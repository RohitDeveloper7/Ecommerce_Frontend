import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [
    MessageService
  ]
})
export class ProductComponent implements OnInit,OnDestroy {

  activeIndex: number = 0;
  displayCustom: boolean = false;
  productImages : any = []
  text: string | undefined;
  imageExtensionsArray: any = ['apng', 'jpg', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp'];
  categoryImg: any = [];
  // sendBase64ImageToServer: any
  optionDisabled: boolean = true
  isExpanded: boolean = false
  products: any = []
  categories: any = []
  subcategories: any = []
  product_id: any
  arrayimages: any = []
  product_categories: any = []
  product_Subcategories: any = []
  subcategory_id: any
  paramsUrl: any
  url: any
  private unsubscribe$: Subject<void> = new Subject<void>();
  // iconFile: File[] = [];
  images: string[] = [];
  @ViewChild('image') iconInputVariable!: ElementRef;
  @ViewChild('included_image') iconInputVariables!: ElementRef;
  showFileInput: any;
  visible: boolean = false;
  private queryParamsSubscription: Subscription | undefined;


  responsiveOptions: any = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor(public global: GlobalService, private messageService: MessageService, private fb: FormBuilder, private route: ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.queryParamsSubscription = this.route.queryParams.subscribe((params: any) => {
      console.log("parmas is the ", params);
      if (params['subcategory_id']) {
        this.subcategory_id = params['subcategory_id']
        this.paramsUrl = `/admin/getProduct?subcategory_id=${encodeURIComponent(this?.subcategory_id)}`
        console.log("this.category_id", this.subcategory_id);
      }
      else {
        this.url = '/admin/getProduct'
      }
    })
    this.getCategory()
    this.getProductlist()
  }


  imageClick(index: number, productId: string) {   
    this.activeIndex = index;
    console.log("activeIndex,selectedProductId",this.activeIndex,productId);
    
    this.productImages = this?.products.find((product:any) => product.images.some((image:any) => image.id === productId))?.images ?? [];
    console.log(">>>>><<<<<<",this.productImages);
    this.displayCustom = true;
  }
  zoomedImage: HTMLImageElement | null = null;

   zoomImage(event: MouseEvent) {
        const imgElement = event.target as HTMLImageElement;
        
        // Check if the clicked image is already zoomed in
        if (this.zoomedImage === imgElement) {
            // Revert to normal size
            imgElement.style.transform = 'scale(1)';
            imgElement.style.transition = 'transform 0.5s ease';
            this.zoomedImage = null; // Reset zoomed image
        } else {
            // Zoom in
            imgElement.style.transform = 'scale(2.5)';
            imgElement.style.transition = 'transform 0.5s ease';
            this.zoomedImage = imgElement; // Set zoomed image
        }
    }


  showDialog() {
    this.visible = true;
  }

  addProductCategoryForm = this.fb.group({
    category: ["", Validators.required],
    subcategory: ["", Validators.required],
    image: ["", Validators.required],
    productName: ["", Validators.required],
    ProductPrice: ["", Validators.required],
    discountPrice: ["", Validators.required],
    productQuantity: ["", Validators.required],
    productDescription: ["", Validators.required],
    avaliability: ["", Validators.required],

  })
  UpdateProductCategoryForm = this.fb.group({
    category: ["", Validators.required],
    subcategory: ["", Validators.required],
    image: ["", Validators.required],
    productName: ["", Validators.required],
    ProductPrice: ["", Validators.required],
    discountPrice: ["", Validators.required],
    productQuantity: ["", Validators.required],
    productDescription: ["", Validators.required],
    avaliability: ["", Validators.required],
  })


  trueDailog() {
    this.visible = true
  }

  navigateCopyClipboard(text: string) {
    const clipBoard = navigator.clipboard;
    clipBoard.writeText(text).then(() => {
      this.messageService.add({severity:'success', summary:"Copy text SuccessFully"})
    });
  }

  navigateback(){
    console.log(">>>>>>>");
    if(this?.subcategory_id){
      console.log(">>>>>>> inisde the funciton");
      this.router.navigate(['admin/product/sub-category'],{
        queryParams: {
          category: this.products[0].category_name,
          category_id: this.products[0].category_id
        }
      })
    }
  }

  // handleFileInput(event: any) {
  //   const files: FileList = event.target.files;
  //   // this.images: string[] = [];
  //   const imagePreview = document.querySelector('.image-preview');
  //   if (files && files.length > 0 && files.length <= 5) {
  //     for (let i = 0; i < files.length; i++) {
  //       const fileExtension = files[i].name.split('.').pop()
  //       if (this.imageExtensionsArray.includes(fileExtension)) {
  //         const reader = new FileReader();
  //         const file: File = files[i];
 
  //         reader.onload = (e: any) => {
  //           let base64ImageString: string = e.target.result;
  //           // const substringToRemove = `data:image/${fileExtension};base64,`;//it's also work
  //           // base64ImageString = base64ImageString.replace(substringToRemove, ''); 
  //           let startIndex = base64ImageString.indexOf('data:image');
  //           let endIndex = base64ImageString.indexOf(';base64,') + ';base64,'.length;
  //           // , substring() is used to remove the substring between startIndex and endIndex from base64ImageString, effectively removing the part of the string that contains the image data before 'data:image' and after ';base64,'.
  //           // Checking if both start and end index are valid
  //           if (startIndex !== -1 && endIndex !== -1) {
  //               let modifiedImageString = base64ImageString.substring(0, startIndex) + base64ImageString.substring(endIndex);
                
  //               this.images.push(modifiedImageString);
  //               const img = document.createElement('img');
  //               img.src = e.target.result;
  //               img.style.maxWidth = '50%'; 
  //               imagePreview!.appendChild(img);
                
  //               // Check if all images have been processed
  //               if (this.images.length === files.length) {
  //                   // Do something with the array of base64 images (images)
  //                   console.log("All images processed:", this.images);
  //               }
  //           } else {
  //               console.log("Invalid start or end index");
  //           }
  //       };
        
  //         reader.readAsDataURL(file);
  //       }
  //     }
  //   }
  //   else {
  //     event.target.value = '';
  //     this.messageService.add({ severity: 'error', summary: "you can select at a time five images" });
  //   }
  // }



  getCategryId(event: any) {
    console.log("event is", event.target.value)
    let data = event.target.value;
    console.log("data is", data);
    if (data) {
      this.getSubCategory(data)
    }

  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;

    // Remove any 'e' or '-' characters from the input value
    const sanitizedValue = inputValue.replace(/[e-]/gi, '');

    // Update the input value if it was modified
    if (inputValue !== sanitizedValue) {
      input.value = sanitizedValue;
    }
}

onKeyDown(event: KeyboardEvent) {
  // Prevent the default action for 'e' key and '-' key
  if (event.key === 'e' || event.key === '-') {
    event.preventDefault();
  }
}



handleFileInput(event: any) {
  const files = event?.target?.files;

  if (files) {
    const validImageExtensions = this.imageExtensionsArray || []; // Array of allowed image extensions
    const selectedImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (validImageExtensions.includes(fileExtension)) {
        selectedImages.push(file);
      }
    }

    if (selectedImages.length > 0) {
      // Assign the selected images to a property or array
      this.images = selectedImages; // Assuming categoryImages is an array property

      console.log("Selected images:", this.images);
    } else {
      console.log("No valid images selected.");
    }
  }
}


  //  handleFileInput(event: any) {
  //     const files: FileList = event.target.files;
  //     if (files && files.length > 0 && files.length <= 5) {
  //       for (let i = 0; i < files.length; i++) {
  //         const reader = new FileReader();
  //         const file: File = files[i];
  //         reader.onload = (e: any) => {
  //           const base64ImageString: string = e.target.result;
  //           this.images.push(base64ImageString);
  //           if (this.images.length === files.length) {
  //             console.log("All images processed:", this.images);
  //           }
  //         };
  //         reader.readAsDataURL(file);
  //       }
  //     }
  //     else{
  //       event.target.value = '';
  //       this.messageService.add({ severity: 'error', summary: "you can select at a time five images" });
  //     }
  //   }

  getCategory() {
    this.global.getAuthenticateData(this.global.basepath + '/admin/getCategoriesList').pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
      this.product_categories = res.data;
      console.log(this.product_categories)
      // this.TotalRecords = res.TotalRecords;
    })
  }

  getSubCategory(category_id: any) {
    this.optionDisabled = false
    console.log("category_id", category_id);

    this.global.getAuthenticateData(this.global.basepath + `/admin/getAllSubCategoriesList?category_id=${encodeURIComponent(category_id)}`).pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
      // this.product_Subcategories = res.data?.subcategories;
      this.product_Subcategories = res.data
    })
  }



  getProductlist() {
    console.log("url is ", this.url);
    console.log("parmasUrl is ", this.paramsUrl);
    let url = this.paramsUrl ? this.paramsUrl : this.url;
    
    this.global.getAuthenticateData(this.global.basepath + url).pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
      this.products = res.data;
      // this.categories = res.data.categories
      // this.subcategories = res.data.subcategories
      console.log("resresres", res.data);
      this.url = '/admin/getProduct';
      this.paramsUrl = undefined
    })
  }


  addProductCategory() {
    console.log("(this.images)", this.images);
    const formData = new FormData()
    for (let i = 0; i < this.images.length; i++) {
      const fileItem = this.images[i];
      formData.append('file', fileItem);
    }

    // formData.append('file',this.images)
    formData.append('admin_id', localStorage.getItem('id')!)
    formData.append('category_id', this.addProductCategoryForm.get('category')?.value!)
    formData.append('subCategory_id', this.addProductCategoryForm.get('subcategory')?.value!)
    formData.append('productName', this.addProductCategoryForm.get('productName')?.value!)
    formData.append('ProductPrice', this.addProductCategoryForm.get('ProductPrice')?.value!)
    formData.append('discountPrice', this.addProductCategoryForm.get('discountPrice')?.value!)
    formData.append('productQuantity', this.addProductCategoryForm.get('productQuantity')?.value!)
    formData.append('productDescription', this.addProductCategoryForm.get('productDescription')?.value!)
    formData.append('avaliability', this.addProductCategoryForm.get('avaliability')?.value!)

    console.log("formData",formData);

    this.global.postAuthenticateData(this.global.basepath + '/admin/addProduct', formData).pipe(takeUntil(this.unsubscribe$)).subscribe(
      (res: any) => {
        this.getProductlist()
        this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: res.message });
        this.addProductCategoryForm.reset();
        this.images = [];
        // this.imageInputVariable.nativeElement.value = ''; // Reset the file input
        // this.categoryImg = null; // Reset the selected image
      },
      (err: any) => {
        console.log(err);
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: err.error.error });
      }
    );
  }

  UpdateProductCategory() {
    let data = {
      images: JSON.stringify(this.images),
      category_id: this.UpdateProductCategoryForm.get('category')?.value!,
      sub_category_id: this.UpdateProductCategoryForm.get('subcategory')?.value!,
      name: this.UpdateProductCategoryForm.get('productName')?.value!,
      price: this.UpdateProductCategoryForm.get('ProductPrice')?.value!,
      discounted_price: this.UpdateProductCategoryForm.get('discountPrice')?.value!,
      available_quantity: this.UpdateProductCategoryForm.get('productQuantity')?.value!,
      description: this.UpdateProductCategoryForm.get('productDescription')?.value!,
      id: this.product_id
    }

    this.global.postAuthenticateData(this.global.basepath + '/admin/product/update', data).pipe(takeUntil(this.unsubscribe$)).subscribe(
      (res: any) => {
        this.getProductlist()
        this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: res.message });
        this.addProductCategoryForm.reset();
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
    console.log("this.category_id", this.product_id);
    this.global.postAuthenticateData(this.global.basepath + '/admin/product/delete', { id: this.product_id }).pipe(takeUntil(this.unsubscribe$)).subscribe(
      (res: any) => {
        this.getProductlist()
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
    // this.UpdateProductCategoryForm?.controls['category'].setValue(data.category.name)
    this.UpdateProductCategoryForm?.controls['category'].setValue(data?.category_id);
    this.UpdateProductCategoryForm?.controls['subcategory'].setValue(data?.subcategory_id)
    this.UpdateProductCategoryForm?.controls['productDescription'].setValue(data.description)
    this.UpdateProductCategoryForm?.controls['productName'].setValue(data.name)
    this.UpdateProductCategoryForm?.controls['ProductPrice'].setValue(data.price)
    this.UpdateProductCategoryForm?.controls['productQuantity'].setValue(data.available_quantity)
    this.UpdateProductCategoryForm?.controls['discountPrice'].setValue(data.discounted_price)

    this.product_id = Number(data.id)
    console.log("cat id is ", this.product_id);
    if (data?.category_id) {
      this.getSubCategory(data?.category_id)
    }
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

