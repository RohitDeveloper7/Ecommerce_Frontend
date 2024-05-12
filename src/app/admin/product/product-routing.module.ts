import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { CategoryComponent } from './category/category.component';
import { BasicDetailsComponent } from './add-products/basic-details/basic-details.component';
import { UploadImagesComponent } from './add-products/upload-images/upload-images.component';
import { DimensionsSizeComponent } from './add-products/dimensions-size/dimensions-size.component';
import { VariantColorsComponent } from './add-products/variant-colors/variant-colors.component';
import { CustomFieldsComponent } from './add-products/custom-fields/custom-fields.component';

const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'sub-category', component: SubCategoryComponent },
  { path: 'basic-details', component: BasicDetailsComponent },
  { path: 'upload-images', component: UploadImagesComponent },
  { path: 'dimensions-size', component: DimensionsSizeComponent },
  { path: 'variant-colors', component: VariantColorsComponent },
  { path: 'custom-fields', component: CustomFieldsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
