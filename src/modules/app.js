const calc = {
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  mul: (a, b) => a * b,
  div: (a, b) => a / b,
  power: (a, b) => Math.pow(a, b),
  sqrt: (a) => Math.sqrt(a),
}

function checkLength(number){
  let leftLength = '';
  let rightLength = '';
  if(number.indexOf('.')==-1){
    leftLength = number.length;
  } else {
    const array = number.split('.');
    leftLength = array[0].length;
    rightLength = array[1].length;
  }
  if(leftLength > 9 || (number.includes('e') && rightLength > 5)){
    return (Number(number).toExponential(5)).toString();
  }
  if(leftLength + rightLength > 9){
    const precision = 11-leftLength;
    return (Number(number).toFixed(precision).toString())
  }
  return number
}
  
export { calc, checkLength }