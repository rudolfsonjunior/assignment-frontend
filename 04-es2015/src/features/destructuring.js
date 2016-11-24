export function es5() {
  function d(spec) {
    var x = spec.x || 0
    var y = spec.y || 0
    var z = spec.z || 0

    return x + y + z
  }

  return d
}

export function es6() {
  function d(spec){
    let sum = 0;
    for(let i in spec){
      sum += spec[i];
    }
    return sum
  }
  return d
}
