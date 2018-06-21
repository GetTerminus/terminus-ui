import { Component } from '@angular/core';
import { TsFileImageDimensionConstraints } from '@terminus/ui';

const CONSTRAINTS_MOCK: TsFileImageDimensionConstraints = [
  {
    height: {
      min: 50,
      max: 100,
    },
    width: {
      min: 50,
      max: 100,
    },
  },
  {
    height: {
      min: 72,
      max: 72,
    },
    width: {
      min: 72,
      max: 72,
    },
  },
  {
    height: {
      min: 400,
      max: 500,
    },
    width: {
      min: 700,
      max: 800,
    },
  },

  {
    height: {
      min: 600,
      max: 600,
    },
    width: {
      min: 160,
      max: 160,
    },
  },
  {
    height: {
      min: 250,
      max: 250,
    },
    width: {
      min: 300,
      max: 300,
    },
  },
  {
    height: {
      min: 90,
      max: 90,
    },
    width: {
      min: 728,
      max: 728,
    },
  },
  {
    height: {
      min: 240,
      max: 240,
    },
    width: {
      min: 120,
      max: 120,
    },
  },

  {
    height: {
      min: 60,
      max: 60,
    },
    width: {
      min: 120,
      max: 120,
    },
  },
  {
    height: {
      min: 600,
      max: 600,
    },
    width: {
      min: 120,
      max: 120,
    },
  },
  {
    height: {
      min: 90,
      max: 90,
    },
    width: {
      min: 120,
      max: 120,
    },
  },
  {
    height: {
      min: 125,
      max: 125,
    },
    width: {
      min: 125,
      max: 125,
    },
  },
  {
    height: {
      min: 83,
      max: 83,
    },
    width: {
      min: 125,
      max: 125,
    },
  },
  {
    height: {
      min: 150,
      max: 150,
    },
    width: {
      min: 180,
      max: 180,
    },
  },
];


@Component({
  selector: 'demo-file-upload',
  templateUrl: './file-upload.component.html',
})
export class FileUploadComponent {
  mimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
  /*
   *mimeTypes = ['text/csv'];
   */
  file: any;
  files: {id: number; file: File}[] = [];
  constraints = CONSTRAINTS_MOCK.slice();
  progress = 0;


  dropped(e) {
    console.log('DEMO: dropped: ', e);
    this.file = e;
    this.startProgress();
  }


  startProgress() {
    this.progress = 0;
    const counting = setInterval(() => {
      if (this.progress < 100) {
        this.progress++;
      } else {
        clearInterval(counting);
      }
    }, 20);
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
