import { Component, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';

import { FormControl } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import '@ckeditor/ckeditor5-build-classic/build/translations/es';
import { ScriptService } from 'ngx-script-loader';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-post-ckeditor',
  templateUrl: './post-ckeditor.component.html',
  styleUrls: ['./post-ckeditor.component.scss']
})
export class PostCkeditorComponent implements OnInit {
  @ViewChild('ck') ckeditor;
  @Input() control: FormControl;

  editor; // ClassicEditor;
  editorConfig = {
    language: 'es',
    toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList',
      'numberedList', 'blockQuote', '|',
      'imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight',
      '|', 'mediaEmbed'
    ],
    image: {
      toolbar: ['imageTextAlternative'],
      styles: [
        'full',
        'alignLeft',
        'alignRight',
        'side',
      ]
    }
  };
  ckEditorLoaded: boolean;

  addImage(src: string) {
    this.ckeditor.editorInstance.execute('imageInsert',
      {source: src}
    );
  }

  constructor(@Inject(PLATFORM_ID) private platformId: string,
              private scriptService: ScriptService) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadCkEditor();
    }
  }

  loadCkEditor() {
    forkJoin(
      this.scriptService.loadScript('https://cdn.ckeditor.com/ckeditor5/11.2.0/classic/ckeditor.js'),
      this.scriptService.loadScript('https://cdn.ckeditor.com/ckeditor5/11.2.0/classic//translations/es.js')
  ).subscribe(() => {
      this.editor = (window as any).ClassicEditor;
      this.ckEditorLoaded = true;
    });
  }
}
