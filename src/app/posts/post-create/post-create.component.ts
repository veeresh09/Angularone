import { Component } from '@angular/core';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.componenet.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  enteredValue = ' ';
  newPost = 'No Content';
  onAddPost() {
    this.newPost = this.enteredValue;
  }
}
