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
      });
  }

}
