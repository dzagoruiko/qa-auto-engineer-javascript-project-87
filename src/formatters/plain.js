const formatValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  return String(value);
};

const plain = (diff, parentPath = '') => {
  const lines = Object.keys(diff)
    .sort()
    .map((key) => {
      const currentPath = parentPath ? `${parentPath}.${key}` : key;
      const { type, value, oldValue, newValue } = diff[key];

      switch (type) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${formatValue(value)}`;
      case 'removed':
        return `Property '${currentPath}' was removed`;
      case 'changed':
        return `Property '${currentPath}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`;
      case 'unchanged':
        return null;
      default:
        return null;
      }
    })
    .filter((line) => line !== null);

  return lines.join('\n');
};

export default plain;