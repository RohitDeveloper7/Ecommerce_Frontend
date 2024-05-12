import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserComponent,
    ContactUsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
