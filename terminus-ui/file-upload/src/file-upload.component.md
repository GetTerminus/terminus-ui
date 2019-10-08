<h1>File Upload</h1>


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic usage](#basic-usage)
  - [`TsSelectedFile`](#tsselectedfile)
- [File types](#file-types)
- [File size](#file-size)
- [Image dimensions](#image-dimensions)
- [Image ratio constraints](#image-ratio-constraints)
- [Clearing a file](#clearing-a-file)
- [Showing upload progress](#showing-upload-progress)
- [Enable multiple file selection](#enable-multiple-file-selection)
- [Handle multiple files](#handle-multiple-files)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic usage

Collect the selected file via the `selected` event:

```html
<ts-file-upload (selected)="handleFile($event)">
</ts-file-upload>
```

```typescript
@import { TsSelectedFile } from '@terminus/ui/file-upload';

...

  handleFile(e: TsSelectedFile) {
    // e.fileContents is the selected file
  }
```

### `TsSelectedFile`

The `TsSelectedFile` instance will have several items available:

```typescript
file.fileContents // string
file.height       // number (will be 0 for CSVs)
file.isCSV        // boolean
file.isImage      // boolean
file.isValid      // boolean
file.mimeType     // string
file.name         // string
file.size         // number
file.validations  // TsFileValidations
file.width        // number (will be 0 for CSVs)
```

## File types

Accepted file types can be set by the `accept` input:

```typescript
@import { TsFileAcceptedMimeTypes } from '@terminus/ui/file-upload';

...

  myMimeTypes: TsFileAcceptedMimeTypes = ['image/png', 'image/jpg'];
```

```html
<ts-file-upload [accept]="myMimeTypes">
</ts-file-upload>
```

If a file is loaded with the incorrect MIME/type, a validation message will appear below the file input.

The default types can be found by importing `TS_ACCEPTED_MIME_TYPES`;


## File size

Set a maximum size for files in kilobytes:

```html
<ts-file-upload [maximumKilobytesPerFile]="{{ 6 * 1024 }}">
</ts-file-upload>
```

If a file is loaded that exceeds the size limit, a validation message will appear below the file input.


## Image dimensions

Image dimension validation is controlled by an array of constraints passed to the component.

A single constraint has this structure:

```typescript
interface TsFileImageDimensionContraint {
  height: {
    min: number;
    max: number;
  };
  width: {
    min: number;
    max: number;
  };
}
```

For fixed image dimensions set the min and max to the same number. The component will trim ranges before exposing to the user:

```javascript
// Example:
{
  height: {
    min: 100;
    max: 100;
  };
  width: {
    min: 300;
    max: 300;
  };
}
// Will be displayed as: `300x100`

{
  height: {
    min: 50;
    max: 100;
  };
  width: {
    min: 200;
    max: 300;
  };
}
// Will be displayed as: `200-300x50-100`
```

Example:

```typescript
@import { TsFileImageDimensionConstraints } from '@terminus/ui/file-upload';

...

  myDimensionConstraints: TsFileImageDimensionConstraints = [
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
  ];
```

```html
<ts-file-upload [dimensionConstraints]="myDimensionConstraints">
</ts-file-upload>
```

If an image is selected that does not meet the dimension constraints, a validation message will appear below the file input.

## Image ratio constraints

Image ratio validation is controlled by an array of constraints passed to the component.

```html
<ts-file-upload [ratioConstraints]='["1:2", "3:4"]'>
</ts-file-upload>
```

If a file is loaded that do not meet any ratio constraints, a validation message will appear below the file input.

## Clearing a file

The user can clear the selected file by clicking the `X` button next to the filename. An event will be emitted when this occurs:

```typescript
...

  fileWasCleared() {
    ...
  }
```

```html
<ts-file-upload (cleared)="fileWasCleared()">
</ts-file-upload>
```


## Showing upload progress

The progress of an upload can be reflected in the UI by passing a number between 0 and 100 to the `progress` input:

```typescript
...
  myProgress = 0;

  // For example only. In a real scenario the progress value would be coming from the API.
  // Start a counter to fake the upload progress value
  startProgress() {
    this.myProgress = 0;
    const counting = setInterval(() => {
      if (this.myProgress < 100) {
        this.myProgress++;
      } else {
        clearInterval(counting);
      }
    }, 14);
  }
```

```html
<ts-file-upload [progress]="myProgress">
</ts-file-upload>
```


## Enable multiple file selection

Set `multiple` to `true`:

```html
<ts-file-upload [multiple]="true">
</ts-file-upload>
```


## Handle multiple files

Currently this component does not natively handle multiple file uploads (this support is planned for the future). There are ways to 'fake'
that functionality in a way.

An example:

```typescript
...

  // We'll store the selected files here for reference:
  files: {id: number; file: File}[] = [];

  // Collect the selected files from the event and store them for reference:
  selectedMultiple(e: File[]) {
    let index = -1;

    this.files = e.map((f) => {
      index = index + 1;
      return {
        id: index,
        file: f,
      };
    });
  }

  // Remove the correct file when the user clicks the clear button
  clearFile(id: number): void {
    if (!this.files || this.files.length < 1) {
      return;
    }

    this.files = this.files.filter((obj) => {
      return obj.id !== id;
    });
  }

  // Helper function to determine when to hide one of the file upload components:
  public fileExists(id: number): boolean {
    if (!this.files || this.files.length < 1) {
      return false;
    }
    const found = this.files.find((v) => {
      return v.id === id;
    });

    return found ? true : false;
  }
```

```html
<!--
  Here is the original file upload. Initially this is all the user sees.
  When multiple files are selected, they will be emitted through this event:
-->
<ts-file-upload
  (selectedMultiple)="selectedMultiple($event)"
></ts-file-upload>

<!-- Loop over the files that were collected from the selectedMultiple event -->
<ng-container *ngFor="let v of files">
  <ts-file-upload
    <!-- Only show this upload if the file still exists in our files collection: -->
    *ngIf="fileExists(v.id)"
    <!-- Seed the file input with the file from our collection: -->
    [seedFile]="v.file"
  ></ts-file-upload>
</ng-container>
```
