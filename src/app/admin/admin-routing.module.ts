import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddDogScreenComponent } from './screens/add-dog-screen/add-dog-screen.component';
import { EditDogScreenComponent } from './screens/edit-dog-screen/edit-dog-screen.component';
import { ListDogsScreenComponent } from './screens/list-dogs-screen/list-dogs-screen.component';

import { ReportsScreenComponent } from './screens/reports-screen/reports-screen.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'list-dogs',
        pathMatch: 'full'
      },
      {
        path: 'reports',
        component: ReportsScreenComponent
      },
      {
        path: 'list-dogs',
        component: ListDogsScreenComponent
      },
      {
        path: 'add-dog',
        component: AddDogScreenComponent
      },
      {
        path: 'edit-dog/:id',
        component: EditDogScreenComponent
      }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
