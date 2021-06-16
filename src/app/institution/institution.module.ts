import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitutionRoutingModule } from './institution-routing.module';
import { InstitutionComponent } from './institution.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';


import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordRecoveryComponent } from './screens/password-recovery/password-recovery.component';
import { VerifyCodeComponent } from './screens/verify-code/verify-code.component';
import { NewPasswordComponent } from './screens/new-password/new-password.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarBootstrapComponent } from './components/sidebar-bootstrap/sidebar-bootstrap.component';
import { ModalLogoutComponent } from './components/modal-logout/modal-logout.component';
import { ReportsScreenComponent } from './screens/reports-screen/reports-screen.component';
import { TableReportsComponent } from './components/table-reports/table-reports.component';


@NgModule({
  declarations: [InstitutionComponent, LoginScreenComponent, PasswordRecoveryComponent, VerifyCodeComponent, NewPasswordComponent, SidebarComponent, SidebarBootstrapComponent, ModalLogoutComponent, ReportsScreenComponent, TableReportsComponent],
  imports: [
    CommonModule,
    InstitutionRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InstitutionModule { }
