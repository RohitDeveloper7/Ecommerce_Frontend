import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-subcat-detail',
  templateUrl: './subcat-detail.component.html',
  styleUrls: ['./subcat-detail.component.scss']
})
export class SubcatDetailComponent implements OnInit {
  categories: any = []
  category_id : string = '' 

  constructor(public global: GlobalService, private router: Router,private route:ActivatedRoute) { }


  ngOnInit() {
    this.route.queryParams.subscribe((params:any)=>{
      this.category_id = params['category_id']
    })
    this.getSubCategory()
    window.scroll(0, 0)
  }

  // getCategory() {
  //   this.global.getAuthenticateData(this.global.basepath + '/admin/getCategoriesList').subscribe((res: any) => {
  //     this.categories = res.data;
  //     console.log(this.categories)
  //     // this.TotalRecords = res.TotalRecords;
  //   })
  // }

  getSubCategory() {
    this.global.getAuthenticateData(this.global.basepath + `/admin/getAllSubCategoriesList?category_id=${this.category_id}`,).subscribe((res: any) => {
      this.categories = res.data
      console.log(this.categories)
    })
  }

  navigateToSubcat(data:any){
    this.router.navigate(['/product/product-details'],
      {
        queryParams:{
          category_id: data.category_id,
          subCategory_id: data.subCategory_id,
          subDisc:data.subDisc

        }
      }
    )
  }
}
