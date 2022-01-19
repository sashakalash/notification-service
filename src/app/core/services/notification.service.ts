import { Inject, Injectable } from '@angular/core';
import { from, Observable, ReplaySubject, timer, interval, of } from 'rxjs';
import { concatAll, delay, map, switchMap, tap, toArray } from 'rxjs/operators';
import { NOTIFICATIONS_INTERVAL_VALUE } from 'src/app.config';
import { IterableQueue } from '../models/iterableQueue';
import { Queue } from '../models/queue';

@Injectable()
export class NotificationService<T> {
  private queue: Queue<T>;
  private queueSubject: ReplaySubject<Queue<T>>;
  public queueStream$: Observable<IterableQueue<T>>;

  constructor(@Inject(NOTIFICATIONS_INTERVAL_VALUE) private intervalValue: number = 2) {
    this.queue = new Queue<T>();
    this.queueSubject = new ReplaySubject<Queue<T>>();
    this.queueStream$ = this.queueSubject.asObservable()
      .pipe(
        map((q: Queue<T>) => new IterableQueue(q)),
        tap((v: IterableQueue<T>) => {
          for (let i of v) {
            of(i).pipe(delay(intervalValue * 1000)).subscribe(v => console.log(v))
          }
          return v;
        }),
        // concatAll()
        // interval(intervalValue)
      );
    this.queueStream$.subscribe()
  }

  public addToQueue(value: T): void {
    this.queue.insert(value);
    this.queueSubject.next(this.queue);
  }

  public getLastItem(): T | undefined {
    return this.queue.pop();
  }

  public getQueue(): Queue<T> {
    return this.queue;
  }

  public clearQueue(): void {
    this.queue.clear();
  }

}
