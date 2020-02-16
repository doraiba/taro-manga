export const isFunction = <T extends () => void>(value: any): value is T => {
  return typeof value === 'function';
}

export const parsePath = (url: string, pathVariables: Record<string, any>): string=> {
  return Object.keys(pathVariables).reduce(((seed, item) => seed.replace(new RegExp(`{${item}}`,'g'),pathVariables[item])), url)
}

export const createFormData = (formData: Record<string, any>)=>{
  const boundary = `AaB0${Math.ceil(Math.random()*9)}x`;
  const headers = {'Content-Type': `multipart/form-data; boundary=${boundary}`}
  const data = Object.entries(formData).map(([k,v])=>
    `\r\n--${boundary}` +
    `\r\nContent-Disposition: form-data; name="${k}"` +
    '\r\n' +
    `\r\n${v}`
  ).join('') +
    `\r\n--${boundary}`;
  return {headers, data}
}

