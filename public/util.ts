import { Observable } from 'rxjs';

export function createHttpObservable(url: string): Observable<any> {
  /// NOTE: Follow Observable Contract

  return new Observable((subscriber) => {
    // or observer
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((body) => {
        subscriber.next(body);
        subscriber.complete();
      })
      .catch((err) => {
        subscriber.error(err);
      });
  });
}
