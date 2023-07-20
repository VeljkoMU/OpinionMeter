import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/post';
import { getMostEngagedWithPostsAction } from 'src/store/actions';
import { State } from 'src/store/app-state';
import { selectMostEngagedWithPosts } from 'src/store/selectors';

@Component({
  selector: 'app-posts-carousel',
  templateUrl: './posts-carousel.component.html',
  styleUrls: ['./posts-carousel.component.css']
})
export class PostsCarouselComponent implements OnInit {

  public posts: Array<Post> = [];
  @Output() public seeMoreEvent: EventEmitter<void> = new EventEmitter();
  @Input() public isUserSignedIn: boolean = false;
  @Input() public showIcons: boolean = true;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.store.select(selectMostEngagedWithPosts).subscribe((data) => {
      this.posts = data.length >= 3 ? data.slice(0, 3) : data;
    })
    this.store.dispatch(getMostEngagedWithPostsAction())
  }
  
  public seeMoreClicked() {
    this.seeMoreEvent.emit();
  }
}
