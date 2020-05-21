import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Post } from '../posts.model';
import { PostService } from '../post.service';
import { PageEvent } from '@angular/material/paginator';
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
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  userId: string;
  userIsAuthennticated = false;
  pagesizeOption = [1, 2, 3, 5, 10, 20];
  private postsSub: Subscription;
  private authStatusSubs: Subscription;
  constructor(
    public postService: PostService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[]; postCount: number }) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
    this.userIsAuthennticated = this.authService.getisAuth();
    this.userId = this.authService.getUserId();
    this.authStatusSubs = this.authService
      .getAuthstatusListener()
      .subscribe((isauthenticeted) => {
        this.userIsAuthennticated = isauthenticeted;
        this.userId = this.authService.getUserId();
      });
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSubs.unsubscribe();
  }
  onDelete(postId: string) {
    this.isLoading = true;
    this.postService.deletePost(postId).subscribe(() => {
      this.postService.getPosts(this.postsPerPage, this.currentPage);
    });
  }
  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
  }
}
