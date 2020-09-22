const assert = require('assert');

const { scheduleOverlaps } = require('./');

// basic overlaps
assert(scheduleOverlaps({ minute: 11 }, new Date('2019-01-23T16:11:59Z')));
assert(!scheduleOverlaps({ minute: 11 }, new Date('2019-01-23T16:10:59.999Z')));
assert(scheduleOverlaps({ hour: 13 }, new Date('2020-07-06T13:23:45Z')));
assert(scheduleOverlaps({ dayOfWeek: 3 }, new Date('2020-09-23T13:23:45Z')));
assert(scheduleOverlaps({ dayOfMonth: 23 }, new Date('2020-09-23T13:23:45Z')));
assert(scheduleOverlaps(
  { minute: 11, hour: 11, dayOfMonth: 11, month: 10 },
  new Date('2018-11-11T11:11:00Z')
));

// overlaps with offset
assert(scheduleOverlaps({ hour: 3, minute: 14 }, new Date('2020-09-23T08:14:30Z'), 300));
