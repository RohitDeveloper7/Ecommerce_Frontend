import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileComponent } from './my-profile.component'; 
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    MyProfileComponent,

  ],
  imports: [
    CommonModule,
    MyProfileRoutingModule,
    TableModule
  ]
})
export class MyProfileModule { }
