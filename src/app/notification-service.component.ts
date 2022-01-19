import { NotificationService } from './core/services/notification.service';
import { Observable } from 'rxjs';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';

export class Notification {
  constructor(public title: string) {}
}

@Component({
  selector: 'notifications-component',
  templateUrl: './notification-service.component.html',
  styleUrls: ['./notification-service.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input() optionNotifTemplate: TemplateRef<any>;
  @Input() notifications$: Observable<Notification[]>;

  get date() {
    return new Date();
  }

  constructor(private notifService: NotificationService<Notification>) {}

  ngOnInit() {
    let count = 0;
    const int = setInterval(() => this.notifService.addToQueue({ title: `notification - ${++count}` }), 1000);
    setTimeout(() => clearInterval(int), 3000);
  }
}
