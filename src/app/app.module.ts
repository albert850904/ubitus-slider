import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SliderComponent } from './components/slider/slider.component';
import { Slider2Component } from './components/slider2/slider2.component';
import { Slider3Component } from './components/slider3/slider3.component';

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    Slider2Component,
    Slider3Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
