import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { ToastModule } from 'primeng/toast';
import { AccordionModule } from 'primeng/accordion';
import { ImagePreviewComponent } from './image-preview/image-preview.component';
 
@NgModule({
  declarations: [
    SharedComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    ImagePreviewComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ToastModule,
    AccordionModule,
   ],
  exports: [
    AdminHeaderComponent,
    AdminSidebarComponent
  ]
})
export class SharedModule { }
