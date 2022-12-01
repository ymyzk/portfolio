export default function customImageLoader({ src }) {
  console.log("@@@@ loader @@@")
  console.log(src);
  return src;
}
