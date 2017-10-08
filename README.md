# pull-tap

Sync and async side-effectful functions.

## example

``` js
const { pull, map, values, collect, } = require('pull-stream')
const { tap, asyncTap } = require('pull-tap')

pull(
  values([1, 2, 3]),
  map(x => x + 1),
  tap(x => console.log(x * 2)), // log some changed value, but return the source
  asyncTap(x => pull(           // do something async, but return the source value
    someAsyncTask(x),
    map(x => console.log(x)))), // log the async result value
  collect((err, arr) => console.log(arr)))

// => 4
// => 2
// => 6
// => 3
// => 8
// => 4
// => [2, 3, 4]
```
