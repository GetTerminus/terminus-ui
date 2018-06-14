import { Component } from '@angular/core';


@Component({
  selector: 'demo-file-upload',
  templateUrl: './file-upload.component.html',
})
export class FileUploadComponent {
  mimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
  file: any;

  dropped(e) {
    console.log('DEMO: dropped: ', e);
    this.file = e;
  }

  droppedMultiple(e) {
    console.log('DEMO: dropped multiple: ', e);
  }
}
