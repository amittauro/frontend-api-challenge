class ViewChitter {
  constructor(element) {
    this.element = element
  }

  renderHomePage(url) {
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

  renderPost() {
    let text = `
    <div>Thanks for posting a peep! You can click on the link below to view the last 50 peeps</div>
    <a href="file:///Users/student/Makers/week8/frontend-api-challenge/src/index.html#peeps">View peeps</a>
    `
    this.element.innerHTML = text
  }

  render(data) {
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
  }
}
