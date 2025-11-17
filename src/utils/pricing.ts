import dayjs from "dayjs";
import { TZ } from "../config/env";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Pricing strategy:
 * - baseHourlyRate is currency per hour.
 * - We prorate by minute.
 * - Peak windows (Mon-Fri): 10:00-13:00 and 16:00-19:00 -> multiplier 1.5
 * - Off-peak -> multiplier 1.0
 *
 * This function computes price for the interval [start, end) in minutes.
 */

function isPeak(dt: dayjs.Dayjs) {
  const day = dt.day(); // 0 Sun - 6 Sat
  const hour = dt.hour();
  const minute = dt.minute();
  const minuteOfDay = hour * 60 + minute;

  // Peak windows in local TZ
  const morningStart = 10 * 60; // 10:00
  const morningEnd = 13 * 60; // 13:00
  const eveningStart = 16 * 60; // 16:00
  const eveningEnd = 19 * 60; // 19:00

  const isWeekday = day >= 1 && day <= 5;

  if (!isWeekday) return false;
  return (
    (minuteOfDay >= morningStart && minuteOfDay < morningEnd) ||
    (minuteOfDay >= eveningStart && minuteOfDay < eveningEnd)
  );
}

/**
 * Compute total price prorated by minute.
 * Uses minute loop — acceptable for booking durations <= 12 hours.
 */
export function computeTotalPrice(
  startISO: string | Date,
  endISO: string | Date,
  baseHourlyRate: number
): number {
  const tzStart = dayjs(startISO).tz(TZ);
  const tzEnd = dayjs(endISO).tz(TZ);

  let cursor = tzStart.clone();
  const perMinuteBase = baseHourlyRate / 60;
  let total = 0;

  // iterate by minute — safe for <= 12 hours (720 minutes).
  while (cursor.isBefore(tzEnd)) {
    const multiplier = isPeak(cursor) ? 1.5 : 1.0;
    total += perMinuteBase * multiplier;
    cursor = cursor.add(1, "minute");
  }

  // round to 2 decimals (currency)
  return Math.round(total * 100) / 100;
}
