import env from "../../config/env";
export default UserService = {    
  async initUser(token){
    return await fetch('https://graph.facebook.com/v2.5/me?fields=email,name&access_token=' + token)
    .then((response) => { return response.json() })    
    .catch(error => {
      throw new Error(error.message)
    })
  }, 
  async checkNumber(phoneNumber){
    const url = env.URL+'/checkNumber/'+phoneNumber;
    return await fetch(url)      
    .then(response => { return response.json() })
    .catch(error => {
      throw new Error(error.message);
    });     
  },
  async checkEmail(email){
    const url = env.URL+'/checkEmail/'+email
    return await fetch(url)
    .then(res => { return res.json() })    
    .catch(err => {
      throw new Error(err.message)
    })
  },
  async sendData(data){
    const url = env.URL+'/user/'+email
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then(response => { return response.json() })
      .catch(error => {
      throw new Error(error.message);
    });
  }
}
