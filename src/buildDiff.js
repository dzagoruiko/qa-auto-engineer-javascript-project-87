import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  
  const diff = {};
  keys.forEach((key) => {
    if (!_.has(data1, key)) {
      diff[key] = { type: 'added', value: data2[key] };
    } else if (!_.has(data2, key)) {
      diff[key] = { type: 'removed', value: data1[key] };
    } else if (data1[key] === data2[key]) {
      diff[key] = { type: 'unchanged', value: data1[key] };
    } else {
      diff[key] = { 
        type: 'changed', 
        oldValue: data1[key], 
        newValue: data2[key] 
      };
    }
  });
  
  return diff;
};

export default buildDiff;