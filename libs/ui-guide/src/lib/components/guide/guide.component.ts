import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Channel } from '../../models/channel';

@Component({
  selector: 'tv-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css']
})
export class GuideComponent implements OnInit {
  /**
   * Hour to piexels equivalence.
   */
  @Input() set hourValue(value: number) {
    this._hourValue = value !== null && value !== undefined ? value : 400;
  }

  _hourValue: number;

  /**
   * Timeline starting hour.
   */
  @Input() set startHour(value: number) {
    this._startHour = value !== null && value !== undefined ? value : 5;
  }

  _startHour: number;

  /**
   * Timeline starting minute.
   */
  @Input() set startMinute(value: number) {
    this._startMinute = value !== null && value !== undefined ? value : 30;
  }

  _startMinute: number;

  /**
   * Channels data.
   */
  @Input() channels: Array<Channel>;

  /**
   * Channels enriched data.
   */
  public _channels: Array<Channel>;

  /**
   * Initial current time indicator position.
   */
  public currentTimeIndicator: number;

  /**
   * Horizontal scrollable area.
   */
  private _horizontalScrollableArea: number;

  /**
   * Vertical scrollable area.
   */
  private _verticalScrollableArea: number;

  /**
   * Current scroll position.
   */
  private _horizontalScrollPosition = 0;

  private _verticalScrollPosition = 0;

  @ViewChild('scheduleScrolling', { static: true })
  scheduleScrolling: ElementRef;
  @ViewChild('scheduleTimeBar', { static: true }) scheduleTimeBar: ElementRef;
  @ViewChild('currentTimeBar', { static: true }) currentTimeBar: ElementRef;
  @ViewChild('scheduleBody', { static: true }) scheduleBody: ElementRef;
  @ViewChild('channelsHeadersContainer', { static: true })
  channelsHeadersContainer: ElementRef;

  public times: Array<string>;
  constructor() {}

  private _getElementRectProperty(element: HTMLElement, property: string) {
    return Number(getComputedStyle(element)[property].replace('px', ''));
  }

  /**
   * Calculates real scrollable/draggable area.
   * This is calculated by substracting to the total space the space that we can see.
   */
  private _setHorizontalScrollableArea(): number {
    const total = 24 * this._hourValue;
    const visibleArea = this._getElementRectProperty(
      this.scheduleScrolling.nativeElement,
      'width'
    );

    return total - visibleArea;
  }

  /**
   * Calculates real scrollable/draggable area.
   * This is calculated by substracting to the total space the space that we can see.
   */
  private _setVerticalScrollableArea(): number {
    const visibleArea = this._getElementRectProperty(
      this.channelsHeadersContainer.nativeElement,
      'height'
    );
    console.log(this.channels.length * 86 - visibleArea);
    return this.channels.length * 86 - visibleArea;
  }

  private _calculateTimes(): Array<string> {
    return [
      '06:00h',
      '07:00h',
      '08:00h',
      '09:00h',
      '10:00h',
      '11:00h',
      '12:00h',
      '13:00h',
      '14:00h',
      '15:00h',
      '16:00h',
      '17:00h',
      '18:00h',
      '19:00h',
      '20:00h',
      '21:00h',
      '22:00h',
      '23:00h',
      '00:00h',
      '01:00h',
      '02:00h',
      '03:00h',
      '04:00h',
      '05:00h'
    ];
  }

  //TBD will be dragging instead of scroll
  _handleDragging(event: any) {
    event.preventDefault();
    const move = movement => {
      let endPosition = this._horizontalScrollPosition - movement;

      if (endPosition < 0) {
        endPosition = 0;
      }
      if (endPosition > this._horizontalScrollableArea) {
        endPosition = this._horizontalScrollableArea;
      }

      if (endPosition !== this._horizontalScrollPosition) {
        this._horizontalScrollPosition = endPosition;
        this._updateElementsScroll();
      }
    };
    const _handleMove = (e: any) => {
      move(e.movementX);
    };

    this.scheduleBody.nativeElement.addEventListener('mousemove', _handleMove);

    this.scheduleBody.nativeElement.addEventListener('mouseup', () => {
      this.scheduleBody.nativeElement.removeEventListener(
        'mousemove',
        _handleMove
      );
    });

    this.scheduleBody.nativeElement.addEventListener('mouseleave', () => {
      this.scheduleBody.nativeElement.removeEventListener(
        'mousemove',
        _handleMove
      );
    });
  }

  _handleScroll(e: any) {
    e.preventDefault();

    const move = e.deltaY > 0 ? -30 : 30;
    let endPos = this._verticalScrollPosition - move;

    if (endPos < 0) {
      endPos = 0;
    }

    if (endPos > this._verticalScrollableArea) {
      endPos = this._verticalScrollableArea;
    }
    console.log(this._verticalScrollPosition);
    if (endPos !== this._verticalScrollPosition) {
      this._verticalScrollPosition = endPos;
      this.channelsHeadersContainer.nativeElement.scrollTop = endPos;
      this.scheduleScrolling.nativeElement.scrollTop = endPos;
    }
  }

  /** */
  _updateElementsScroll() {
    this.scheduleScrolling.nativeElement.scrollLeft = this._horizontalScrollPosition;

    this.scheduleTimeBar.nativeElement.scrollLeft = this._horizontalScrollPosition;
    this.currentTimeBar.nativeElement.style.left =
      this.currentTimeIndicator - this._horizontalScrollPosition + 'px';
  }

  calculateSize(start: Date, end: Date): number {
    const minuteInPixels: number = this._hourValue / 60;

    let hours: number;
    let minutes = 0;
    if (end.getHours() >= start.getHours()) {
      hours = end.getHours() - start.getHours();
    } else {
      hours = 24 - start.getHours() + end.getHours();
    }

    minutes += 60 - start.getMinutes() + end.getMinutes();
    hours -= 1;
    minutes = minutes + hours * 60;
    return minutes * minuteInPixels;

    //const isSameDay: boolean = end.getUTCDate() === start.getUTCDate();

    // TBD CHECK THIS
    //if (
    //  isSameDay &&
    ////  end.getHours() === start.getHours() &&
    //  end.getMinutes() === start.getMinutes()
    //) {
    //        return 0;
    //}
  }

  // TBD
  calculateInitialScrollPos(): void {
    const width = this._hourValue * 24 - this._horizontalScrollableArea;
    if (width < this.currentTimeIndicator) {
      this._horizontalScrollPosition = this.currentTimeIndicator - width;
    }
  }

  /**
   * Sets current time indicator position.
   */
  _setIndicatorPosition(): number {
    const time = new Date();
    const minValueInPx = this._hourValue / 60;
    const currentTimeInPx =
      (time.getMinutes() + time.getHours() * 60) * minValueInPx;

    const valueToSubstract =
      (this._startHour * 60 + this._startMinute) * minValueInPx;

    return currentTimeInPx - valueToSubstract;
  }

  /**
   * Calculates event absolute position based on start date and hour-to-px equivalency.
   * @param start Event start moment.
   */
  calculateEventPosition(start: Date): number {
    const minutesStartTime = this._startHour * 60 + this._startMinute;
    const minutesEventStart = start.getHours() * 60 + start.getMinutes();

    const pxToStartTime = minutesStartTime * (this._hourValue / 60);
    const pxToEventStart = minutesEventStart * (this._hourValue / 60);

    if (minutesEventStart - minutesStartTime >= 0) {
      return pxToEventStart - pxToStartTime;
    } else {
      return this._hourValue * 24 - pxToStartTime + pxToEventStart;
    }
  }

  /**
   * Formats name to fit into event space.
   *
   * @param name Event name.
   * @param eventSize Event size in px.
   */
  formatEventName(name: string, eventSize: number): string {
    let cutBy = Math.round((eventSize - 20) / 10);
    if (cutBy <= 1) {
      cutBy = 2;
    }
    if (cutBy <= name.length) {
      let cutName = name.substring(0, cutBy);
      const splitted = cutName.split('');

      if (splitted[splitted.length] === ' ') {
        cutName = cutName.substring(0, cutName.length - 1);
      }
      return name.substring(0, cutBy) + '...';
    } else {
      return name;
    }
  }

  /**
   * Formats events start info.
   * @param date Event start moment.
   */
  formatStartHour(date: Date): string {
    let hour = date.getHours().toString();
    let minute = date.getMinutes().toString();

    hour = hour.length === 1 ? `0${hour}` : hour;
    minute = minute.length === 1 ? `0${minute}` : minute;
    return `${hour}:${minute}h`;
  }

  /**
   * Adds new properties to channels events like size and formatted start date and name.
   * @param channels Channels.
   */
  private _formatChannelData(channels: Array<Channel>) {
    return channels.map(channel => {
      return {
        ...channel,
        items: channel.items.map(event => {
          const startDate = new Date(event.start);
          const endDate = new Date(event.end);

          const size: number = this.calculateSize(startDate, endDate);
          const startHour = this.formatStartHour(startDate);
          const formatedName = this.formatEventName(event.title, size);

          return {
            ...event,
            startHour,
            size,
            formatedName,
            position: this.calculateEventPosition(startDate)
          };
        })
      };
    });
  }

  onResize() {
    this._initialConfig();
  }

  private _initialConfig() {
    this.times = this._calculateTimes();
    this._horizontalScrollableArea = this._setHorizontalScrollableArea();
    this._verticalScrollableArea = this._setVerticalScrollableArea();
    this.currentTimeIndicator = this._setIndicatorPosition();
  }

  ngOnInit() {
    if (this.channels !== null && this.channels !== undefined) {
      this._channels = this._formatChannelData(this.channels);

      this._initialConfig();
    }
  }
}
