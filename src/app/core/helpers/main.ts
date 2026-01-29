export const globalSearch = (event: any, data: any[], searchFields: string[]): any[] => {
  const keyword = String(event.target.value)?.trim().toLowerCase();
  if (!keyword) return data;

  return data.filter((item) => {
    const combinedSearchFields = searchFields
      .map((field) => {
        return getFieldValue(item, field)?.toString()?.toLowerCase();
      })
      .filter(Boolean)
      .join(' ');
    return combinedSearchFields?.includes(keyword);
  });

}

export const getFieldValue = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : null), obj);
}

export const convertDateToInputDate = (date: any): any => {
  return date ? new Date(date).toISOString().split('T')[0] : null;
}

export const getSARDefault = (currencies: any[]): any => {
  return currencies?.find((currency: any) => currency?.currencyAbbr === 'SAR');
}
