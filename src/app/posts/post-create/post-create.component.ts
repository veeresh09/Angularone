import { Component, OnInit } from '@angular/core';
import { Post } from '../posts.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.componenet.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  enteredContent = ' ';
  enteredTitle = '';
  isLoading = false;
  private mode = 'create';
  private postId: string;
  post: Post;
  //@Output postCreated = new EventEmitter<Post>();
  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe((postData) => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
          };
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // const post: Post = {
    //   title: form.value.title,
    //   content: form.value.content,
    // };
    // this.postCreated.emit(post);
    this.isLoading = true;
    if (this.mode === 'edit') {
      this.postService.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
    } else {
      this.postService.addPost(form.value.title, form.value.content);
    }
    form.resetForm();
  }
}
