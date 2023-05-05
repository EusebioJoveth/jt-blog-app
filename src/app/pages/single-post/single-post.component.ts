import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit{

  allSubscription: Subscription [] = [];
  postData: any;
  similarPostArray!:Array<any>;

  constructor(private route: ActivatedRoute, private postService: PostsService){}

  ngOnInit(): void {
   this.route.params.subscribe((val:any) =>{
    this.postService.countViews(val.id);
    this.postService.getOnePost(val.id).then((res)=>{
      this.postData = res.data()?res.data():{};
      this.loadSimilarPost(this.postData.category.categoryId);
    })
   });
  }

  loadSimilarPost(categoryId:string){
    this.postService.getCategoryPosts(categoryId).then(similarPost=>{
      this.similarPostArray = similarPost
    })
  }


}
