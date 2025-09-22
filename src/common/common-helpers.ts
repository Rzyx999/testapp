export function isString(val: unknown): val is string {
  return typeof val === 'string';
}

/**
 * @name cn
 * @description get concatenated className from given classlist
 */ 
export function cn(...args: any[]): string | undefined {
  const classList = args.filter(arg => arg && isString(arg));
  return classList.length > 1 
    ? classList.join(' ') 
    : classList.length === 1 
      ? classList[0]
      : undefined;
}