/* Directions
 NW   N   NE
   \  |  /
    7 0 1
W - 6   2 - E
    5 4 3
   /  |  \
  SW  S   SE
*/

const getDirOffset = offset => {
  return (offset + 8) % 8;
}

const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const genRandomExa = (loc, dirOverride) => {
  const dir = dirOverride !== undefined ? dirOverride : randInt(0, 7);
  return {
    dir,
    loc,
    arrows: [getDirOffset(dir - 2), dir, getDirOffset(dir + 2)],
  }
}

export const genRandomExas = attemptCount => {
  let rear = genRandomExa(4);

  let left;
  do {
    left = genRandomExa(7);
  } while (isInvalidLeft(rear, left));

  let right;
  let counter = 0;
  do {
    if (counter >= 8) {
      console.warn("impossible combination", { rear, left, right });
      if (attemptCount > 10) {
        console.error("too many impossible combinations. aborting");
        break;
      }
      return genRandomExas(attemptCount ? attemptCount + 1 : 1);
    }

    if (right)
      right = genRandomExa(1, getDirOffset(right.dir + 1));
    else
      right = genRandomExa(1);
    counter++;
  } while (isInvalidRight(rear, left, right))

  return { rear, left, right };
}

export const findSafeSpot = exas => {
  const { rear, left, right } = exas;
  const ret = [];

  if (left.arrows.indexOf(3) === -1 && right.arrows.indexOf(5) === -1)
    ret.push({ ...rear, key: "rear" });

  if (right.arrows.indexOf(6) === -1 && rear.arrows.indexOf(7) === -1)
    ret.push({ ...left, key: "left" });

  if (left.arrows.indexOf(2) === -1 && rear.arrows.indexOf(1) === -1)
    ret.push({ ...right, key: "right" });

  if (ret.length === 1)
    return ret.pop();

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

  // rear is covering self; intercard can't face away
  if (rear.arrows.indexOf(7) >= 0 && rear.arrows.indexOf(1) === -1) {
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

  // safe spot must exist
  return findSafeSpot({ right, left, rear }) === undefined;
}