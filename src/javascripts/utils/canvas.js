export const calculateParallax = (x, y, pX, pY, z = 0, depth = 50) =>
  [x + (pX * z * depth), y + (pY * z * depth)];

export const ratioForCanvas = (ctx) => {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio || 1;
  return devicePixelRatio / backingStoreRatio;
};
