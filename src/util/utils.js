export const dirMap = {
  0: "N ",
  1: "NE",
  2: "E ",
  3: "SE",
  4: "S ",
  5: "SW",
  6: "W ",
  7: "NW",
}

const getDirOffset = offset => {
  return (offset + 8) % 8;
}

const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const genRandomExa = loc => {
  const dir = randInt(0, 7);
  const dirFriendly = dirMap[dir];
  return {
    dir,
    dirFriendly,
    loc,
    locFriendly: dirMap[loc],
    arrows: [getDirOffset(dir - 2), dir, getDirOffset(dir + 2)],
  }
}

export const genRandomExas = () => {
  let rear = genRandomExa(4);

  let left;
  do {
    left = genRandomExa(7);
  } while (isInvalidLeft(rear, left));

  let right;
  let counter = 0;
  do {
    counter++;
    if (counter > 200) {
      console.error("took too long.", { rear, left, right });
      break;
    }
    right = genRandomExa(1);
  } while (isInvalidRight(rear, left, right))

  return { rear, left, right };
}

export const findSafeSpot = exas => {
  const { rear, left, right } = exas;

  if (left.arrows.indexOf(3) === -1 && right.arrows.indexOf(5) === -1)
    return { ...rear, key: "rear" };

  if (right.arrows.indexOf(6) === -1 && rear.arrows.indexOf(7) === -1)
    return { ...left, key: "left" };;

  if (left.arrows.indexOf(2) === -1 && rear.arrows.indexOf(1) === -1)
    return { ...right, key: "right" };;

  return undefined;
}

const isInvalidLeft = (rear, left) => {
  // rear is covering both; rear must be open
  if (rear.arrows.indexOf(7) >= 0 && rear.arrows.indexOf(1) >= 0) {
    if (left.arrows.indexOf(3) >= 0)
      return true;
  }

  // rear is cardinal; intercard must cover rear
  if (rear.dir % 2 === 0 && left.dir % 2 === 1) {
    if (left.arrows.indexOf(3) === -1)
      return true;
  }

  // rear is cardinal; card must cover right
  if (rear.dir % 2 === 0 && left.dir % 2 === 0) {
    if (left.arrows.indexOf(2) === -1)
      return true;
  }

  // rear is covering 1; intercard can't face away
  if (rear.arrows.indexOf(7) >= 0 && rear.arrows.indexOf(1) === -1) {
    if (left.dir % 2 === 1 && left.arrows.indexOf(3) === -1)
      return true;
  }
  if (rear.arrows.indexOf(1) >= 0 && rear.arrows.indexOf(7) === -1) {
    if (left.dir % 2 === 1 && left.arrows.indexOf(3) === -1)
      return true;
  }

  return false;
}

const isInvalidRight = (rear, left, right) => {
  // rear is cardinal; exactly 1 other card must exist
  if (rear.dir % 2 === 0) {
    if (left.dir % 2 === right.dir % 2)
      return true;
  }

  // there can't be 3 intercards
  if (rear.dir % 2 === 1) {
    if (left.dir % 2 === 1 && right.dir % 2 === 1)
      return true;
  }

  // rear is covering both; rear must be open
  if (rear.arrows.indexOf(7) >= 0 && rear.arrows.indexOf(1) >= 0) {
    if (right.arrows.indexOf(5) >= 0)
      return true;
  }

  // rear is cardinal; intercard must cover rear
  if (rear.dir % 2 === 0 && right.dir % 2 === 1) {
    if (right.arrows.indexOf(5) === -1)
      return true;
  }

  // rear is cardinal; card must cover left
  if (rear.dir % 2 === 0 && right.dir % 2 === 0) {
    if (right.arrows.indexOf(6) === -1)
      return true;
  }

  // rear is covering 1; intercard can't face away
  if (rear.arrows.indexOf(1) >= 0 && rear.arrows.indexOf(7) === -1) {
    if (right.dir % 2 === 1 && right.arrows.indexOf(5) === -1)
      return true;
  }
  if (rear.arrows.indexOf(7) >= 0 && rear.arrows.indexOf(1) === -1) {
    if (right.dir % 2 === 1 && right.arrows.indexOf(5) === -1)
      return true;
  }

  // safe spot must exist
  return findSafeSpot({ right, left, rear }) === undefined;
}

export const prettyPrint = (exas) => {
  return `${dirMap[exas.left.dir]}  ${dirMap[exas.right.dir]}\n  ${dirMap[exas.rear.dir]}`
}