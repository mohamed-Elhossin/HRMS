export interface IPackageName {
  language: string;
  name: string;
}

export interface IPackage {
  company_package_id: number;
  is_active: boolean;
  company_package_name: IPackageName[];
}
