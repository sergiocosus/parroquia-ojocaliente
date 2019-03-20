import { Component, OnInit } from '@angular/core';
import { PostService } from '@app/api/services/post.service';
import { Post } from '@app/api/models/post.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  posts: Post[];

  links = [
    {
      title: 'Conviértete, nadie está seguro cómo ni cuándo terminará su vida',
      url: 'http://es.catholic.net/op/articulos/72443/conviertete-porque-nadie-esta-seguro-ni-como-ni-cuando-terminara-su-vida.html'
    },
    {
      title: 'Ayuno y Abstinencia en la Iglesia Católica',
      url: 'https://www.aciprensa.com/recursos/ayuno-y-abstinencia-1923'
    }
  ];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.get().subscribe(paginatedPosts => {

      this.posts = paginatedPosts.data;
    });
  }

}
