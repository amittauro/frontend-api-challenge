class ChitterController {
  constructor(chitter, viewChitter) {
    this.chitter = chitter
    this.viewChitter = viewChitter
  }

  signUp() {
    this.viewChitter.renderSignUp()
    document.getElementById('sign-up').addEventListener('submit', (event) => {
      event.preventDefault()
      this.chitter.createNewUser(event.target[0].value, event.target[1].value)
      this.viewChitter.renderHomePage()
    })
  }

  signIn() {
    this.viewChitter.renderSignIn()
    document.getElementById('sign-in').addEventListener('submit', (event) => {
      event.preventDefault()
      this.chitter.loginUser(event.target[0].value, event.target[1].value)
      this.viewChitter.renderHomePage()
    })
  }

  postPeep() {
    this.viewChitter.renderPostPeep()
    document.getElementById('post-peep').addEventListener('submit', (event) => {
      event.preventDefault()
      chitter.postPeep(event.target[0].value)
      this.viewChitter.renderHomePage()
    });
  }

  getPeeps() {
    this.chitter.peeps()
    .then((data) => {
      this.viewChitter.renderPeeps(data)
    })
  }

  likePeep() {
    let peepId = location.hash.slice(1)
    this.chitter.likePeep(peepId)
  }

}
