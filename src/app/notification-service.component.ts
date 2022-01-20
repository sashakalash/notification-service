import { NotificationService } from './core/services/notification.service';
import { Observable, Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

export interface Notification {
  title: string
}
@Component({
  selector: 'notifications-component',
  templateUrl: './notification-service.component.html',
  styleUrls: ['./notification-service.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

  public notifications$: Observable<Notification>;
  private destroyed$ = new Subject();

  get date() {
    return new Date();
  }

  constructor(private notifService: NotificationService<Notification>) {}

  ngOnInit() {
    let count = 0;
    const int = setInterval(() => this.notifService.addToQueue({ title: `notification - ${++count}` }), 1000);
    setTimeout(() => clearInterval(int), 5000);
    this.notifications$ = this.notifService.notifications$.pipe(takeUntil(this.destroyed$));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
