import { Component, OnInit } from '@angular/core';
import { HackernewsService } from '../hackernews.service';
import { PostItem } from '../types/post-item';

@Component({
  selector: 'app-fork-join',
  templateUrl: './fork-join.component.html',
  styleUrls: ['./fork-join.component.css']
})
export class ForkJoinComponent implements OnInit {
  listPosts: PostItem[] = [];

  constructor(
    private hackernewsService: HackernewsService
  ) { }

  ngOnInit() {
    this.getListPosts();
  }

  getListPosts() {
    this.hackernewsService.getListPostsForkJoin()
      .subscribe((posts) => {
        this.listPosts = posts;
      });
  }
}
