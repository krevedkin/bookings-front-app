export function parse_jwt(jwt) {
  try {
    return JSON.parse(atob(jwt.split(".")[1]));
  } catch (e) {
    return null;
  }
}
