import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {ProductsPageComponent} from "./products-page/products-page.component";
import {AuthGuard} from "./auth/auth.guard";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {AdminPageComponent} from "./admin-page/admin-page.component";
import {AddProductComponent} from "./add-product/add-product.component";
import {AddInventoryComponent} from "./add-inventory/add-inventory.component";
import {ProductDetailsSettingsComponent} from "./product-details-settings/product-details-settings.component";
import {UserDetailsComponent} from "./user-details/user-details.component";

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'products',
    component: ProductsPageComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'admin',
    component: AdminPageComponent,
  },
  {
    path: 'admin/product/add',
    component: AddProductComponent
  },
  {
    path: 'admin/product/settings',
    component: ProductDetailsSettingsComponent
  },
  {
    path: 'admin/inventory/add',
    component: AddInventoryComponent
  },
  {
    path: 'user/settings',
    component: UserDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
