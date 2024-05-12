import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    MessageService
  ]
})
export class HomeComponent implements OnInit {
  constructor(public global: GlobalService, private router: Router, private messageService: MessageService, private route :ActivatedRoute) { }

  product_categories: any = []
  products: any = []
  categories: any = []
  subcategories: any = []
  freshDeal: any = []
  cardData: any = []
  bannerDatas: any = []
  responsiveOptions: any=[];
  
  
  ngOnInit() {
    this.getCategory()
    this.getProductlist()
    this.getFreshDeal()
    this.getCartData()
    this.getBanner()
    window.scroll(0, 0)

  this.responsiveOptions = [
    {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '1220px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '1100px',
        numVisible: 1,
        numScroll: 1
    }
];
}

getBanner() {
  this.global.getAuthenticateData(this.global.basepath + '/admin/getBanner').subscribe((res: any) => {
    this.bannerDatas = res.data;
  })
}

  getCategory() {
    this.global.getAuthenticateData(this.global.basepath + '/admin/getCategoriesList').subscribe((res: any) => {
      this.product_categories = res.data;
      console.log(this.product_categories)
      // this.TotalRecords = res.TotalRecords;
    })
  }

  getProductlist() {
    this.global.getAuthenticateData(this.global.basepath + '/admin/getProduct').subscribe((res: any) => {
      this.products = res.data;
      this.categories = res.data.categories
      this.subcategories = res.data.subcategories
      console.log("resresres", res.data);
    })
  }

  getFreshDeal() {
    this.global.getAuthenticateData(this.global.basepath + '/admin/getFreshDeal').subscribe((res: any) => {
      this.freshDeal = res.data;
      console.log(this.freshDeal)
      // this.TotalRecords = res.TotalRecords;
    })
  }
  getCartData() {
    this.global.getAuthenticateData(this.global.basepath + '/admin/getCartData').subscribe((res: any) => {
      this.cardData = res.data;
      console.log("cardData",this.cardData.length)
      // this.TotalRecords = res.TotalRecords;
    })
  }

  sliderPrev() {  
    document.getElementById('sliderPrev')?.click()
    document.getElementById('sliderPrev1')?.click()
  }

  sliderNext() {
    document.getElementById('sliderNext')?.click()
    document.getElementById('sliderNext1')?.click()
  }

  addToCart(data: any) {
    console.log(data); 
    let cartdata  = {
      user_id : localStorage.getItem('user_id'),
      category_id : data.category_id,
      subCategory_id:data.subCategory_id,
      productName:data.productName,
      ProductPrice:data.ProductPrice,
      product_id:data.product_id,
      productQuantity:1,
      productImages: JSON.stringify(data.productImages),
      avaliability:data.avaliability
    }
   
    this.global.postAuthenticateData(this.global.basepath + '/admin/addToCart', cartdata).subscribe(
      (res: any) => {
        this.getCartData()
        this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: res.message });
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

  navigateToSub(data:any)
  {
    this.router.navigate(['Home/subcat-details'],
   { 
    queryParams: {
      category_id: data.category_id
    }
  }
    )
    // this.router.navigate(['/Home',val])
  }

  goToDetails(val: any) {
    sessionStorage.setItem('product-detail',JSON.stringify(val))
    this.router.navigate(['/product/product-details'])
    console.log('details=>>>>>>>', val);
    console.log('--->>>>>id:', val.id);
  }
}
