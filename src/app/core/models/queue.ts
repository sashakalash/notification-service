import { QNode } from './qNode';
import { QNodeInterface } from './qNode.interface';

export class Queue<T> {
  private head: QNodeInterface<T> | undefined;
  private tail: QNodeInterface<T> | undefined;

  constructor() {}

  private setNextTail(value: T, tail: QNodeInterface<T> | undefined): void {
    if (tail?.next) {
      this.setNextTail(value, tail.next);
    } else if (tail) {
      tail.next = new QNode(value);
    }
  }

  public pop(): T | undefined {
    let tempOut: QNodeInterface<T> | undefined = this.tail;
    if (this.head) {
      this.tail = this.tail?.next;
    }
    return tempOut?.value;
  }

  public insert(value: T): void {
    if (this.head && this.tail) {
      this.head = new QNode(value, this.head);
      this.setNextTail(value, this.tail);
    } else {
      this.head = new QNode(value);
      this.tail = new QNode(value);
    }
  }

  public clear(): void {
    this.head = undefined;
    this.tail = undefined;
  }

  public getHead() {
    return this.head;
  }

  public getTail() {
    return this.tail;
  }
}
