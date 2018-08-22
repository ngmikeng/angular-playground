import { Component, OnInit } from '@angular/core';
import { HackernewsService } from '../hackernews.service';
import { PostItem } from '../types/post-item';

@Component({
  selector: 'app-merge-map',
  templateUrl: './merge-map.component.html',
  styleUrls: ['./merge-map.component.css']
})
export class MergeMapComponent implements OnInit {
  listPosts: PostItem[] = [];

  constructor(
    private hackernewsService: HackernewsService
  ) { }

  ngOnInit() {
    this.getListPosts();
  }

  getListPosts() {
    this.hackernewsService.getListPosts()
      .subscribe((post) => {
        this.listPosts.push(post);
        // sort by ids
        this.listPosts.sort((first, second) => {
          const postIds = this.hackernewsService.getPostIds();
          const firstIdIndex = postIds.findIndex((id: number) => id === first.id);
          const secondIdIndex = postIds.findIndex((id: number) => id === second.id);
          return firstIdIndex - secondIdIndex;
        });
      });
  }

}
