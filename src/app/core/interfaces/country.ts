export interface ICountry {
  country_id: number;
  country_phone_code: string;
  country_iso_code: string;
  is_active: boolean;
  country_name: {
    language: string;
    name: string;
  }[];
}
