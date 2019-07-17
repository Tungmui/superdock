import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PlanViewComponent } from './plan-view/plan-view.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: "home", component: HomeComponent,
    children: [
      { path: "", redirectTo: "index", pathMatch: "full" },
      { path: "planView/:id", component: PlanViewComponent },
      { path: "index", component: IndexComponent }
    ]
  },
  { path: "plan", component: PlanViewComponent },
  { path: "login", component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
