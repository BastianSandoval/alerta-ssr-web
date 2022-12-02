import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComplaintDetailComponent } from './screens/complaint-detail/complaint-detail.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { VisitorComponent } from './visitor.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: VisitorComponent,
    children: [
      { path: 'home', component: HomeScreenComponent },
      { path: 'report/:id', component: ComplaintDetailComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitorRoutingModule { }
