import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelExportService {
  constructor() {}

  /**
   * Exports data to Excel file
   * @param data - Array of objects to export
   * @param fileName - Name of the Excel file
   * @param sheetName - Name of the worksheet
   * @param headers - Custom headers for columns (optional)
   */
  exportToExcel(
    data: any[],
    fileName: string,
    sheetName: string = 'Sheet1',
    headers?: { [key: string]: string }
  ): void {
    try {
      if (!data || !data.length) {
        throw new Error('No data to export');
      }

      // Process data for Excel format
      const excelData = this.processDataForExcel(data, headers);
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);
      const workbook: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      XLSX.writeFile(workbook, `${fileName}.csv`);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      throw error;
    }
  }

  /**
   * Exports HTML table element to Excel
   * @param tableElement - HTML table element reference
   * @param fileName - Name of the Excel file
   * @param sheetName - Name of the worksheet
   */
  exportTableToExcel(
    tableElement: HTMLTableElement,
    fileName: string,
    sheetName: string = 'Sheet1'
  ): void {
    try {
      const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tableElement);
      const workbook: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      XLSX.writeFile(workbook, `${fileName}.csv`);
    } catch (error) {
      console.error('Error exporting table to Excel:', error);
      throw error;
    }
  }

  /**
   * Process data for Excel format, including custom headers
   * @param data - Raw data array
   * @param headers - Custom headers mapping
   * @returns Processed data ready for Excel export
   */
  private processDataForExcel(
    data: any[],
    headers?: { [key: string]: string }
  ): any[] {
    if (!headers) {
      return data;
    }

    return data.map(item => {
      const processedItem: any = {};
      Object.keys(headers).forEach(key => {
        processedItem[headers[key]] = item[key];
      });
      return processedItem;
    });
  }
}