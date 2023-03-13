export const bigLetter = /[A-ZА-Я]/;
export const number = /[0-9]/;
export const latLetters = /[A-Za-z]/;
export const ruLetters = /[А-Яа-я]/;
export const maskPattern = [
  '+',
  '3',
  '7',
  '5',
  ' ',
  '(',
  /[2-4]/,
  /[3-5,9]/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
];
export const pattern = /[+]?(375)[\s][(](29|25|33|44)[)][\s][\d]{3}[-][\d]{2}[-][\d]{2}/;
