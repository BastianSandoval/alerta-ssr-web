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
import { TableCasesComponent } from './components/table-cases/table-cases.component';
import { CasesScreenComponent } from './screens/cases-screen/cases-screen.component';
import { SettingsComponent } from './screens/settings/settings.component';
import { DetailReportComponent } from './components/detail-report/detail-report.component';
import { PerfilScreenComponent } from './screens/perfil-screen/perfil-screen.component';
import { ValidatorsScreenComponent } from './screens/validators-screen/validators-screen.component';
import { FormEditValidatorComponent } from './components/form-edit-validator/form-edit-validator.component';
import { TableValidatorComponent } from './components/table-validator/table-validator.component';
import { AgmCoreModule } from '@agm/core/core.module';


@NgModule({
  declarations: [InstitutionComponent, LoginScreenComponent, PasswordRecoveryComponent, VerifyCodeComponent,
     NewPasswordComponent, SidebarComponent, SidebarBootstrapComponent, ModalLogoutComponent, 
     ReportsScreenComponent, TableReportsComponent, TableCasesComponent, CasesScreenComponent, 
     SettingsComponent, DetailReportComponent, PerfilScreenComponent, ValidatorsScreenComponent, FormEditValidatorComponent, TableValidatorComponent],
  imports: [
    CommonModule,
    InstitutionRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class InstitutionModule { }
