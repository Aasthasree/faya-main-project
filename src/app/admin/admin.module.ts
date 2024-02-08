//Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Feature Module
import { AdminRoutingModule } from './admin-routing.module';
//components
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactComponent } from './components/contact/contact.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    ContactComponent,
    LayoutComponent,
    NavbarComponent,
    CustomerDetailComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }