import { keys } from 'lodash-es';
import * as Xlsx from 'xlsx';
import { dealJsonArray } from '.';

const excel2Json = (file: File, projectName: string, callback: (data: any)=>void) => {
  const reader = new FileReader();
  
  reader.onload = (event) => {
    try {
      const { result } = event.target!;
      const workbook = Xlsx.read(result, {type: 'binary'});
      let data: any[] = [];
      for ( const sheet in workbook.Sheets ) {
        if (workbook.Sheets.hasOwnProperty(sheet)) {
          data = data.concat(Xlsx.utils.sheet_to_json(workbook.Sheets[sheet]));
          const jsonData = dealJsonArray(data)
          callback(writeJson(jsonData, projectName))
          break;
        }
      }
    } catch (error) {
      console.log('文件类型不正确')
      return;
    }
  }

  reader.readAsBinaryString(file);
}

const writeJson = (data: any, fileName: string) => {
  let keyArr = keys(data);
  let result: any[] = [];
  keyArr.forEach(key => {
    const jsonName = `${fileName}.${key}`;
    console.log(result)
    result.push(generateJsonFile(data[key], jsonName));
    console.log(result)
  })
  return result;
}

const generateJsonFile = (data: any, fileName: string) => {
  return data
}

export default {
  excel2Json,
}