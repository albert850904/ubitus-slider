import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

export interface ResponsiveItem {
  breakPoint: {
    width: number;
    items: number;
  };
}

@Component({
  selector: 'ubi-slider3',
  templateUrl: './slider3.component.html',
  styleUrls: ['./slider3.component.scss'],
})
export class Slider3Component implements OnInit, AfterViewInit {
  @ViewChild('thumbnailContainer') thumbnailContainer: ElementRef;
  @ViewChild('thumbnailControls') thumbnailControls: ElementRef;

  constructor(private renderer: Renderer2) {}

  thumbnailItem: HTMLCollection;
  thumbnailContainerWidth: number = 0;
  itemMargin: number = 30;
  items: number = 0;
  totalSlides: number = 0;
  jumpSlideWidth: number = 0;

  // item setup per slide
  responsive: ResponsiveItem[] = [
    { breakPoint: { width: 0, items: 1 } }, // width greater than 0, 1 item shown
    { breakPoint: { width: 600, items: 2 } }, // width greater than 600, 2 items shown
    { breakPoint: { width: 1000, items: 4 } }, // width greater than 1000, 4 items shown
  ];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.thumbnailItem = this.thumbnailContainer.nativeElement.children;
    this.thumbnailContainerWidth =
      this.thumbnailContainer.nativeElement.offsetWidth;

    this.loadItemAmount();
  }

  private loadItemAmount() {
    for (const point of this.responsive) {
      if (window.innerWidth > point.breakPoint.width) {
        this.items = point.breakPoint.items;
      }
    }

    this.loadItemSetStyle();
  }

  private controlSlides(event: any) {
    const ul = this.thumbnailControls.nativeElement.children;

    let currentActive = 0;

    for (const item of ul[0].children) {
      if (item.classList.contains('active')) {
        currentActive = +item.id;
        this.renderer.removeClass(item, 'active');
      }
    }

    this.renderer.addClass(event.target, 'active');

    let number = event.target.id - currentActive;
    this.jumpSlideWidth =
      this.jumpSlideWidth + this.thumbnailContainerWidth * number;

    this.renderer.setStyle(
      this.thumbnailContainer.nativeElement,
      'marginLeft',
      -this.jumpSlideWidth + 'px'
    );
  }

  private loadItemSetStyle() {
    let totalItemsWidth = 0;
    for (let i = 0; i < this.thumbnailItem.length; i++) {
      const widthPerItem = this.thumbnailContainerWidth / this.items;

      // set width per item
      this.renderer.setStyle(
        this.thumbnailItem[i],
        'width',
        widthPerItem - this.itemMargin + 'px'
      );

      // set item margin
      this.renderer.setStyle(
        this.thumbnailItem[i],
        'margin',
        this.itemMargin / 2 + 'px'
      );

      totalItemsWidth += widthPerItem;

      // add slides
      this.totalSlides++;
    }

    this.renderer.setStyle(
      this.thumbnailContainer.nativeElement,
      'width',
      totalItemsWidth + 'px'
    );

    // control tabs
    const tabs = Math.ceil(this.totalSlides / this.items);
    const ul = this.renderer.createElement('ul');
    for (let i = 1; i <= tabs; i++) {
      const li = this.renderer.createElement('li');
      this.renderer.setProperty(li, 'innerHTML', i);
      this.renderer.setProperty(li, 'id', i);
      this.renderer.listen(li, 'click', this.controlSlides.bind(this));
      ul.appendChild(li);
      if (i === 1) this.renderer.addClass(li, 'active');
    }

    this.renderer.appendChild(this.thumbnailControls.nativeElement, ul);
  }
}
