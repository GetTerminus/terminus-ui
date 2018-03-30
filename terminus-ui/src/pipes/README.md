<h1>Pipes</h1>


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [HTML usage](#html-usage)
- [Class usage](#class-usage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## HTML usage

Import the `TsPipesModule` module into your app:

```typescript
import { TsPipesModule } from '@terminus/ui';

@NgModule({
  imports: [
    ...
    TsPipesModule,
  ],
  ...
})
export class AppModule {}
```

Then use the pipe in HTML:

```html
{{ 'HERE IS MY STRING' | tsSentenceCase }}
```


## Class usage

Add the desired pipe to your app as a provider:

```typescript
import { TsPipesModule } from '@terminus/ui';

@NgModule({
  ...
  providers: [
    TsPipesModule,
  ],
  ...
})
export class AppModule {}
```

Then inject the pipe into your class and use:

```typescript
import { TsSentenceCasePipe } from '@terminus/ui';

@Component({
  ...
})
export class PipesComponent {
  myString = this.sentenceCasePipe.transform('ANOTHER STRING');

  constructor(
    private sentenceCasePipe: TsSentenceCasePipe,
  ) {}

}
```
