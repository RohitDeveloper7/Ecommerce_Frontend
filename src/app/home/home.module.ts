import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SubcatDetailComponent } from './subcat-detail/subcat-detail.component';
import { SharedModule } from '../shared/shared.module';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  declarations: [
    HomeComponent,
    SubcatDetailComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    CarouselModule
  ]
})
export class HomeModule { }
