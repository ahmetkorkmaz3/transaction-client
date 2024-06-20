export const DATE_FILTER = {
  ALL: 'all',
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  LAST_7_DAYS: 'last_7_days',
  LAST_30_DAYS: 'last_30_days',
  LAST_1_YEARS: 'last_1_years',
}

export const DATE_FILTER_OPTIONS = [
  { value: DATE_FILTER.ALL, label: 'Tümü' },
  { value: DATE_FILTER.TODAY, label: 'Bugün' },
  { value: DATE_FILTER.YESTERDAY, label: 'Dün' },
  { value: DATE_FILTER.LAST_7_DAYS, label: 'Son 7 Gün' },
  { value: DATE_FILTER.LAST_30_DAYS, label: 'Son 30 Gün' },
  { value: DATE_FILTER.LAST_1_YEARS, label: 'Son 1 Yıl' },
];

export const TYPE_FILTER_OPTIONS = [
  { key: "spending", cat: "Harcama" },
  { key: "charge", cat: "Charge" },
  { key: "point", cat: "Puan Kullanımı" },
  { key: "withdrawal", cat: "withdrawal" },
]
