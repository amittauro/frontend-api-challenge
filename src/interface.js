window.addEventListener('load', (event) => {
  event.preventDefault()
  let element = document.getElementById('app')
  let client = new Client
  let viewChitter = new ViewChitter(element)
  let chitter = new Chitter(client, viewChitter)
  viewChitter.renderHomePage()
  window.addEventListener('hashchange', (event) => {
    event.preventDefault()
    if (location.hash === "#peeps") {
      chitter.peeps()
    } else if (location.hash === "#sign_up") {
      viewChitter.renderSignUp()
      document.getElementById('sign-up').addEventListener('submit', (event) => {
        event.preventDefault()
        chitter.createNewUser(event.target[0].value, event.target[1].value)
      })
    } else if (location.hash === "#sign_in") {
      viewChitter.renderSignIn()
      document.getElementById('sign-in').addEventListener('submit', (event) => {
        event.preventDefault()
        chitter.loginUser(event.target[0].value, event.target[1].value)
      })
    } else if (location.hash === "#post_peep") {
      viewChitter.renderPostPeep()
      document.getElementById('post-peep').addEventListener('submit', (event) => {
        event.preventDefault()
        chitter.postPeep(event.target[0].value)
      });
    } else {
      let peepId = location.hash.slice(1)
      chitter.likePeep(peepId)
    }
  })
});
