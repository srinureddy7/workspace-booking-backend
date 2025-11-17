"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toKolkata = toKolkata;
exports.parseISOToTZ = parseISOToTZ;
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
const env_1 = require("../config/env");
function toKolkata(d) {
    return (0, dayjs_1.default)(d).tz(env_1.TZ);
}
/** parse ISO string -> dayjs in TZ */
function parseISOToTZ(iso) {
    return (0, dayjs_1.default)(iso).tz(env_1.TZ);
}
