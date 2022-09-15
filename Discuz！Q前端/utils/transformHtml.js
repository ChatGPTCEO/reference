// 为不带http/https的添加https
export const addHref = htmlArr => {
  const htmltext = htmlArr;
  const hrefRegular = /(href=('|")http)|(src=('|")http)/g;
  const hrefContent = /\bhref=("|')/g;
  for (let j = 0; j < htmltext.length; j += 1) {
    if (htmltext[j].search(hrefRegular) === -1) {
      let newHref = htmltext[j].match(hrefContent);
      if (newHref !== null) {
        newHref = `${newHref[0]}'https://'`;
        htmltext[j] = htmltext[j].replace(hrefContent, newHref);
      }
    }
  }
  return htmltext;
};
export const modifyString = (arr, str, identification) => {
  let newContentLink = [];
  if (arr) {
    for (let i = 0; i < arr.length; i += 1) {
      newContentLink.push(`<a href='${arr[i]}'>${arr[i]}</a>`);
    }
    newContentLink = addHref(newContentLink);
    const strToArr = str.split(identification);
    let newContent = [];
    for (let t = 0; t < strToArr.length; t += 1) {
      if (strToArr[t]) {
        newContent.push(strToArr[t]);
      }
      if (newContentLink[t]) {
        newContent.push(newContentLink[t]);
      }
    }
    newContent = newContent.join('');
    return newContent;
  }
  return str;
};
/**
 * 修改内容字符串
 * @param {*} html 带html标签的内容
 * @return 转换后的内容
 *
 */
export const modifyPostContentHtml = html => {
  if (!html) return;
  let contentHtml = html;
  const timeStamp1 = `'这是替换标签的字符串'`;
  const timeStamp2 = `'这是替换纯链接文本的字符串'`;
  const reg = /((https?|ftp|file):\/\/([-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])|(www\.([-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])\.(com|cn|org)))/g;
  // 匹配整个a标签或img标签
  const hrefString = /(<a[^>]+>(.+?)<\/a>)|(<img[^>]+>)/g;
  let hrefStrArr = contentHtml.match(hrefString);
  if (hrefStrArr !== null) {
    hrefStrArr = addHref(hrefStrArr);
    contentHtml = contentHtml.replace(hrefString, timeStamp1);
  }
  const contentLink = contentHtml.match(reg);
  if (contentLink) {
    contentHtml = contentHtml.replace(reg, timeStamp2);
    contentHtml = modifyString(contentLink, contentHtml, timeStamp2);
  }
  // 将标签重新换回
  if (hrefStrArr) {
    const strToArr = contentHtml.split(timeStamp1);
    let newContentHtml = [];
    for (let t = 0; t < strToArr.length; t += 1) {
      if (strToArr[t]) {
        newContentHtml.push(strToArr[t]);
      }
      if (hrefStrArr[t]) {
        newContentHtml.push(hrefStrArr[t]);
      }
    }
    newContentHtml = newContentHtml.join('');
    return newContentHtml;
  }
  return contentHtml;
};
