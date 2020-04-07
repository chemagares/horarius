import { Component } from '@angular/core';

@Component({
  selector: 'tv-guide-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  data = require('./data.json');

  channels: any = [];

  constructor() {
    this.increaseItems(2);
  }

  increaseItems(number: number) {
    this.data.map(item => {
      for (let i = 0; i < number; i++) {
        this.channels.push(item);
      }
    });
  }
}

// TBD THIS SHOULD BE CHECKED ON BACK END
//areDatesValid(start, end) {
//  const isSameYear = end.getFullYear() === start.getFullYear();
//  const isSameDay = end.getUTCDate() === start.getUTCDate();
//  const yearsAreValid =
//    isSameYear || end.getFullYear() > start.getFullYear();
//return !(
// !yearsAreValid ||
// (isSameYear && end.getUTCDate() < start.getUTCDate()) ||
//  (isSameDay && end.getHours() < start.getHours())
//);
//}
