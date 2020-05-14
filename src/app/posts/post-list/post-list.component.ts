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
  isLoading = false;
  private postsSub: Subscription;
  constructor(public postService: PostService) {}
  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts();
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }
}
