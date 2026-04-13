export function fakeLogin(email: string, password: string) {
  if (email === "admin@email.com" && password === "123456") {
    const fakeToken = "fake-jwt-token";

    localStorage.setItem("token", fakeToken);

    return true;
  }

  return false;
}

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}
