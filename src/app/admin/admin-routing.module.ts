import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddDogScreenComponent } from './screens/add-dog-screen/add-dog-screen.component';
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

const routes: Routes = [
  {
    path: '',
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
        path: 'cases',
        component: CasesScreenComponent
      },
      {
        path: 'add-dog',
        component: AddDogScreenComponent
      },
      {
        path: 'edit-report/:id',
        component: EditReportsScreenComponent
      },
      {
        path:'edit-report',
        component: EditReportsScreenComponent
      },
      {
        path:'edit-case',
        component: EditCasesScreenComponent
      },
      {
        path:'edit-category/:id',
        component:EditCategorysScreenComponent
      },
      {
        path:'edit-category',
        component:EditCategorysScreenComponent
      },
      {
        path: 'category',
        component: CategoryScreenComponent
      },
      {
        path: 'donation',
        component: DonationScreenComponent
      },
      {
        path: 'settings',
        component: SettingsScreenComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
