export interface QNodeInterface<T> {
  value: T,
  next?: QNodeInterface<T>
}
