import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  value: number = 4;

  selectedImage: string = '';
  productDetail: any = []

  imageGallery = [
    {
      src: "assets/images/products/headphone__01.png"
    },
    {
      src: "assets/images/products/camera.png"
    },
    {
      src: "assets/images/products/headphone__03.png"
    },
    {
      src: "assets/images/products/headphone__01.png"
    },
    {
      src: "assets/images/products/headphone__01.png"
    },
    {
      src: "assets/images/products/headphone__01.png"
    },
    {
      src: "assets/images/products/headphone__01.png"
    },
    {
      src: "assets/images/products/headphone__01.png"
    },
    {
      src: "assets/images/products/headphone__01.png"
    },
    {
      src: "assets/images/products/headphone__01.png"
    },
  ]

  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '1200px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '992px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '576px',
      numVisible: 2,
      numScroll: 1
    }
    ,
    {
      breakpoint: '450px',
      numVisible: 1,
      numScroll: 1
    }
    ,
    {
      breakpoint: '100px',
      numVisible: 1,
      numScroll: 1
    }
  ]

  ngOnInit() {
    // Set the first image as selected by default
    this.productDetail = JSON.parse(sessionStorage.getItem('product-detail') || '{}')
    console.log("productDetail",this.productDetail);
    
    this.selectedImage = this.productDetail.productImages[0];
    window.scroll(0, 0)
  }

  selectImage(imageUrl: string) {
    this.selectedImage = imageUrl;
  }

}
