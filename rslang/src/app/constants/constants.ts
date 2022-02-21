export const URL = "https://react-learnwords-example.herokuapp.com/";

export const MAX_WORDS = 5;

export const MAX_DATA = 20;

export const LAST_PAGE = 29;

export const LAST_PAGE_ON_PAGINATION = 30;

export const FIRST_PAGE = 0;

export const randN = () => Math.floor(Math.random() * MAX_DATA);

export const elseRandN = () => Math.floor(Math.random() * MAX_DATA);

export const obj = {
  "overall": {
    "countTrueWords": 0,
    "countFalseWords": 0,
    "procentTrueWords": 0,
    "countAllWords": 0,
    "maxCombo": 0,
  },
  "sprint": {
    "countTrueWords": 0,
    "countFalseWords": 0,
    "procentTrueWords": 0,
    "countAllWords": 0,
    "maxCombo": 0,
  },
  "audiocall": {
    "countTrueWords": 0,
    "countFalseWords": 0,
    "procentTrueWords": 0,
    "countAllWords": 0,
    "maxCombo": 0,
  },
};
