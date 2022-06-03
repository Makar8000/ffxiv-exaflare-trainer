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

export const genRandomExas = () => {
  let left;
  let right;
  let rear;
  do {
    left = genRandomExa(7);
    right = genRandomExa(1);
    rear = genRandomExa(4);
  } while (findSafeSpot({ right, left, rear }) === undefined);
  return { rear, left, right };
}

export const findSafeSpot = exas => {
  const { rear, left, right } = exas;
  const ret = [];

  const safeShift = { left: true, right: true, middle: true, };
  if (left.arrows.indexOf(3) !== -1) {
    delete safeShift.middle;
    delete safeShift.right;
  }
  if (right.arrows.indexOf(5) !== -1) {
    delete safeShift.middle;
    delete safeShift.left;
  }
  if (right.arrows.indexOf(4) !== -1)
    delete safeShift.right;
  if (left.arrows.indexOf(4) !== -1)
    delete safeShift.left;
  const shift = Object.keys(safeShift).pop();

  if (left.arrows.indexOf(3) === -1 && right.arrows.indexOf(5) === -1)
    ret.push({ ...rear, shift, key: "rear" });

  if (right.arrows.indexOf(6) === -1 && rear.arrows.indexOf(7) === -1)
    ret.push({ ...left, shift, key: "left" });

  if (left.arrows.indexOf(2) === -1 && rear.arrows.indexOf(1) === -1)
    ret.push({ ...right, shift, key: "right" });

  if (ret.length === 1)
    return ret.pop();

  return undefined;
}