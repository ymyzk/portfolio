// flow-typed signature: 34e2083e247ba2c2ddff7610f310370b
// flow-typed version: fb32eabac8/smoothscroll_v0.4.x/flow_>=v0.74.x

declare module "smoothscroll" {
  declare type Target = number | Element;

  declare type smoothScroll = (
    target: Target,
    duration?: ?number,
    callback?: ?(Target => any),
    context?: ?Element
  ) => void;

  declare export default smoothScroll;
}
