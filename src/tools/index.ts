import { find, keys, map, pick } from 'lodash-es'
import excelTools from './excel'

export const dealJsonArray = (arr: any[]) => {
  let key  = keys(arr[0])
  let a = key[0];
  const nameArr = map(arr, key[0]);
  key.shift()
  let obj: any = {};
  key.forEach(k => {
    obj[k] = {};
    nameArr.forEach((name) => {
      obj[k][name] = find(arr, item => item[a] === name)[k]
    })
  })
  return obj;
}

export {
  excelTools,
}