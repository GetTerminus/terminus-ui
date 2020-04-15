import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
} from '@angular/router';
import { untilComponentDestroyed } from '@terminus/ngx-tools/utilities';
import {
  filter,
  map,
} from 'rxjs/operators';


@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(
      untilComponentDestroyed(this),
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child?.firstChild) {
          child = child.firstChild;
        }
        if (child?.snapshot.data.name) {
          return child.snapshot.data.name;
        }
        return 'Components';
      }),
    ).subscribe((title: string) => {
      this.titleService.setTitle(title);
    });
  }

  ngOnDestroy() {}
}
