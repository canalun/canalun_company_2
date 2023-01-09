export function generateRandomString() {
  return Math.random().toString(32).substring(2);
  // random string generator : https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript/8084248#8084248
}
