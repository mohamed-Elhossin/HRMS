export interface ICityName {
  language: string;
  name: string;
}

export interface ICity {
  city_id: number;
  country_id: number;
  is_active: boolean;
  city_name: ICityName[];
}
