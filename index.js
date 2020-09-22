function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function scheduleOverlaps(schedule, baseDate, offset) {
  const date = new Date(baseDate);
  if (offset) {
    date.setUTCMinutes(date.getUTCMinutes() - offset);
  }

  const mapping = {
    minute: date.getUTCMinutes(),
    hour: date.getUTCHours(),
    dayOfWeek: date.getUTCDay(),
    dayOfMonth: date.getUTCDate(),
    month: date.getUTCMonth(),
    year: date.getUTCFullYear(),
  };

  for (const key in mapping) {
    if (key in schedule && schedule[key] !== mapping[key]) {
      return false;
    }
  }
  
  return true;
}

function initialize(entries, getOffset) {
  let lastChecked = new Date();
  let lastOffset = getOffset ? getOffset(lastChecked) : 0;

  function checkEntries() {
    const currentDate = new Date();
    const currentOffset = getOffset ? getOffset(currentDate) : 0;

    for (const entry of entries) {
      if (!entry.schedule) {
        entry.action(currentDate);
      } else {
        const overlappedThen = scheduleOverlaps(entry.schedule, lastChecked, lastOffset);
        const overlapsNow = scheduleOverlaps(entry.schedule, currentDate, currentOffset);
        if (!overlappedThen && overlapsNow) {
          entry.action(currentDate);
        }
      }
    }

    lastChecked = currentDate;
    lastOffset = currentOffset;

    scheduleCheckEntries();
  }

  function scheduleCheckEntries() {
    const currentDate = new Date();
    const nextDate = new Date(currentDate);
    nextDate.setUTCMinutes(nextDate.getUTCMinutes() + 1);
    nextDate.setUTCSeconds(0);
    nextDate.setUTCMilliseconds(0);
    setTimeout(checkEntries, nextDate - currentDate);
  }

  scheduleCheckEntries();
}

module.exports = { scheduleOverlaps, initialize };
