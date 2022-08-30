import { BehaviorSubject, Observable, distinctUntilChanged, map } from 'rxjs';

import { IState } from './types';

const state: IState = {
  user: undefined,
};

export class Store {
  private subject = new BehaviorSubject<IState>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  get<R>(name: string): Observable<R> {
    return this.store.pipe(map((x) => x[name] as R));
  }

  set(name: string, value: unknown) {
    this.subject.next({ ...this.value, [name]: value });
  }
}
