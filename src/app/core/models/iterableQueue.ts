import { Queue } from './queue';
import { QueueIterator } from './queueIterator';

export class IterableQueue<T> implements Iterable<T> {

  constructor(private queue: Queue<T>) {}

  public [Symbol.iterator](): QueueIterator<T> {
    return new QueueIterator(this.queue);
  }
}
