import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carrossel',
  templateUrl: './carrossel.component.html',
  styleUrls: ['./carrossel.component.scss'],
})
export class CarrosselComponent {
  @Input() images: string[] = [];
  @Input() time: number = 5000;
  currentIndex = 0;
  eventAutoPlay: any;

  ngOnInit() {
    this.eventAutoPlay = setInterval(() => {
      this.nextSlide();
    }, this.time);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
}
