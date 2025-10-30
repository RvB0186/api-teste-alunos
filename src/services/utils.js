function isValidEmail(email) {
  if (!email) return false;
  return email.includes('@');
}
export { isValidEmail };