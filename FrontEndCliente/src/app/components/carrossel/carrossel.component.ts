import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carrossel',
  templateUrl: './carrossel.component.html',
  styleUrls: ['./carrossel.component.scss'],
})
export class CarrosselComponent {
  constructor() {}

  @Input() public images: string[] = [];
  @Input() private time: number = 5000;
  
  public currentIndex = 0;
  private eventAutoPlay?: any;

  ngOnInit() {
    this.eventAutoPlay = setInterval(() => {
      this.nextSlide();
    }, this.time);
  }

  private nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
}
