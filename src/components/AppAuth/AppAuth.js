import ClientOAuth2 from 'client-oauth2';
import axios from 'axios';

export const appAuth = {
  isAuthenticated: false,
  fetchUserDataEndpoint: 'https://stockwatch-api.shropnet.net/api',
  OAuthAppURL: 'https://stockwatch-api.shropnet.net',
  OAuthAppEndpoint: 'https://stockwatch-api.shropnet.net/oauth/authorize',
  OAuthAppSignOut: 'https://stockwatch-api.shropnet.net/user/logout?_format=json',
  OAuthAppClientId: 'ce47a835-bf9d-4238-becb-70e0b2090ba1',
  OAuthAppRedirectUri: 'http://localhost:3000',
  authStatus() {
    // Check for an Oauth access token and save to session storage.
    // Also check to see if there's a current accessToken.
    let url = window.location.href;
    let accessToken = url.match(/access_token/);

    if (accessToken) {
      function getParameterByName(name) {
        let match = RegExp('[#&]' + name + '=([^&]*)').exec(url);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
      }
      let oauthAccessToken = getParameterByName('access_token');
      sessionStorage.setItem('oauthAccessToken', oauthAccessToken);
      this.isAuthenticated = true;

      // Fetch User Data. If this can't be fetched it means that the
      // AccessToken is expired, therefore we'll nuke the stored token.
      this.fetchUserData();
    }
    else {
      let sessionStatus = sessionStorage.getItem('oauthAccessToken');
      if (sessionStatus) {
        this.isAuthenticated = true;
        this.fetchUserData();
      }
    }
  },
  authenticate(cb) {
    const contentaOauth = new ClientOAuth2({
      clientId: 'ce47a835-bf9d-4238-becb-70e0b2090ba1',
      authorizationUri: 'https://stockwatch-api.shropnet.net/oauth/authorize',
      redirectUri: 'http://localhost:3000'
    });

    let url = window.location.href;
    let accessToken = url.match(/access_token/);

    if (!accessToken) {
      window.open(contentaOauth.token.getUri(), '_self');
    }

    setTimeout(cb, 100);
  },
  fetchUserData() {
    const sessionStatus = sessionStorage.getItem('oauthAccessToken');

    const self = this;
    if (sessionStatus) {
      axios({
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + sessionStatus
        },
        url: self.fetchUserDataEndpoint,
      }).then(function(response){
        try {
          let userUUID = response.data.meta.links.me.meta.id;
          sessionStorage.setItem('oauthUserId', userUUID);
        } catch (error) {
          // If we're here, the meta.links.me object doesn't exist in the
          // response. So let's log the user out of the react side of things.
          self.signout();
        }

      });
    }
  },
  signout(cb) {
    // Remove all local sessionStorage.
    let sessionStatus = sessionStorage.getItem('oauthAccessToken');
    if (sessionStatus) {
      sessionStorage.removeItem('oauthAccessToken');
      sessionStorage.removeItem('oauthUserId');
      this.isAuthenticated = false;
    }

    setTimeout(cb, 100);
    window.location.href = this.OAuthAppRedirectUri;
  }
};
