const stylish = (diff) => {
  const lines = Object.keys(diff)
    .sort()
    .map((key) => {
      const { type, value, oldValue, newValue } = diff[key];
      
      switch (type) {
      case 'added':
        return `  + ${key}: ${value}`;
      case 'removed':
        return `  - ${key}: ${value}`;
      case 'changed':
        return `  - ${key}: ${oldValue}\n  + ${key}: ${newValue}`;
      case 'unchanged':
        return `    ${key}: ${value}`;
      default:
        return '';
      }
    });

  return `{\n${lines.join('\n')}\n}`;
};

export default stylish;