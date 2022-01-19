import { Queue } from './queue';

export class QueueIterator<T> implements Iterator<T> {
  private item: T | undefined;
  private done: boolean;

  constructor(private queue: Queue<T>) {
    this.item = queue.pop();
    this.done = false;
  }

  next(): IteratorResult<T, T | undefined> {
    if (this.done) {
      return {
        done: this.done,
        value: undefined
      }
    }
    if (!this.item) {
      this.done = true;
      return {
        done: this.done,
        value: this.item
      }
    }
    const value = this.item;
    this.item = this.queue.pop();
    return {
      done: false,
      value
    }
  }
}
