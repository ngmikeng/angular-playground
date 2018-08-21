import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { PostItem } from '../types/post-item';

@Component({
  selector: 'app-concat-map',
  templateUrl: './concat-map.component.html',
  styleUrls: ['./concat-map.component.css']
})
export class ConcatMapComponent implements OnInit {
  listPosts: PostItem[] = [];

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.getListPosts();
  }

  getListPosts() {
    this.homeService.getListPostsSequence()
      .subscribe((post) => {
        this.listPosts.push(post);
      });
  }

}
