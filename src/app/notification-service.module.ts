import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NOTIFICATIONS_INTERVAL_VALUE } from 'src/app.config';
import { environment } from 'src/environments/environment';
import { NotificationService } from './core/services/notification.service';
import { NotificationComponent } from './notification-service.component';

@NgModule({
  declarations: [
    NotificationComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [NotificationComponent],
  providers: [
    NotificationService,
    { provide: NOTIFICATIONS_INTERVAL_VALUE, useValue: environment.default.notificationIntervalValue }],
  bootstrap: [NotificationComponent]
})
export class NotificationServiceModule { }
