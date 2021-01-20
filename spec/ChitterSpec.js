describe('Chitter', () => {
  let mockClient
  let mockElement
  let chitter

  beforeEach(() => {
    mockClient = { get: () => Promise.resolve(mockPeeps),
    post: () => Promise.resolve(data),
    postPeep: () => {},
    authorizedRequest: () => {} }
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    const mockFetchPromise = Promise.resolve({ // 3
      json: () => mockJsonPromise,
    });
    chitter = new Chitter(mockClient)
  })

  it('can get peeps', () => {
    spyOn(mockClient, 'get')
    chitter.peeps()
    expect(mockClient.get).toHaveBeenCalledWith("https://chitter-backend-api-v2.herokuapp.com/peeps")
  })

  it('can create a new user', () => {
    spyOn(mockClient, 'post').and.returnValue(new Promise(() => {}))
    chitter.createNewUser('kay', 'mypassword')
    expect(mockClient.post).toHaveBeenCalledWith("https://chitter-backend-api-v2.herokuapp.com/users",
    '{"user": {"handle":"kay", "password":"mypassword"}}')
  })

  it('can login a user', () => {
    spyOn(mockClient, 'post')
    chitter.loginUser('kay', 'mypassword')
    expect(mockClient.post).toHaveBeenCalledWith("https://chitter-backend-api-v2.herokuapp.com/sessions",
    '{"session": {"handle":"kay", "password":"mypassword"}}')
  })

  it('can get a peep by its id', () => {
    spyOn(mockClient, 'get')
    chitter.getSinglePeep(1)
    expect(mockClient.get).toHaveBeenCalledWith("https://chitter-backend-api-v2.herokuapp.com/peeps/1")
  })

  it('can post a peep', () => {
    spyOn(mockClient, 'postPeep')
    chitter.postPeep('my first note')
    expect(mockClient.postPeep).toHaveBeenCalledWith("https://chitter-backend-api-v2.herokuapp.com/peeps", chitter.sessionKey, chitter.userId, 'my first note')
  })

  it('can delete a peep created by the user', () => {
    spyOn(mockClient, 'authorizedRequest')
    chitter.deletePeep(1)
    expect(mockClient.authorizedRequest).toHaveBeenCalledWith("https://chitter-backend-api-v2.herokuapp.com/peeps/1", chitter.sessionKey, 'DELETE')
  })

  it('can like a peep', () => {
    spyOn(mockClient, 'authorizedRequest')
    chitter.likePeep(2)
    expect(mockClient.authorizedRequest).toHaveBeenCalledWith(`https://chitter-backend-api-v2.herokuapp.com/peeps/2/likes/${chitter.userId}`, chitter.sessionKey, 'PUT')
  })

  it('can delete a like created by a user', () => {
    spyOn(mockClient, 'authorizedRequest')
    chitter.deleteLike(2)
    expect(mockClient.authorizedRequest).toHaveBeenCalledWith(`https://chitter-backend-api-v2.herokuapp.com/peeps/2/likes/${chitter.userId}`, chitter.sessionKey, 'DELETE')
  })

})
