
export function useStringCase() {
 
  const toCamelCase = (str) => {
    if (!str) return '';
    return str
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .split(' ')
      .filter(Boolean)
      .map((w, i) =>
        i === 0
          ? w.toLowerCase()
          : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
      )
      .join('');
  };

  
  const toPascalCase = (str) => {
    if (!str) return '';
    return str
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .split(' ')
      .filter(Boolean)
      .map(
        (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
      )
      .join('');
  };

 
  const toSnakeCase = (str) => {
    if (!str) return '';
    return str
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .trim()
      .split(/\s+/)
      .map((w) => w.toLowerCase())
      .join('_');
  };

 
  const toKebabCase = (str) => {
    if (!str) return '';
    return str
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .trim()
      .split(/\s+/)
      .map((w) => w.toLowerCase())
      .join('-');
  };

  return {
    toCamelCase,
    toPascalCase,
    toSnakeCase,
    toKebabCase,
  };
}
