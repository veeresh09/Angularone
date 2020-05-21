import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
// import { Subject } from 'rxjs';
// import { Post } from './posts/posts.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // storedposts: Post[] = [];
  // onPostAdded(post) {
  //   this.storedposts.push(post);
  // }
  constructor(private authservice: AuthService) {}
  ngOnInit() {
    this.authservice.autoAuthUser();
  }
}
