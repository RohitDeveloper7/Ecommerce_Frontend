import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SubcatDetailComponent } from './subcat-detail/subcat-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'subcat-details', component: SubcatDetailComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
