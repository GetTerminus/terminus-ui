import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-loading-overlay',
  template: `
    <div [tsLoadingOverlay]="isLoading" style="border:1px solid lightblue;">
      <p>
        Sed ducimus natus iure quas. Perferendis animi rem dolores nihil. Ut est aliquid maxime quia.
        Laborum itaque maxime eveniet eveniet minima. Nihil odit repellendus labore sed sed assumenda.
      </p>

      <p>
        Odio ut maxime architecto harum. Est voluptas cum ipsum omnis quidem.
        Molestias provident non veniam id non cumque ut. Qui atque veritatis quia voluptas.
      </p>

      <p>
        Sed ducimus natus iure quas. Perferendis animi rem dolores nihil. Ut est aliquid maxime quia.
        Laborum itaque maxime eveniet eveniet minima. Nihil odit repellendus labore sed sed assumenda.
      </p>

      <p>
        Odio ut maxime architecto harum. Est voluptas cum ipsum omnis quidem.
        Molestias provident non veniam id non cumque ut. Qui atque veritatis quia voluptas.
      </p>
    </div>
  `,
})
export class LoadingOverlayComponent implements OnInit {
  public isLoading = true;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }


}
