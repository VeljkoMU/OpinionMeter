import { Component, Input, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { Post } from 'src/app/models/post';
import { PostServiceService } from 'src/app/services/post-service.service';

@Component({
  selector: 'app-user-control-post',
  templateUrl: './user-control-post.component.html',
  styleUrls: ['./user-control-post.component.css']
})
export class UserControlPostComponent implements OnInit {

  @Input() public post: Post|undefined;
  public visible: boolean = true;

  constructor(private postService: PostServiceService) { }

  ngOnInit(): void {
  }

  public delete(){
    if(this.post)
      this.postService.deletePost(this.post?._id).subscribe((res)=>{
        if(res.status)
          this.visible = false;
      });
  }

}
