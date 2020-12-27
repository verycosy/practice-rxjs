import { timer, interval, fromEvent, noop, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { Todo } from './todo';
import { createHttpObservable } from './util';

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
  const http$: Observable<Todo[]> = createHttpObservable(
    'https://jsonplaceholder.typicode.com/todos'
  );

  const todos$ = http$.pipe(
    tap(() => {
      console.log('HTTP Request executed');
    }),
    shareReplay()
  );

  const progress$ = todos$.pipe(
    map((todos) => todos.filter((todo) => todo.completed === false))
  );

  const done$ = todos$.pipe(
    map((todos) => todos.filter((todo) => todo.completed === true))
  );

  progress$.subscribe(
    (data) => console.log(data),
    noop, // NOTE: No operation
    () => {
      console.log('Progress completed');
    }
  );

  done$.subscribe(
    (data) => console.log(data),
    noop,
    () => {
      console.log('Done completed');
    }
  );
}

init();
