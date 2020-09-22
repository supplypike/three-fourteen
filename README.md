# Three-Fourteen

Three-Fourteen is a simple in-memory function scheduler.

```js
const { initialize } = require('three-fourteen');
initialize([
  { action: () => console.log('Runs every minute') },
  {
    action: () => console.log('Runs on the 15th minute of every hour'),
    schedule: { minute: 15 }
  },
  {
    action: () => console.log('Runs at 3:14 every night'),
    schedule: { hour: 3, minute: 14 }
  },
  {
    action: () => console.log('Runs on the first minute of July'),
    schedule: { month: 5 }
  }
]);
```

Check the index.d.ts for more typing stuff.
