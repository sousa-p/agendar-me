import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refresher',
  templateUrl: './refresher.component.html',
  styleUrls: ['./refresher.component.scss'],
})
export class RefresherComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  private tempo: number = 300;
  
  public handleRefresh(event: any) {
    setTimeout(() => {
      location.reload();
      event.target.complete();
    }, this.tempo);
  }
}
