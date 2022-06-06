const calc = {
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  mul: (a, b) => a * b,
  div: (a, b) => a / b,
  power: (a, b) => Math.pow(a, b),
  sqrt: (a) => Math.sqrt(a),
}

function checkExponential(number){
  let length = '';
  if(number.indexOf('.')==-1){
    length = number.length;
  } else {
    const array = number.split('.');
    length = array[0].length;
  }
  if(length > 9){
    return (Number(number).toExponential()).toString();;
  }
  return number
}
  
export { calc, checkExponential }