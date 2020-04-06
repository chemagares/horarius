import { Component } from '@angular/core';

@Component({
  selector: 'tv-guide-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  channels = require('./data.json');

  constructor() {}
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
