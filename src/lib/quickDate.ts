import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subYears,
} from "date-fns";

const today = new Date();

export const quickDate = {
  오늘: { from: startOfDay(today), to: endOfDay(today) }, // 시작한 날짜 ~ 하루종일
  어제: {
    from: startOfDay(subDays(today, 1)),
    to: endOfDay(subDays(today, 1)),
  },
  이번주: {
    from: startOfWeek(today, { weekStartsOn: 1 }), // weekStartsOn:0 주어진 날짜의 해당 주의 첫째 날을 반환
    to: endOfWeek(today, { weekStartsOn: 1 }), // 주어진 날짜의 해당 주의 마지막 날을 반환
  },
  지난주: {
    from: startOfWeek(subDays(today, 7), { weekStartsOn: 1 }), // 현재 날짜 기준 7일전 날짜 가져옴
    to: endOfWeek(subDays(today, 7), { weekStartsOn: 1 }),
  },
  이번달: { from: startOfMonth(today), to: endOfMonth(today) },
  지난달: {
    from: startOfMonth(subMonths(today, 1)),
    to: endOfMonth(subMonths(today, 1)),
  },
  올해: {
    from: startOfYear(today),
    to: endOfYear(today),
  },
  지난해: {
    from: startOfYear(subYears(today, 1)),
    to: endOfYear(subYears(today, 1)),
  },
};
