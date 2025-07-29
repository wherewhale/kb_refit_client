export const WALLET_THEMES = [
  "SaintLaurant",
  "Chanel",
  "Gucci",
  "Miumiu",
  "Prada",
  "Hermes",
  "Dior",
  "Coach",
  "Balenciaga",
  "Cartier",
  "Louisvuitton",
  "Nike",
  "Adidas",
  "Celine",
  "Burberry",
  "Fendi",
] as const;

export type WalletTheme = (typeof WALLET_THEMES)[number];
