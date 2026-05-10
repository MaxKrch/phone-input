export const countries = [
    {
      key: 'ru',
      name: 'Россия',
      emoji: '🇷🇺',
      prefix: '+7',
      mask: '(***) ***-**-**',
      digits: 10,
    },
    {
      key: 'kz',
      name: 'Казахстан',
      emoji: '🇰🇿',
      prefix: '+7',
      mask: '(***) ***-**-**',
      digits: 10,
    },
    {
      key: 'us',
      name: 'США',
      emoji: '🇺🇸',
      prefix: '+1',
      mask: '(***) ***-****',
      digits: 10,
    },
    {
      key: 'de',
      name: 'Германия',
      emoji: '🇩🇪',
      prefix: '+49',
      mask: '**** *** ****',
      digits: 11,
    },
    {
      key: 'fr',
      name: 'Франция',
      emoji: '🇫🇷',
      prefix: '+33',
      mask: '* ** ** ** **',
      digits: 9,
    },
    {
      key: 'gb',
      name: 'Великобритания',
      emoji: '🇬🇧',
      prefix: '+44',
      mask: '**** *** ***',
      digits: 10,
    },
    {
      key: 'jp',
      name: 'Япония',
      emoji: '🇯🇵',
      prefix: '+81',
      mask: '**-****-****',
      digits: 10,
    },
    {
      key: 'cn',
      name: 'Китай',
      emoji: '🇨🇳',
      prefix: '+86',
      mask: '*** **** ****',
      digits: 11,
    },
  ] as const;

export type Country = typeof countries[number];
export type CountryKey = Country['key'];

export const MASK_DIGIT_ALIAS = '*';
export const DEFAULT_COUNTRY_KEY: CountryKey = 'ru';
export const DEFAULT_COUNTRY: Country = countries.find((country) => country.key === DEFAULT_COUNTRY_KEY) ?? countries[0];