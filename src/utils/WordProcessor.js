import stopword from 'stopword';

export default class WordProcessor {
  constructor() {
    this.wordsCounted = {};
  }

  static sanitize(s) {
    const input = s.toString();
    const regex = /[.,:;()?!"”\s\n]/g;
    let result = input.replace(regex, ' ');
    result = result.replace(/&nbsp;/g, ' ');
    result = result.replace(/&nbsp/g, ' ');
    result = result.replace(/<[^>]*>/g, ' ');
    return result;
  }

  static toList(s) {
    const result = WordProcessor.sanitize(s);
    return result.split(/\s/g);
  }

  static counter(arr) {
    if (arr.constructor !== Array) {
      return [];
    }
    const res = [];
    const len = arr.length;
    for (let i = 0; i < len; i += 1) {
      let key = arr[i];
      key = key.toLowerCase();
      if (typeof res[key] === 'undefined') {
        res[key] = 1;
      } else {
        res[key] += 1;
      }
    }
    return res;
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
    const words = WordProcessor.toList(s);
    const input = stopword.removeStopwords(words, stopword.it);
    if (input.length > 1) {
      const aWords = WordProcessor.counter(input);
      const k = Object.keys(aWords);
      const v = Object.values(aWords);
      const len = k.length;
      const output = [];
      let tot = 0;
      for (let j = 0; j < len; j += 1) {
        if (k[j] !== '') {
          tot += v[j];
        }
      }
      for (let i = 0; i < len; i += 1) {
        if (k[i] !== '') {
          const item = {
            word: k[i],
            numb: v[i],
            perc: WordProcessor.percentage(tot, v[i]),
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
