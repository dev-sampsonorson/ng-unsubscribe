import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Unsubscribe } from '../unsubscribe.hoc';

@Component({
  selector: 'app-timer-ex',
  template: `
    <p>
      {{ counter }}
    </p>
  `,
  styles: [
  ]
})
@Unsubscribe(['counterSubscription'])
export class TimerExComponent implements OnInit, OnDestroy {

  counter: number = 0;
  private counterSubscription: Subscription | undefined;

  // private cdr: ChangeDetectorRef
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.counterSubscription = timer(0, 1000).pipe(
      tap(x => console.log('tap => ', x))
    ).subscribe(x => {
      this.counter = x;
    });
  }

  ngOnDestroy(): void {
    console.log('timer stopped at => ', this.counter);
  }
}
