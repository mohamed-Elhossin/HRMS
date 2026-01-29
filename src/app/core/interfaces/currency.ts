export interface ICurrencyName {
  language: string;
  name: string;
  abbr: string;
}

export interface ICurrency {
  currency_id: number;
  is_active: boolean;
  currency_name: ICurrencyName[];
}
