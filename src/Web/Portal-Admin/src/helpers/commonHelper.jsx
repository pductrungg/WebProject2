import {toast} from 'react-toastify';
import {find} from 'lodash';

export function validBase64String(base64String) {
  return base64String
    .replace('data:image/jpeg;base64,', '')
    .replace('data:image/png;base64,', '')
    .replace('data:application/pdf;base64,', '');
}

export function downloadFile(data, filename, mime) {
  const blob = new Blob([data], {type: mime || 'application/octet-stream'});
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    window.navigator.msSaveBlob(blob, filename);
    return;
  }
  const blobURL = window.URL.createObjectURL(blob);
  const tempLink = document.createElement('a');
  tempLink.style.display = 'none';
  tempLink.href = blobURL;
  tempLink.setAttribute('download', filename);
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank');
  }
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  setTimeout(() => {
    window.URL.revokeObjectURL(blobURL);
  }, 100);
}

export function validURL(str) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i'
  );
  return !!pattern.test(str);
}

export function checkIsIntegerNumber(number) {
  return Number(number) === number && number % 1 === 0;
}

export function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

export function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}

export const getBase64 = (file, callback, {allowType = [], errorMessage = ''}) => {
  if (allowType?.length > 0 && !allowType.includes(file.type)) {
    toast.error(errorMessage || `Vui lòng chọn file có định dạng: ${allowType.join(', ')}`);
    return;
  }
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    callback(reader.result, file);
  };
};

export function getPathTreeData(treeData) {
  const valueMap = {};
  function loops(list, parent) {
    return (list || []).map(({children, value}) => {
      const node = (valueMap[value] = {
        parent,
        value,
      });
      node.children = loops(children, node);
      return node;
    });
  }

  loops(treeData);

  function getPath(value) {
    const path = [];
    let current = valueMap[value];
    while (current) {
      path.unshift(current.value);
      current = current.parent;
    }
    return path;
  }

  return getPath;
}

export function getArrayLabelByValueTreeSelect(arrValue, listCollectionData) {
  let arrLabel = [];
  let findCollection = listCollectionData;
  for (let i = 0; i < arrValue.length; i++) {
    let findObj = find(findCollection, {value: arrValue[i]});

    if (findObj) {
      findCollection = findObj?.children || [];
      arrLabel.push(findObj?.label);
    }
  }

  return arrLabel;
}
