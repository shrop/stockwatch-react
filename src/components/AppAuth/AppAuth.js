export const appAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    // TODO: Wire up with contentaOauth.
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);

    // TODO: Remove all local sessionStorage.
    // let sessionStatus = sessionStorage.getItem('oauthAccessToken');
    // if (sessionStatus) {
    //   sessionStorage.removeItem('oauthAccessToken');

    //   this.isAuthenticated = false;
    //   setTimeout(cb, 100);
    // }
  }
};
