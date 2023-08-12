import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refresher',
  templateUrl: './refresher.component.html',
  styleUrls: ['./refresher.component.scss'],
})
export class RefresherComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  handleRefresh(event: any) {
    setTimeout(() => {
      location.reload();
      event.target.complete();
    }, 300);
  }
}
