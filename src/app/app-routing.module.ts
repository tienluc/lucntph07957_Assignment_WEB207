import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './client/about/about.component';
import { IndexclientComponent } from './client/indexclient/indexclient.component';
import { ProductListComponent } from './client/product-list/product-list.component';
import { AddComponent } from './admin/add-product/add.component';
import { IndexAdminComponent } from './admin/index-admin/index-admin.component';
import { ProductEditComponent } from './admin/product-edit/product-edit.component';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import { ProductDetailComponent } from './client/product-detail/product-detail.component';
import { ChartComponent } from './admin/chart/chart.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { BolgComponent } from './client/bolg/bolg.component';
import { ContactComponent } from './client/contact/contact.component';


const routes: Routes = [

  {
    path: 'motocyles', component: IndexclientComponent,
    children: [
      { path: '', redirectTo: 'about', pathMatch: 'full' },
      { path: 'about', component: AboutComponent },
      { path: 'product', component: ProductListComponent },
      { path: 'product/:productID', component: ProductDetailComponent },
      { path: 'blog', component: BolgComponent },
      { path: 'contact', component: ContactComponent },

    ]
  },

  { path: '', redirectTo: 'motocyles', pathMatch: 'full' },
  {
    path: 'admin', component: IndexAdminComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'add', component: AddComponent },
      { path: 'edit', component: ProductEditComponent },
      { path: 'list', component: ProductManagerComponent },
      { path: 'list/edit/:productID', component: ProductEditComponent },
      { path: 'charts', component: ChartComponent },


    ]
  },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
