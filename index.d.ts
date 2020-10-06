interface Entry {
  action: (date: Date) => any;
  schedule?: {
    minute?: number;
    hour?: number;
    dayOfWeek?: number; // 0 indexed because js
    dayOfMonth?: number;
    month?: number; // 0 indexed because js
    year?: number;
  };
}

export function initialize(paramEntries: Entry[], getOffset?: (date: Date) => number): void;
