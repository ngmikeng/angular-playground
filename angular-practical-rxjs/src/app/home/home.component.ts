import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { PostItem } from '../types/post-item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listPosts: PostItem[] = [];

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.getListPosts();
  }

  getListPosts() {
    this.homeService.getListPosts()
      .subscribe((post) => {
        console.log(post);
        this.listPosts.push(post);

        this.listPosts.sort((first, second) => {
          const postIds = this.homeService.getPostIds();
          const firstIdIndex = postIds.findIndex((id: number) => id === first.id);
          const secondIdIndex = postIds.findIndex((id: number) => id === second.id);
          return firstIdIndex - secondIdIndex;
        });
      });
  }

}
