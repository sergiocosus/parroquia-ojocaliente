import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '@app/post/models/post.model';
import * as moment from 'moment';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  postSlug: string;
  post: Post = new Post().parse({
    title: 'Nuevo Post',
    content: `
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum mauris nec molestie gravida. Cras aliquet erat non ipsum commodo ullamcorper. Cras lobortis augue quam, a condimentum elit vehicula nec. Cras eget sollicitudin magna. Ut eleifend orci mi, quis ullamcorper justo vehicula quis. Morbi sollicitudin ex sed odio laoreet, quis venenatis lacus fermentum. Vestibulum ac dignissim urna, at feugiat enim. Cras lobortis urna et placerat sagittis. Donec non scelerisque ipsum. Praesent venenatis aliquam felis non mattis. Maecenas pellentesque nisl augue, nec vulputate augue varius vitae. Morbi gravida velit lacus, eget commodo sapien molestie faucibus. Sed nec mauris et dui dignissim luctus sit amet ac nisl.
</p> 
<p>
Aenean purus justo, imperdiet sed enim et, eleifend venenatis est. In tempor nisi ut eros varius, a placerat velit egestas. Integer lectus nulla, lobortis a massa volutpat, egestas volutpat risus. Maecenas id tortor vel erat aliquet mollis in et sapien. Nunc vitae velit eu sapien tristique vestibulum. In porttitor quam ante, non dapibus arcu facilisis in. Praesent ultricies blandit consectetur.
</p>
<img src="http://fakeimg.pl/350x200/?text=Test image&font=lobster">

 <p>
Praesent hendrerit turpis diam, in cursus eros rhoncus eget. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris non nulla ullamcorper, faucibus libero a, consequat odio. Maecenas vel aliquet mi, sit amet dignissim sem. Nulla laoreet tortor quis mauris dapibus, sed accumsan lacus egestas. Vestibulum gravida neque id molestie varius. Praesent dignissim laoreet nunc, convallis consectetur nisi pulvinar vel.
</p> 
<p>
Integer finibus mauris elit, vel venenatis dolor ultricies quis. Suspendisse eget sem nisl. Donec sagittis imperdiet quam ac imperdiet. Vivamus quis mauris eu sapien ornare porttitor vitae et orci. Praesent ut diam id tortor tristique venenatis. Pellentesque congue nisl commodo semper rhoncus. Donec lorem nulla, dignissim sed lobortis nec, elementum nec elit. Maecenas sodales lacinia fermentum. Nullam placerat tempus massa, id blandit diam lacinia vitae. Aliquam erat volutpat. Phasellus posuere ac orci ac imperdiet. Etiam et viverra diam, vel euismod sapien. Maecenas ultrices eros eget ex aliquam, ac dignissim risus eleifend. In facilisis condimentum lectus. Nulla vel magna ut dolor blandit finibus.
</p>
<img src="http://fakeimg.pl/350x200/?text=Test image&font=lobster">
 
<p>
Fusce sed porta nisi. Curabitur non risus pellentesque, placerat diam id, vestibulum velit. Curabitur consequat malesuada diam, non sollicitudin felis volutpat eu. Curabitur vitae mollis ligula, vitae consectetur nisi. Pellentesque condimentum nisi et tortor elementum tempus. Morbi ultrices, purus et elementum tristique, ligula massa molestie purus, nec rhoncus dui eros id enim. Maecenas eu justo ullamcorper, tincidunt mi in, scelerisque eros. Fusce arcu eros, consequat at faucibus quis, rhoncus et metus. Fusce laoreet ante in commodo iaculis. Nullam efficitur fringilla euismod. Morbi laoreet, neque eget semper semper, tortor nulla placerat mauris, blandit sodales nisl libero ut diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis semper tortor.
</p>


`,
    created_at: moment(),
    image_url: 'https://s3.us-west-2.amazonaws.com/calvillo.com.mx/images/picture/5959b307f273f_xlg',
  });

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.postSlug = params.get('postSlug');
    });
  }

  ngOnInit() {
  }

}
