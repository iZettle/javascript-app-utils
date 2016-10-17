import ajax from "../src/ajax"

const mockAjax = (status, jsonResponse) =>
  jasmine.Ajax.requests.mostRecent().respondWith({
    status,
    responseText: JSON.stringify(jsonResponse)
  })

describe("ajax()", () => {
  beforeEach(() => jasmine.Ajax.install())
  afterEach(() => jasmine.Ajax.uninstall())

  it("should be a function", () => {
    expect(typeof ajax).toEqual("function")
  })

  it("should emit the correct action with the response when successful", () => {
    ajax({
      method: "GET",
      url: "/foo",
      successType: "SUCCESS",
      failureType: "FAILURE"
    }).subscribe(action => {
      expect(action.type).toEqual("SUCCESS")
      expect(action.payload).toEqual({ foo: "bar" })
    })

    mockAjax(200, { foo: "bar" })
  })

  it("should emit an error action with the correct type when it fails", () => {
    ajax({
      method: "GET",
      url: "/foo",
      successType: "SUCCESS",
      failureType: "FAILURE"
    }).subscribe(action => {
      expect(action.type).toEqual("FAILURE")
      expect(action.payload).toEqual({ error: "nej" })
      expect(action.error).toBeDefined()
    })

    mockAjax(500, { error: "nej" })
  })
})
