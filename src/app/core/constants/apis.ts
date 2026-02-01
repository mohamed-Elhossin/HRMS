 


export const apisList = {
  auth: {
    login: '/api/users/login',
  },
  BasicData: {
    getCurrencies: '/api/BasicData/GetCurrencies',
    getCountries: '/api/BasicData/GetCountries',
    getCities: '/api/BasicData/GetCities',
    getCompanyPackages: '/api/BasicData/GetCompanyPackages',
  },

 Companies:{
    createCompany: '/api/companies',
    getCompanies: '/api/companies/getData',
    getDepartments: '/api/departments/getData',
    addAdminForCompany: '/api/users',
    getCompanyAdmins: '/api/users/getData',
 }
}
