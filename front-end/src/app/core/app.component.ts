import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showHomepage: boolean = true;

  constructor(private router: Router){}

  hideHomepage() {
    this.showHomepage = false;
    this.router.navigateByUrl('./pregame');
  }
  ngOnInit() {
    setTimeout(() => {
      this.hideHomepage();
    }, 1000);
  }
}
