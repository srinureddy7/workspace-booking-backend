import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

import { TZ } from "../config/env";

export function toKolkata(d: Date | string) {
  return dayjs(d).tz(TZ);
}

/** parse ISO string -> dayjs in TZ */
export function parseISOToTZ(iso: string) {
  return dayjs(iso).tz(TZ);
}
