import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/post';
import { PostServiceService } from 'src/app/services/post-service.service';
import { UIService } from 'src/app/services/ui.service';
import { getPostsByTagAction } from 'src/store/actions';
import { State } from 'src/store/app-state';
import { AppState } from 'src/store/reducers';
import { selectLoadedPosts } from 'src/store/selectors';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  public posts: Array<Post> | undefined= [];

  constructor(private store: Store<State>,
              private uiService: UIService) { }

  ngOnInit(): void {
    this.store.select(selectLoadedPosts).subscribe((posts)=>{
      this.posts=posts;
    });
   this.store.dispatch(getPostsByTagAction({tag: "general"}));
  }

  public getByTag(tag:string){
    this.store.dispatch(getPostsByTagAction({tag}));
  }

  public myposts(){
    this.uiService.gotoUser();
  }

}
