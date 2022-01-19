import { QNodeInterface } from './qNode.interface';

export class QNode<T> implements QNodeInterface<T> {
  constructor(public value: T, public next?: QNode<T>) {}
}
