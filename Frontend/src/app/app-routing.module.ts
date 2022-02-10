import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { UserAuthorizationComponent } from './components/user-authorization/user-authorization.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';

const routes: Routes = [
  {
    path:'login-register',
    component: UserAuthorizationComponent
  },
  {
    path: 'main',
    component: MainPageComponent
  },
  {
    path: 'user',
    component: UserPostsComponent
  },
  { path: '**', redirectTo: 'login-register', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
