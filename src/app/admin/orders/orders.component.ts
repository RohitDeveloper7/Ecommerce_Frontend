import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  categories: any[] = [
    {
      name: 'Electronics',
      categorie: 'Mobile Phones'
    },
    {
      name: 'Toys',
      categorie: 'Dolls'
    },
    {
      name: 'Groceries',
      categorie: 'Rice',
    },
    {
      name: 'Cosmatics',
      categorie: 'Lipsticks'
    },
    {
      name: 'Cosmatics',
      categorie: 'Lipsticks'
    },
    {
      name: 'Cosmatics',
      categorie: 'Lipsticks'
    },
    {
      name: 'Cosmatics',
      categorie: 'Lipsticks'
    },
  ]

  constructor(private fb: FormBuilder) { }

  addSubCategoryForm = this.fb.group({
    category: ["", Validators.required],
    SubCategory: ["", Validators.required]
  })

  updateSubCategoryForm = this.fb.group({
    category: ["", Validators.required],
    SubCategory: ["", Validators.required]
  })

}
