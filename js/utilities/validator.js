//regex
const letters = /(.*?){1,}$/;
const url =
  /^(http(s?):\/\/)?(www.)?(([^.]+)\.)?([a-zA-z0-9\-_]+)(.com|.net|.gov|.org|.in)(\/[^\s]*)?$/i;

function validateTex(text) {
  return letters.test(text);
}
function validateWebsite(website) {
  return url.test(website);
}

export { validateWebsite, validateTex };
