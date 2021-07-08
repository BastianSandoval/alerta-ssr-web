import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { ReportsScreenComponent } from './screens/reports-screen/reports-screen.component';
import { InstitutionComponent } from './institution.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { PasswordRecoveryComponent } from './screens/password-recovery/password-recovery.component';
import { CasesScreenComponent } from './screens/cases-screen/cases-screen.component'
import { SettingsComponent } from './screens/settings/settings.component';
import { DetailReportComponent } from './components/detail-report/detail-report.component';
import { PerfilScreenComponent } from './screens/perfil-screen/perfil-screen.component';
import { InstitutionGuard } from '../core/guards/institution/institution.guard';

const routes: Routes = [
  {
    path:'login',
    component: LoginScreenComponent
  },
  {
    path:'/login/recovery',
    component: PasswordRecoveryComponent
  },
  {
    path:'',
    //canActivate: [InstitutionGuard],
    component: InstitutionComponent,
    children: [
      {
        path: '',
        redirectTo: 'reports',
        pathMatch: 'full'
      },
      {
        path: 'reports',
        component: ReportsScreenComponent
      },
      {
        path: 'report/:id',
        component: DetailReportComponent
      },
      {
        path: 'cases',
        component: CasesScreenComponent
      },
      {
        path: 'cases/:id',
        component: DetailReportComponent
      },
      {
        path: 'perfil',
        component: PerfilScreenComponent
      },
      {
        path: 'settings',
        component: SettingsComponent

      }
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstitutionRoutingModule { }
