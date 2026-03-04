export const guardex = {
  auth: {
    async me() {
      return { id: 'demo-user', name: 'Demo User' };
    },
    logout(redirectUrl) {
      console.log('Guardex logout called', redirectUrl);
    },
    redirectToLogin(redirectUrl) {
      console.log('Guardex redirectToLogin called', redirectUrl);
    }
  }
};
