import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CategoryScreenComponent } from './screens/category-screen/category-screen.component';
import { EditReportsScreenComponent } from './screens/edit-reports-screen/edit-reports-screen.component';
import { CasesScreenComponent} from './screens/cases-screen/cases-screen.component';
import { EditCasesScreenComponent } from './screens/edit-cases-screen/edit-cases-screen.component';
import { EditCategorysScreenComponent } from './screens/edit-categorys-screen/edit-categorys-screen.component';
import { ReportsScreenComponent } from './screens/reports-screen/reports-screen.component';
import { DonationScreenComponent } from './screens/donation-screen/donation-screen.component';
import { SettingsScreenComponent } from './screens/settings-screen/settings-screen.component';
import { MapOperator } from 'rxjs/internal/operators/map';
import { MapComponent } from './components/map/map.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { AdminGuard } from './../core/guards/admin/admin.guard';
import { EditDonationScreenComponent } from './screens/edit-donation-screen/edit-donation-screen.component';
import { InstitutionsScreenComponent } from './screens/institutions-screen/institutions-screen.component';
import { EditInstitutionsScreenComponent } from './screens/edit-institutions-screen/edit-institutions-screen.component';

const routes: Routes = [
  {
    path:'login',
    component: LoginScreenComponent
  },
  {
    path: '',
    canActivate: [AdminGuard],
    component: AdminComponent,
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
        path:'report',
        component: EditReportsScreenComponent
      },
      {
        path: 'institutions',
        component: InstitutionsScreenComponent
      },
      {
        path:'institution/:id',
        component: EditInstitutionsScreenComponent
      },
      {
        path:'institution',
        component: EditInstitutionsScreenComponent
      },
      {
        path: 'report/:id',
        component: EditReportsScreenComponent
      },
      {
        path: 'cases',
        component: CasesScreenComponent
      },
      {
        path:'case/:id',
        component: EditCasesScreenComponent
      },
      {
        path: 'categories',
        component: CategoryScreenComponent
      },
      {
        path:'category',
        component:EditCategorysScreenComponent
      },
      {
        path:'category/:id',
        component:EditCategorysScreenComponent
      },
      {
        path: 'donations',
        component: DonationScreenComponent
      },
      {
        path: 'donation',
        component: EditDonationScreenComponent
      },
      {
        path: 'donation/:id',
        component: EditDonationScreenComponent
      },
      {
        path: 'settings',
        component: SettingsScreenComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
