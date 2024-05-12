import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ToastModule } from 'primeng/toast';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { RefundPolicyComponent } from './refund-policy/refund-policy.component';
import { PhoneNumberPipe } from './phone-number.pipe';
 
@NgModule({
  declarations: [
    SharedComponent,
    HeaderComponent,
    FooterComponent,
    ContactUsComponent,
    TermsConditionsComponent,
    PrivacyPolicyComponent,
    RefundPolicyComponent,
    PhoneNumberPipe
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    PhoneNumberPipe
  ]
})
export class SharedModule { }
