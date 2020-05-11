import { Component } from '@angular/core';
// import { Post } from '../posts.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.componenet.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  enteredContent = ' ';
  enteredTitle = '';
  //@Output postCreated = new EventEmitter<Post>();
  constructor(public postService: PostService) {}
  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // const post: Post = {
    //   title: form.value.title,
    //   content: form.value.content,
    // };
    // this.postCreated.emit(post);
    this.postService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
