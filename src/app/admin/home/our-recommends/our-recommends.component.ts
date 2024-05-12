import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subject,takeUntil} from 'rxjs';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-our-recommends',
  templateUrl: './our-recommends.component.html',
  styleUrls: ['./our-recommends.component.scss'],
  providers: [MessageService]
})
export class OurRecommendsComponent {



  categories: any = [];
  subcategories: any = [];
  private unsubscribe$: Subject<void> = new Subject<void>(); 

  constructor(private fb: FormBuilder, private global:GlobalService , private messageService:MessageService ) { }

  ngOnInit(): void {
    this.getCategory()
  }

  addSubCategoryForm = this.fb.group({
    category: ["", Validators.required],
    SubCategory: ["", Validators.required]
  })

  updateSubCategoryForm = this.fb.group({
    category: ["", Validators.required],
    SubCategory: ["", Validators.required]
  })
  getCategory() {
    this.global.getAuthenticateData(this.global.basepath + '/admin/getCategoriesList').pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
      this.categories = res.data;
      console.log(this.categories)
      // this.TotalRecords = res.TotalRecords;
    })
  }
  getCategryId(event: any) {
    console.log("event is", event.target.value)
    let data = event.target.value;
    console.log("data is", data);
    if (data) {
      this.getSubCategory(data)
    }
  }

  getSubCategory(category_id: any) {
    console.log("category_id", category_id);

    this.global.getAuthenticateData(this.global.basepath + `/admin/getAllSubCategoriesList?category_id=${encodeURIComponent(category_id)}`).pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
      this.subcategories = res.data
    })
  }
}
