import stopword from 'stopword';

export default class WordProcessor {
  constructor(multiple) {
    this.wordsCounted = {};
    this.multiple = multiple;
  }

  static sanitize(s) {
    const input = s.toString();
    const regex = /[.,:;()?!"“”'’\t+\-=*^]/g;
    let result = input.replace(regex, ' ');
    result = result.replace(/&nbsp;/g, ' ');
    result = result.replace(/&nbsp/g, ' ');
    result = result.replace(/<[^>]*>/g, ' ');
    result = result.replace(/<\\[^>]*>/g, ' ');
    return result;
  }

  static sanitizeChars(s) {
    const input = s.toString();
    let result = input.replace(/&nbsp;/g, '');
    result = result.replace(/&nbsp/g, '');
    result = result.replace(/<[^>]*>/g, '');
    result = result.replace(/<\\[^>]*>/g, '');
    return result;
  }

  static toList(s) {
    const result = WordProcessor.sanitize(s);
    return result.split(/\s/g);
  }

  static counter(wordsArray, number = 1) {
    if (wordsArray.constructor !== Array) {
      return [];
    }
    const twoWordsArrayKeyExists = [];
    const output = [];
    const excludedKeys = [];
    for (let i = 0; i < wordsArray.length; i += 1) {
      let objItem = {
        key: '',
        value: '',
        number: 0,
      };
      let key = '';
      let value = '';
      if (number === 2) {
        key = `${wordsArray[i]}-${wordsArray[i + 1]}`;
        value = `${wordsArray[i]} ${wordsArray[i + 1]}`;
      } else if (number === 3) {
        key = `${wordsArray[i]}-${wordsArray[i + 1]}-${wordsArray[i + 2]}`;
        value = `${wordsArray[i]} ${wordsArray[i + 1]} ${wordsArray[i + 2]}`;
      } else {
        key = `${wordsArray[i]} `;
        value = key;
      }
      key = key.toLowerCase();
      value = value.toLowerCase();
      const checkTwoElements = key.split("-");
      if (checkTwoElements[0] === '' || 
          checkTwoElements[1] === '' || 
          checkTwoElements[2] === '') {
        excludedKeys.push(key);
        continue;
      }
      if (key.length > 1) {
          if (twoWordsArrayKeyExists.indexOf(key) === -1) {
            twoWordsArrayKeyExists.push(key);
            objItem.key = key;
            objItem.value = value;
            objItem.number = 1;
            output[key] = objItem;
          } else {
            objItem = output[key];
            objItem.number += 1;
          }
      }
    }
    return output;
  }

  static percentage(tot, num) {
    return ((num / tot) * 100).toFixed(0);
  }

  static compare(a, b) {
    if (a.numb < b.numb) {
      return 1;
    }
    if (a.numb > b.numb) {
      return -1;
    }
    return 0;
  }

  static subCount(main, sub) {
    let mainStr = WordProcessor.sanitize(main);
    mainStr = mainStr.replace(/\s+/g, ' ');
    let subStr = sub;
    mainStr += '';
    subStr += '';
    if (subStr.length <= 0) {
      return mainStr.length + 1;
    }
    const subStrR = subStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return (mainStr.match(new RegExp(subStrR, 'gi')) || []).length;
  }

  get wordsCounter() {
    return this.wordsCounted;
  }

  set wordsCounter(s) {
    const words = WordProcessor.toList(WordProcessor.sanitize(s));
    const input = stopword.removeStopwords(words, stopword.it);
    if (input.length > 1) {
      const aWords = WordProcessor.counter(input, this.multiple);
      const k = Object.keys(aWords);
      const v = Object.values(aWords);
      const len = k.length;
      const output = [];
      let tot = 0;
      for (let j = 0; j < len; j += 1) {
        if (k[j] !== '') {
          tot += v[j].number;
        }
      }
      for (let i = 0; i < len; i += 1) {
        if (k[i] !== '') {
          const item = {
            word: v[i].value,
            numb: v[i].number,
            perc: WordProcessor.percentage(tot, v[i].number),
            color: '',
          };
          output.push(item);
        }
      }
      this.wordsCounted = output.sort(WordProcessor.compare);
    } else {
      this.wordsCounted = {};
    }
  }
}
