import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../posts.model';
import { PostService } from '../post.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: 'First', content: 'This is osme shit' },
  //   { title: 'First', content: 'This is osme shit' },
  //   { title: 'First', content: 'This is osme shit' },
  // ];
  // @Input()
  posts: Post[] = [];
  private postsSub: Subscription;
  constructor(public postService: PostService) {}
  ngOnInit() {
    this.postService.getPosts();
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
