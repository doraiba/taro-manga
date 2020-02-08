
export const dataURLtoBlob = (dataurl) => {
  const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]); let n = bstr.length;const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

export const isFunction = <T extends () => void>(value: any): value is T => {
  return typeof value === 'function';
}

export const parsePath = (url: string, pathVariables: Record<string, any>): string=> {
  return Object.keys(pathVariables).reduce(((seed, item) => seed.replace(`{${item}}`,pathVariables[item])), url)
}
// eslint-disable-next-line import/prefer-default-export
