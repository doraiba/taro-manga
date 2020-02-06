
function isFunction<T extends () => void>(value: any): value is T {
  return typeof value === 'function';
}
// eslint-disable-next-line import/prefer-default-export
export  {isFunction}
