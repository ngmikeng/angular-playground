import { Component, OnInit } from '@angular/core';
import { HackernewsService } from '../hackernews.service';
import { PostItem } from '../types/post-item';

@Component({
  selector: 'app-concat-map',
  templateUrl: './concat-map.component.html',
  styleUrls: ['./concat-map.component.css']
})
export class ConcatMapComponent implements OnInit {
  listPosts: PostItem[] = [];

  constructor(
    private hackernewsService: HackernewsService
  ) { }

  ngOnInit() {
    this.getListPosts();
  }

  getListPosts() {
    this.hackernewsService.getListPostsSequence()
      .subscribe((post) => {
        this.listPosts.push(post);
      });
  }

}
