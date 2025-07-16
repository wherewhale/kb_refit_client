export const ColorPalette = {
  /** Brand */
  'kb-yellow-pos': '#FFBC00',
  'kb-yellow-neg': '#FFCC02',
  'kb-gold-1': '#8D744A',
  'kb-silver-1': '#84888A',
  'kb-dark-gray': '#545045',
  'kb-gray': '#60584D',

  /** Sub */
  'green-1': '#DEF6ED',
  'purple-1': '#EEE3FF',
  'blue-1': '#DCF4FE',
  'yellow-1': '#FFF3CA',
  'red-1': '#FFE7E7',
  'green-2': '#72C2A8',
  'red-2': '#FC2E6C',
  'blue-2': '#1C60FF',

  /** Gray Scale */
  black: '#000000',
  'gray-1': '#454F5D',
  'gray-2': '#838A9A',
  'gray-3': '#D9D9D9',
  'gray-4': '#EAEDEF',
  'gray-5': '#F5F6F7',
  white: '#FFFFFF',
} as const;

export type ColorPalette = keyof typeof ColorPalette;
