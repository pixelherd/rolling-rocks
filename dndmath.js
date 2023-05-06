const sides = {d4: 4, d6: 6, d8: 8, d10: 10, d12: 12, d20: 20};

function probabilityOfAnyRoll(sides) {
  return 1/sides
}

function probAtLeast(num, sides) {
  const roll = probabilityOfAnyRoll(sides)
  const calculation =((sides+1)-num)*roll
  return calculation > 0 ?  calculation : 0
}

function probOfPair(sides) {
  // 1/D^2 
  return 1 / sides**2
}

// EXAMPLE on a D4
// pairs of rolls
// (1, 1) (1, 2) (1, 3) (1, 4)
// (2, 1) (2, 2) (2, 3) (2, 4)
// (3, 1) (3, 2) (3, 3) (3, 4)
// (4, 1) (4, 2) (4, 3) (4, 4)

// count rolls at adv (ie max of the two)
// (1) (2) (3) (4)
// (2) (2) (3) (4)
// (3) (3) (3) (4)
// (4) (4) (4) (4)

// count rolls at disadv (ie min of the two)
// (1) (1) (1) (1)
// (1) (2) (2) (2)
// (1) (2) (3) (3)
// (1) (2) (3) (4)

function countMaxOfPairExact (num) {
  return (num ** 2) - ((num-1) ** 2)
}

function countMaxOfPairOrMore (num, sides) {
  //  also possibly: sides ** 2 - (sides - num) **2
  let count = 0;
  for (let k = sides; k >= num; k--) {
    count += (k ** 2) - ((k-1) ** 2)
  }
  return count
}

function probMaxOfPair(num, sides) {
  // probability of hitting a specific roll at advantage
  const count = countMaxOfPairExact(num)
  return count * probOfPair(sides)
}

function probMaxOfPairOrMore(num, sides) {
  // probability of hitting a certain DC at advantage
  let count = countMaxOfPairOrMore(num, sides)
  return count * probOfPair(sides)
}

function countMinOfPairExact (num, sides) {
  // 1 -> 4**2 - 3**2
  // 2 -> 3**2 - 2**2
  // 3 -> 2**2 - 1**2
  // 4 -> 1**2 - 0**2
  return (sides - num + 1)**2 - (sides - num)**2
}
function countMinOfPairOrMore (num, sides) {
  // 1 -> 4**2
  // 2 -> 3**2
  // 3 -> 2**2
  // 4 -> 1**2
  return (sides-num+1)**2
}

function probMinOfPairOrMore(num, sides) {
  // probability of hitting a certain DC at disadvantage
  let count = countMinOfPairOrMore(num, sides)
  return count * probOfPair(sides)
}


console.log("probMinOfPairOrMore", probMinOfPairOrMore(1, sides.d4))

// console.log("countMaxOfPairOrMore", countMaxOfPairOrMore(4, sides.d4))
