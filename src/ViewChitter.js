class ViewChitter {
  constructor(element) {
    this.element = element
  }

  renderHomePage() {
    let url
    if (location.hash.length > 0) {
      url = location.href.slice(0, -location.hash.length)
    } else {
      url = location.href
    }
    let text =
      `<a href="${url}#sign_up">Sign up</a>
      <a href="${url}#sign_in">Sign in</a>
      <a href="${url}#post_peep">Post peep</a>
      <a href="${url}#peeps">View peeps</a>
      `
    this.element.innerHTML = text
  }

  renderSignUp() {
    let text =
      `<form id='sign-up' action="index.html" method="post">
      Sign-up
      <input id="handle" type="text" name="handle">
      <input id="password" type="text" name="password">
      <input type="submit" value="Submit">
      </form>
      `
    this.element.innerHTML = text
  }

  renderSignIn() {
    let text =
      [`<div>Please log in</div>`,
      `<form id='sign-in' action="index.html" method="post">`,
      `Sign-in`,
      `<input type="text" name="username" id='sign-in-handle'>`,
      `<input type="text" name="password" id='sign-in-password'>`,
      `<input type="submit" value="Submit">`,
    `</form>`]
    this.element.innerHTML = text.join('')
  }

  renderPostPeep() {
    let text =
      `<div>post a peep, like a peep or delete a peep</div>
      <form id='post-peep'>
      <input type="text" id ='peep' name="peep">
      <input type="submit" value="Post peep">
      </form>`
    this.element.innerHTML = text
  }

  renderSignUpError() {
    let length = location.hash.length
    let url = location.href.slice(0, -length)
    let text = `<a href="${url}#sign_up">Sign up</a>`
    this.element.innerHTML = text
  }

  renderPeeps(data) {
    let length = location.hash.length
    let url = location.href.slice(0, -length)
    let text = [`<ul>`]
    let peeps = data.forEach(peep => text.push(
      `
      <li id="${peep.id}">${peep.body}
      <a href="${url}#${peep.id}">
      Like peep</a>
      </li>
      `
    ))
    text.push(`</ul>`)
    this.element.innerHTML = text.join('')
  }
}
