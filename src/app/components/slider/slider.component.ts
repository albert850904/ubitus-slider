import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ubi-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  @Input() sources: any[] = [];

  constructor() {}

  ngOnInit(): void {}
}
