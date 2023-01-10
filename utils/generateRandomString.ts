export function generateRandomString() {
  return "a" + Math.random().toString(32).substring(2);
  // random string generator : https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript/8084248#8084248
  // 先頭が数字だとCSSのクラス名として認識されない
}
