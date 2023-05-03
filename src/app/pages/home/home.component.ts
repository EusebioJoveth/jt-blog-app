import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private allSubscriptions: Subscription[] = [];
  dataSourcePost!: Array<any>;
  latestPostsData!: Array<any>;

  constructor(private postService: PostsService){}
  ngOnInit(): void {
    this.postService.getPostsByFeatured().then((querySnapshot) => {
      this.dataSourcePost = querySnapshot ? querySnapshot : [];
    });

    this.postService.getLatestPosts().then(posData =>{
      this.latestPostsData = posData?posData:[];
    });
  }

  ngOnDestroy(): void {
    this.allSubscriptions.forEach((subscription) => subscription.unsubscribe());
  }

}
