import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit, OnDestroy {

  allSubscription: Subscription [] = [];
  postData: any;

  constructor(private route: ActivatedRoute, private postService: PostsService){}

  ngOnInit(): void {
   this.route.params.subscribe((val:any) =>{
    this.postService.getOnePost(val.id).then((res)=>{
      this.postData = res.data()?res.data():{};

    })
   });
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

}
