
const TokenService = {
  encodeUser(user) {
    window.sessionStorage.setItem('petful-api-token', window.btoa(`${user.id}:${user.name}`))
  },
  decodeUser() {
    const encoded = window.sessionStorage.getItem('petful-api-token');
    if (encoded){
      const data = window.atob(encoded).split(':');
      return {
        id : data[0],
        name: data[1],
      }
    }
  }

}

export default TokenService
