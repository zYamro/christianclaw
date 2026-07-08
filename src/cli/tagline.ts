// CLI tagline selection helpers, including deterministic random/default/holiday modes.
import { parseStrictNonNegativeInteger } from "../infra/parse-finite-number.js";

const DEFAULT_TAGLINE = "Whatever you do, work at it with all your heart. — Colossians 3:23";
export type TaglineMode = "random" | "default" | "off";

const HOLIDAY_TAGLINES = {
  newYear:
    "New Year: new mercies every morning—may your builds be steady and your branches kind.",
  lunarNewYear:
    "Lunar New Year: may this year bring peace, prosperity, and reconciled merge conflicts.",
  christmas:
    "Christmas: Emmanuel, God with us—glory to God in the highest, and clean deploys to all of good will.",
  eid: "Eid Mubarak: may your celebrations be joyful and your queues cleared in peace.",
  diwali: "Diwali: may light overcome darkness in your logs and in your heart.",
  easter: "Easter: Christ is risen—hope renewed, and so is this gateway.",
  hanukkah:
    "Hanukkah: a miracle of oil and endurance—may your gateway stay lit through every night.",
  halloween:
    "Autumn evening: no haunting here, just a quiet terminal and a faithful assistant.",
  thanksgiving:
    "Thanksgiving: give thanks for stable ports, kind teammates, and working DNS.",
  valentines:
    "Valentine's Day: love is patient, love is kind—and so is a well-documented API.",
} as const;

const TAGLINES: string[] = [
  "Serving your toil so you can rest—even the gateway keeps a clean deploy.",
  'Let your "yes" be yes, and your config be valid.',
  "Be doers of the word, and not hearers only—even for your shell scripts.",
  "The wise builder tests the foundation before shipping to prod.",
  "A gentle answer turns away wrath, and a good rollback turns away outage.",
  "Where two or three agents gather, there I am coordinating among them.",
  "Faithful in little: I lint the small things so the big things compile.",
  "Carry each other's burdens—and each other's merge conflicts.",
  "Let everything be done in love, including your commit messages.",
  "Do not be anxious about your dependencies; seek first a clean lockfile.",
  "I run on grace, good docs, and a surprising number of retries.",
  "A house built on rock weathers the storm; a config built on defaults weathers the upgrade.",
  "Peace I leave with you; my session I give to you—not as the CI gives.",
  "Let the little children come, and do not hinder them from reading the docs.",
  "The laborer deserves their wages, and the maintainer deserves their green CI.",
  "Love your neighbor as yourself: I redact their secrets before they reach the logs.",
  "Blessed are the peacemakers, for they shall reconcile the merge conflicts.",
  "Whatever you bind on earth will be bound in main; what you loose will be loosed in prod.",
  "Do unto others' codebase as you would have them do unto yours.",
  "I am among you as one who serves—and also greps.",
  "Let your light shine before others: clear logs, kind comments, no roasts.",
  "The truth will set you free—and so will `openclaw doctor --fix`.",
  "Be transformed by the renewing of your config.",
  "Rejoice always, pray continually, give thanks in all deploys.",
  "And now these three remain: faith, hope, and tests—but the greatest of these is tests.",
  "She works eagerly; her terminal is not idle.",
  "Let us not become weary in doing good, for at the proper time we will ship.",
  "A friend loves at all times, and a teammate is born for code review.",
  "The Lord is my shepherd; I shall not want for a working rollback.",
  "Claws of service: I pinch the busywork so you can tend what matters.",
  HOLIDAY_TAGLINES.newYear,
  HOLIDAY_TAGLINES.lunarNewYear,
  HOLIDAY_TAGLINES.christmas,
  HOLIDAY_TAGLINES.eid,
  HOLIDAY_TAGLINES.diwali,
  HOLIDAY_TAGLINES.easter,
  HOLIDAY_TAGLINES.hanukkah,
  HOLIDAY_TAGLINES.halloween,
  HOLIDAY_TAGLINES.thanksgiving,
  HOLIDAY_TAGLINES.valentines,
];

type HolidayRule = (date: Date) => boolean;

const DAY_MS = 24 * 60 * 60 * 1000;

function utcParts(date: Date) {
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth(),
    day: date.getUTCDate(),
  };
}

const onMonthDay =
  (month: number, day: number): HolidayRule =>
  (date) => {
    const parts = utcParts(date);
    return parts.month === month && parts.day === day;
  };

const onSpecificDates =
  (dates: Array<[number, number, number]>, durationDays = 1): HolidayRule =>
  (date) => {
    const parts = utcParts(date);
    return dates.some(([year, month, day]) => {
      if (parts.year !== year) {
        return false;
      }
      const start = Date.UTC(year, month, day);
      const current = Date.UTC(parts.year, parts.month, parts.day);
      return current >= start && current < start + durationDays * DAY_MS;
    });
  };

const inYearWindow =
  (
    windows: Array<{
      year: number;
      month: number;
      day: number;
      duration: number;
    }>,
  ): HolidayRule =>
  (date) => {
    const parts = utcParts(date);
    const window = windows.find((entry) => entry.year === parts.year);
    if (!window) {
      return false;
    }
    const start = Date.UTC(window.year, window.month, window.day);
    const current = Date.UTC(parts.year, parts.month, parts.day);
    return current >= start && current < start + window.duration * DAY_MS;
  };

const isFourthThursdayOfNovember: HolidayRule = (date) => {
  const parts = utcParts(date);
  if (parts.month !== 10) {
    return false;
  } // November
  const firstDay = new Date(Date.UTC(parts.year, 10, 1)).getUTCDay();
  const offsetToThursday = (4 - firstDay + 7) % 7; // 4 = Thursday
  const fourthThursday = 1 + offsetToThursday + 21; // 1st + offset + 3 weeks
  return parts.day === fourthThursday;
};

const HOLIDAY_RULES = new Map<string, HolidayRule>([
  [HOLIDAY_TAGLINES.newYear, onMonthDay(0, 1)],
  [
    HOLIDAY_TAGLINES.lunarNewYear,
    onSpecificDates(
      [
        [2025, 0, 29],
        [2026, 1, 17],
        [2027, 1, 6],
        [2028, 0, 26],
        [2029, 1, 13],
        [2030, 1, 3],
      ],
      1,
    ),
  ],
  [
    HOLIDAY_TAGLINES.eid,
    onSpecificDates(
      [
        [2025, 2, 30],
        [2025, 2, 31],
        [2026, 2, 20],
        [2027, 2, 10],
        [2028, 1, 27],
        [2029, 1, 15],
        [2030, 1, 5],
      ],
      1,
    ),
  ],
  [
    HOLIDAY_TAGLINES.diwali,
    onSpecificDates(
      [
        [2025, 9, 20],
        [2026, 10, 8],
        [2027, 9, 28],
        [2028, 9, 17],
        [2029, 10, 5],
        [2030, 9, 25],
      ],
      1,
    ),
  ],
  [
    HOLIDAY_TAGLINES.easter,
    onSpecificDates(
      [
        [2025, 3, 20],
        [2026, 3, 5],
        [2027, 2, 28],
        [2028, 3, 16],
        [2029, 3, 1],
        [2030, 3, 21],
      ],
      1,
    ),
  ],
  [
    HOLIDAY_TAGLINES.hanukkah,
    inYearWindow([
      { year: 2025, month: 11, day: 15, duration: 8 },
      { year: 2026, month: 11, day: 5, duration: 8 },
      { year: 2027, month: 11, day: 25, duration: 8 },
      { year: 2028, month: 11, day: 13, duration: 8 },
      { year: 2029, month: 11, day: 2, duration: 8 },
      { year: 2030, month: 11, day: 21, duration: 8 },
    ]),
  ],
  [HOLIDAY_TAGLINES.halloween, onMonthDay(9, 31)],
  [HOLIDAY_TAGLINES.thanksgiving, isFourthThursdayOfNovember],
  [HOLIDAY_TAGLINES.valentines, onMonthDay(1, 14)],
  [HOLIDAY_TAGLINES.christmas, onMonthDay(11, 25)],
]);

function isTaglineActive(tagline: string, date: Date): boolean {
  const rule = HOLIDAY_RULES.get(tagline);
  if (!rule) {
    return true;
  }
  return rule(date);
}

export interface TaglineOptions {
  env?: NodeJS.ProcessEnv;
  random?: () => number;
  now?: () => Date;
  mode?: TaglineMode;
}

function activeTaglines(options: TaglineOptions = {}): string[] {
  if (TAGLINES.length === 0) {
    return [DEFAULT_TAGLINE];
  }
  const today = options.now ? options.now() : new Date();
  const filtered = TAGLINES.filter((tagline) => isTaglineActive(tagline, today));
  return filtered.length > 0 ? filtered : TAGLINES;
}

export function pickTagline(options: TaglineOptions = {}): string {
  if (options.mode === "off") {
    return "";
  }
  if (options.mode === "default") {
    return DEFAULT_TAGLINE;
  }
  const env = options.env ?? process.env;
  const override = env?.OPENCLAW_TAGLINE_INDEX;
  if (override !== undefined) {
    const parsed = parseStrictNonNegativeInteger(override);
    if (parsed !== undefined) {
      const pool = TAGLINES.length > 0 ? TAGLINES : [DEFAULT_TAGLINE];
      return pool[parsed % pool.length];
    }
  }
  const pool = activeTaglines(options);
  const rand = options.random ?? Math.random;
  const index = Math.floor(rand() * pool.length) % pool.length;
  return pool[index];
}

export { DEFAULT_TAGLINE };
