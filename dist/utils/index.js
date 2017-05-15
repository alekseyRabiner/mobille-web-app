export const getParamElem = (elemSelector, type) => parseFloat(getComputedStyle(document.querySelector(elemSelector))[type], 10);
export const parseTime = time => time.split(':').map(Number);
export const hideScroll = (element) => {
  element.style.right = (element.clientWidth - element.offsetWidth) + 'px';
  element.style.bottom = (element.clientHeight - element.offsetHeight) + 'px';
};
