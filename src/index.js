const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
  const dotEncoded = 10;
  const dashEncoded = 11;
  const space = "**********";
  let decodedSentenceArr = [];

  // функция, декодирующая каждый отдельный символ, который передается в виде строки '0000001111'
  function symbolToMorse(symbol) {
    return symbol
      .replaceAll(dotEncoded, ".")
      .replaceAll(dashEncoded, "-")
      .replaceAll(0, "");
  }

  function morseToLetter(symbol) {
    for (let key in MORSE_TABLE) {
      if (key === symbol) return MORSE_TABLE[key];
    }
  }

  // разбиваем входящую строку по пробелам. Теперь каждый элемент массива равен зашифрованному слову: ['00000011110000000010', '00111011110000101110']
  let exprArr = expr.split(`${space}`);

  // Итерируемся по массиву, созданному на предыдущем шаге. Каждый элемент (т.е. слово) данного массива должен быть разделен на символы. Т.е, должен получиться двумерный массив [['0000001111', '0000000010'], ['0011101111', '0000101110']]
  for (let i = 0; i < exprArr.length; i++) {
    let symbolStr = "";
    for (let j = 0; j < exprArr[i].length; j += 10) {
      let symbol = exprArr[i].slice(j, j + 10); // вырезаем отдельный символ из закодированного слова
      let morseSymbol = symbolToMorse(symbol); // переводим символ в азбуку Морзе
      let letter = morseToLetter(morseSymbol); // в алфавитный символ
      symbolStr += letter;
    }
    decodedSentenceArr.push(symbolStr);
  }

  return decodedSentenceArr.join(" ");
}

module.exports = {
    decode
}