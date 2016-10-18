import ajax from "../src/ajax"

const mockAjax = (status, jsonResponse) =>
  jasmine.Ajax.requests.mostRecent().respondWith({
    status,
    responseText: JSON.stringify(jsonResponse)
  })

const createRequestObject = () => ({
  method: "GET",
  url: "/foo",
  successType: "SUCCESS",
  failureType: "FAILURE"
})

describe("ajax()", () => {
  beforeEach(() => jasmine.Ajax.install())
  afterEach(() => jasmine.Ajax.uninstall())

  it("should be a function", () => {
    expect(typeof ajax).toEqual("function")
  })

  it("should throw if no url is given", () => {
    let request = createRequestObject()
    delete request.url

    expect(() => ajax(request)).toThrowError()
  })

  it("should throw if no method is given", () => {
    let request = createRequestObject()
    delete request.method

    expect(() => ajax(request)).toThrowError()
  })

  it("should throw if no successType is given", () => {
    let request = createRequestObject()
    delete request.successType

    expect(() => ajax(request)).toThrowError()
  })

  it("should throw if no failureType is given", () => {
    let request = createRequestObject()
    delete request.failureType

    expect(() => ajax(request)).toThrowError()
  })

  it("should emit the correct action with the response when successful", () => {
    ajax(createRequestObject()).subscribe(action => {
      expect(action.type).toEqual("SUCCESS")
      expect(action.payload).toEqual({ foo: "bar" })
    })

    mockAjax(200, { foo: "bar" })
  })

  it("should emit an error action with the correct type, message and error marker when it fails", () => {
    ajax(createRequestObject()).subscribe(action => {
      expect(action.type).toEqual("FAILURE")
      expect(action.payload).toEqual({ error: "nej" })
      expect(action.error).toBeDefined()
    })

    mockAjax(400, { error: "nej" })
  })
})
