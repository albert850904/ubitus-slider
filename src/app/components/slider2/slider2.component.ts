import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'ubi-slider2',
  templateUrl: './slider2.component.html',
  styleUrls: ['./slider2.component.scss'],
})
export class Slider2Component implements OnInit, AfterViewInit {
  @ViewChildren('slide') slides!: QueryList<ElementRef>;
  // 類似於querySelectorAll

  automate: boolean = true;
  intervalTimer: number = 5000;
  autoInterval!: ReturnType<typeof setInterval>;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.automate) {
      this.autoInterval = setInterval(() => this.nextSlideHandler(), 5000);
    }
  }

  ngAfterViewInit(): void {}

  onClickNextSlide() {
    // reset interval
    clearInterval(this.autoInterval);
    this.autoInterval = setInterval(() => this.nextSlideHandler(), 5000);
    this.nextSlideHandler();
  }

  onClickPrevSlide() {
    // reset interval
    clearInterval(this.autoInterval);
    this.autoInterval = setInterval(() => this.nextSlideHandler(), 5000);
    this.prevSlideHandler();
  }

  nextSlideHandler() {
    const current = document.querySelector('.current');
    current?.classList.remove('current');
    // check for next slide (sibling)
    if (current?.nextElementSibling) {
      current.nextElementSibling.classList.add('current');
      return;
    }

    // no next element
    this.renderer.addClass(this.slides.get(0)?.nativeElement, 'current');
  }

  prevSlideHandler() {
    const current = document.querySelector('.current');
    current?.classList.remove('current');
    // check for next slide (sibling)
    if (current?.previousElementSibling) {
      current.previousElementSibling.classList.add('current');
      return;
    }
    // no next element
    this.renderer.addClass(
      this.slides.get(this.slides.length - 1)?.nativeElement,
      'current'
    );
  }
}
