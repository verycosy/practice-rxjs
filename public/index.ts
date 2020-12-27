import { timer, interval, fromEvent, Observable, noop } from 'rxjs';

function timers(): void {
  const interval$ = interval(1000); // NOTE: Definition
  const timer$ = timer(3000, 500);
  const click$ = fromEvent(document, 'click');

  const sub_interval = interval$.subscribe(
    // NOTE: Instance
    (val) => {
      console.log('Interval' + val);
    },
    (err) => console.error(err),
    () => {
      console.log('completion');
    }
  );

  const sub_timer = timer$.subscribe((val) => {
    console.log('Timer ' + val);
  });

  setTimeout(() => sub_timer.unsubscribe(), 5000);

  const sub_click = click$.subscribe((evt) => {
    console.log(evt);
  });
}

function init(): void {
  /// NOTE: Follow Observable Contract
  const http$ = new Observable((subscriber) => {
    // or observer
    fetch('https://jsonplaceholder.typicode.com/todos')
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

  http$.subscribe(
    (data) => console.log(data),
    noop, // NOTE: No operation
    () => {
      console.log('completed');
    }
  );
}

init();
