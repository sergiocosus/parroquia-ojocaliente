import { Component, OnInit } from '@angular/core';
import { PostService } from '@app/api/services/post.service';
import { Post } from '@app/api/models/post.model';
import { CategoryService } from '@app/api/services/category.service';
import { Category } from '@app/api/models/category.model';
import { AppMetaService } from '@app/shared/services/app-meta.service';
import { Link } from '@app/api/models/link.model';
import { LinkService } from '@app/api/services/link.service';
import { EventService } from '@app/api/services/event.service';
import { Event } from '@app/api/models/event.model';
import { SettingService } from '@app/api/services/setting.service';
import { Setting, ValidSetting } from '@app/api/models/setting.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  posts: Post[];
  categories: Category[];
  links: Link[];
  showLinks: boolean;
  events: Event[];
  mainPagePicture: Setting;

  constructor(private postService: PostService,
              private categoryService: CategoryService,
              private linkService: LinkService,
              private eventService: EventService,
              private metaService: AppMetaService,
              private settingsService: SettingService) {
  }

  ngOnInit() {
    this.metaService.update();

    this.settingsService.getCachedSetting(ValidSetting.mainPagePicture).subscribe(
      mainPagePicture => this.mainPagePicture = mainPagePicture
    );

    this.postService.get().subscribe(paginatedPosts => {
      this.posts = paginatedPosts.data;
    });

    this.categoryService.get().subscribe(
      categories => this.categories = categories
    );

    this.linkService.get().subscribe(
      paginatedLinks => this.links = paginatedLinks.data
    );

    this.eventService.get({not_expired: 'true'}).subscribe(
      events => this.events = events
    );
  }

}
