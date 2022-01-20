import { Inject, Injectable } from '@angular/core';
import { from, Observable, ReplaySubject, of, EMPTY } from 'rxjs';
import { concatAll, delay, endWith, map, switchMap } from 'rxjs/operators';
import { NOTIFICATIONS_INTERVAL_VALUE } from 'src/app.config';
import { IterableQueue } from '../models/iterableQueue';
import { Queue } from '../models/queue';

function* queueIterator(list: IterableQueue<any>) {
  for (let item of list) {
    yield item;
  }
}

@Injectable()
export class NotificationService<T> {
  private queue: Queue<T>;
  private queueSubject: ReplaySubject<Queue<T>>;
  public notifications$: Observable<any>;
  private readonly MILLISECONDS_VALUE: number = 1000;

  constructor(@Inject(NOTIFICATIONS_INTERVAL_VALUE) private readonly intervalValue: number) {
    this.queue = new Queue<T>();
    this.queueSubject = new ReplaySubject<Queue<T>>();
    this.notifications$ = this.queueSubject.asObservable()
      .pipe(
        switchMap((q: Queue<T>) => from(queueIterator(new IterableQueue(q)))),
        map((value: T[]) => of(value).pipe(delay(intervalValue * this.MILLISECONDS_VALUE))),
        endWith(EMPTY),
        concatAll(),
      );
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
