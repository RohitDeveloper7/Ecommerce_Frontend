import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { FreshDealsComponent } from './fresh-deals/fresh-deals.component';
import { OurRecommendsComponent } from './our-recommends/our-recommends.component';
import { BannerComponent } from './banner/banner.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'fresh-deals', component: FreshDealsComponent }, 
  { path: 'our-recommends', component: OurRecommendsComponent },
  { path: 'banner', component: BannerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
