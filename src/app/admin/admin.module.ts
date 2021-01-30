import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '@shared/modules/material/material.module';


import { SidebarComponent } from './components/sidebar/sidebar.component';


/* const component=[ AdminComponent] */

@NgModule({
  declarations: [AdminComponent, SidebarComponent,],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ]
})

export class AdminModule { }
