import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { TableCategoryComponent } from './components/table-category/table-category/table-category.component';
import { AddDogScreenComponent } from './screens/add-dog-screen/add-dog-screen.component';
import { CategoryScreenComponent } from './screens/category-screen/category-screen.component';
import { EditDogScreenComponent } from './screens/edit-dog-screen/edit-dog-screen.component';
import { CasesScreenComponent} from './screens/cases-screen/cases-screen.component';

import { ReportsScreenComponent } from './screens/reports-screen/reports-screen.component';
import { DonationScreenComponent } from './screens/donation-screen/donation-screen.component';
import { SettingsScreenComponent } from './screens/settings-screen/settings-screen.component';

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
        path: 'edit-dog/:id',
        component: EditDogScreenComponent
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
