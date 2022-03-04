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
import { VotesMeterComponent } from './components/votes-meter/votes-meter.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    UserAuthorizationComponent,
    MainPageComponent,
    PostComponent,
    CommentComponent,
    AddPostFormComponent,
    UserPostsComponent,
    UserControlPostComponent,
    VotesMeterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
