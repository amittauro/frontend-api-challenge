class Chitter {

  constructor(element, client, viewChitter) {
    this.element = element
    this.client = client
    this.viewChitter = viewChitter
    this.userId
    this.sessionKey
    this.data
  }

  peeps() {
    return this.client.get("https://chitter-backend-api-v2.herokuapp.com/peeps")
      .then((data) => {
        let text = [`<ul>`]
        let peeps = data.forEach(peep => text.push(
          `
          <li id="${peep.id}">${peep.body}
          <a href="file:///Users/student/Makers/week8/frontend-api-challenge/src/index.html#${peep.id}">
          Like peep</a>
          </li>
          `
        ))
        text.push(`</ul>`)
        this.element.innerHTML = text.join('')
      })
  }

  createNewUser(handle, password) {
    this.client.post("https://chitter-backend-api-v2.herokuapp.com/users", `{"user": {"handle":"${handle}", "password":"${password}"}}`)
    .then((data) => {
      window.alert("Thanks for signing up, please log in")
      let length = location.hash.length
      let url = location.href.slice(0, -length)
      this.viewChitter.renderHomePage(url)
    })
    .catch(error => {
      window.alert("invalid sign up details");
      let length = location.hash.length
      let url = location.href.slice(0, -length)
      let text = `<a href="${url}#sign_up">Sign up</a>`
      this.element.innerHTML = text
    });
  }

  loginUser(handle, password) {
    this.client.post("https://chitter-backend-api-v2.herokuapp.com/sessions", `{"session": {"handle":"${handle}", "password":"${password}"}}`)
      .then((data) => {
        this.userId = data.user_id
        this.sessionKey = data.session_key
        window.alert("Thanks for logging in, please post a peep")
        let length = location.hash.length
        let url = location.href.slice(0, -length)
        this.viewChitter.renderHomePage(url)
      })
      .catch(error => {
        window.alert("try signing up");
        let length = location.hash.length
        let url = location.href.slice(0, -length)
        let text = `<a href="${url}#sign_up">Sign up</a>`
        this.element.innerHTML = text
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
      let length = location.hash.length
      let url = location.href.slice(0, -length)
      this.viewChitter.renderHomePage(url)
    })
    .catch(error => {
      window.alert("try signing up/ logging in");
      let length = location.hash.length
      let url = location.href.slice(0, -length)
      let text =
      `<a href="${url}#sign_up">Sign up</a>
      <a href="${url}#sign_in">Sign in</a>
      `
      this.element.innerHTML = text
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
