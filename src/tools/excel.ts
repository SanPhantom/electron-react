import { keys, result, uniq } from 'lodash-es';
import * as Xlsx from 'xlsx';
import { dealJsonArray } from '.';


const excel2Json = (file: File, projectName: string) => {
  return new Promise<any[]>((resolve, reject) => {
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
            writeJson(jsonData, projectName).then(res => {
              console.log('result: ', res)
              resolve(res as any);
            });
            // callback(writeJson(jsonData, projectName))
            break;
          }
        }
      } catch (error) {
        console.log('文件类型不正确')
        return;
      }
    }
  
    reader.readAsBinaryString(file);
  })
  
}

const writeJson = (data: any, fileName: string) => {
  return new Promise<any[]>((resolve, reject) => {
    window.electron.doThing({data: data, projectName: fileName}, (a: any) => {
      resolve(a);
    });
  })
}

export default {
  excel2Json,
}