import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
// import { CarouselModule } from 'ngx-owl-carousel-o';
import { TabViewModule } from 'primeng/tabview';
import { SliderModule } from 'primeng/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { CarouselModule } from 'primeng/carousel';
import { WishListComponent } from './wish-list/wish-list.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductListingComponent,
    ProductDetailsComponent,
    WishListComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    CarouselModule,
    TabViewModule,
    SliderModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule
  ]
})
export class ProductModule { }
