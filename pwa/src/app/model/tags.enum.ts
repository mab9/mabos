export enum TagsEnum {
  EDUCATION = 'EDUCATION', // courses, books
  ENTERTAINMENT = 'ENTERTAINMENT', // streaming services, cinema, books, games
  GROCERIES = 'GROCERIES', // shopping, dining out, food, drinks
  HEALTH = 'HEALTH', // medications, doctor visits, gym membership
  HOUSING = 'HOUSING', // rent, mortgage, utilities,
  INSURANCE = 'INSURANCE', // health insurance, car, mobile
  MOBILITY = 'MOBILITY', // public transport, gas, vehicle maintenance
  OTHER = 'OTHER',
}

export const TagsEnumColors: { [key in TagsEnum]: string } = {
  [TagsEnum.HOUSING]: '#FFAB91', // Deep orange lighten-2
  [TagsEnum.GROCERIES]: '#FFD54F', // Amber lighten-2
  [TagsEnum.MOBILITY]: '#81C784', // Green lighten-2
  [TagsEnum.ENTERTAINMENT]: '#64B5F6', // Blue lighten-2
  [TagsEnum.HEALTH]: '#BA68C8', // Purple lighten-2
  [TagsEnum.EDUCATION]: '#4DB6AC', // Teal lighten-2
  [TagsEnum.INSURANCE]: '#FF8A65', // Deep orange lighten-3
  [TagsEnum.OTHER]: '#FFCC80', // Orange lighten-2
};
