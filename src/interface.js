window.addEventListener('load', (event) => {
  event.preventDefault()
  let element = document.getElementById('app')
  let client = new Client
  let viewChitter = new ViewChitter(element)
  let chitter = new Chitter(client)
  let chitterController = new ChitterController(chitter, viewChitter)
  viewChitter.renderHomePage()
  window.addEventListener('hashchange', (event) => {
    event.preventDefault()
    if (location.hash === "#peeps") {
      chitterController.getPeeps()
    } else if (location.hash === "#sign_up") {
      chitterController.signUp()
    } else if (location.hash === "#sign_in") {
      chitterController.signIn()
    } else if (location.hash === "#post_peep") {
      chitterController.postPeep()
    } else if (location.hash === "#home") {
      viewChitter.renderHomePage()
    } else {
      chitterController.likePeep()
    }
  })
});
