class Chitter {

  constructor(client, viewChitter) {
    this.client = client
    this.viewChitter = viewChitter
    this.userId
    this.sessionKey
    this.data
  }

  peeps() {
    return this.client.get("https://chitter-backend-api-v2.herokuapp.com/peeps")
      .then((data) => {
        this.viewChitter.renderPeeps(data)
      })
  }

  createNewUser(handle, password) {
    this.client.post("https://chitter-backend-api-v2.herokuapp.com/users", `{"user": {"handle":"${handle}", "password":"${password}"}}`)
    .then((data) => {
      window.alert("Thanks for signing up, please log in")
      this.viewChitter.renderHomePage()
    })
    .catch(error => {
      window.alert("invalid sign up details");
      this.viewChitter.renderSignUpError()
    });
  }

  loginUser(handle, password) {
    this.client.post("https://chitter-backend-api-v2.herokuapp.com/sessions", `{"session": {"handle":"${handle}", "password":"${password}"}}`)
      .then((data) => {
        this.userId = data.user_id
        this.sessionKey = data.session_key
        window.alert("Thanks for logging in, please post a peep")
        this.viewChitter.renderHomePage()
      })
      .catch(error => {
        window.alert("invalid details try signing up or logging in");
        this.viewChitter.renderHomePage()
      });
  }

  getSinglePeep(id) {
    return this.client.get(`https://chitter-backend-api-v2.herokuapp.com/peeps/${id}`)
  }

  postPeep(body) {
    this.client.postPeep("https://chitter-backend-api-v2.herokuapp.com/peeps", this.sessionKey, this.userId, body)
    .then((response) => {
      console.log(response)
      window.alert(`Thanks for posting: ${response.body}`)
      this.viewChitter.renderHomePage()
    })
    .catch(error => {
      window.alert("have you signed up/ logged in?");
      this.viewChitter.renderHomePage()
    });
  }

  deletePeep(id) {
    this.client.authorizedRequest(`https://chitter-backend-api-v2.herokuapp.com/peeps/${id}`, this.sessionKey, 'DELETE')
  }

  likePeep(peepId) {
    this.client.authorizedRequest(`https://chitter-backend-api-v2.herokuapp.com/peeps/${peepId}/likes/${this.userId}`, this.sessionKey, 'PUT')
      .then((response) => {
        console.log(response)
      })
  }

  deleteLike(peepId) {
    this.client.authorizedRequest(`https://chitter-backend-api-v2.herokuapp.com/peeps/${peepId}/likes/${this.userId}`, this.sessionKey, 'DELETE')
  }
}
