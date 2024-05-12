import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FreshDealsComponent } from './fresh-deals/fresh-deals.component';
import { OurRecommendsComponent } from './our-recommends/our-recommends.component';
import { BannerComponent } from './banner/banner.component';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    HomeComponent,
    FreshDealsComponent,
    OurRecommendsComponent,
    BannerComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    ToastModule
  ]
})
export class HomeModule { }
