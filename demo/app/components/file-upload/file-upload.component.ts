import { Component } from '@angular/core';
/*
 *import { TsDroppedFile } from '@terminus/ui';
 */


@Component({
  selector: 'demo-file-upload',
  templateUrl: './file-upload.component.html',
})
export class FileUploadComponent {
  mimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
  file: any;
  files: {id: number; file: File}[] = [];


  dropped(e) {
    console.log('DEMO: dropped: ', e);
    this.file = e;
  }


  droppedMultiple(e: File[]) {
    console.log('DEMO: dropped multiple: ', e);
    let index = -1;

    const fileMap = e.map((f) => {
      index = index + 1;
      return {
        id: index,
        file: f,
      };
    });

    this.files = fileMap;
  }


  clearFile(id: number): void {
    if (!this.files || this.files.length < 1) {
      return;
    }

    this.files = this.files.filter((obj) => {
      return obj.id !== id;
    });
  }


  public trackBy(i, v) {
    console.log('trackby: ', i, v);
    return v.id;
  }


  public fileExists(id: number): boolean {
    if (!this.files || this.files.length < 1) {
      return false;
    }
    const found = this.files.find((v) => {
      return v.id === id;
    });

    if (found) {
      return true;
    } else {
      return false;
    }
  }

}
