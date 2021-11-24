import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <div>
          <app-timer-ex *ngIf="alive"></app-timer-ex>
      </div>
      <button (click)="destroy()">Destroy</button>
      <button (click)="revive()">Revive</button>
  `,
  styles: []
})
export class AppComponent {
  alive: boolean = true;

  destroy() {
    this.alive = false;
  }

  revive() {
    this.alive = true;
  }
}
