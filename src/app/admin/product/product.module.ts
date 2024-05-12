import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { CategoryComponent } from './category/category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { EditorModule } from 'primeng/editor';
import { HttpClientModule } from '@angular/common/http';
import { GalleriaModule } from 'primeng/galleria';
import { ToastModule } from 'primeng/toast';
import { ImageModule } from 'primeng/image';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { TableSectionComponent } from './add-products/table-section/table-section.component';
import { BasicDetailsComponent } from './add-products/basic-details/basic-details.component';
import { UploadImagesComponent } from './add-products/upload-images/upload-images.component';
import { DimensionsSizeComponent } from './add-products/dimensions-size/dimensions-size.component';
import { VariantColorsComponent } from './add-products/variant-colors/variant-colors.component';
import { CustomFieldsComponent } from './add-products/custom-fields/custom-fields.component';
  
@NgModule({
  declarations: [
    ProductComponent,
    CategoryComponent,
    SubCategoryComponent,
    TableSectionComponent,
    BasicDetailsComponent,
    UploadImagesComponent,
    DimensionsSizeComponent,
    VariantColorsComponent,
    CustomFieldsComponent,
   ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    EditorModule,
    HttpClientModule,
    GalleriaModule,
    ToastModule,
    ImageModule,
    CarouselModule,
    DialogModule
    ]
})
export class ProductModule { }
