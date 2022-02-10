import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserAuthorizationComponent } from './components/user-authorization/user-authorization.component';
import { FormsModule, NgModel } from '@angular/forms';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PostComponent } from './components/post/post.component';
import { CommentComponent } from './components/comment/comment.component';
import { AddPostFormComponent } from './components/add-post-form/add-post-form.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { UserControlPostComponent } from './components/user-control-post/user-control-post.component';

@NgModule({
  declarations: [
    AppComponent,
    UserAuthorizationComponent,
    MainPageComponent,
    PostComponent,
    CommentComponent,
    AddPostFormComponent,
    UserPostsComponent,
    UserControlPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
