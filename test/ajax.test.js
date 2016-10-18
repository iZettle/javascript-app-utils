import ajax, { AjaxError } from "../src/ajax"

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

  describe("Assertions", () => {
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
  })

  describe("Successful ajax calls", () => {
    it("should emit the correct action with the response when successful", () => {
      ajax(createRequestObject()).subscribe(action => {
        expect(action.type).toEqual("SUCCESS")
        expect(action.payload).toEqual({ foo: "bar" })
      })

      mockAjax(200, { foo: "bar" })
    })
  })

  describe("Failing ajax calls", () => {
    it("should have the correct action type", () => {
      ajax(createRequestObject()).subscribe(action => {
        expect(action.type).toEqual("FAILURE")
      })

      mockAjax(400, "")
    })

    it("should have the error protopery set to true", () => {
      ajax(createRequestObject()).subscribe(action => {
        expect(action.error).toEqual(true)
      })

      mockAjax(400, "")
    })

    it("should have a payload containing an error with a message", () => {
      ajax(createRequestObject()).subscribe(action => {
        expect(action.payload.message).toEqual("400: \"error from backend\"")
      })

      mockAjax(400, "error from backend")
    })

    it("should have a payload containing an error the xhr object attached", () => {
      ajax(createRequestObject()).subscribe(action => {
        expect(action.payload.xhr.response).toEqual("\"error from backend\"")
      })

      mockAjax(400, "error from backend")
    })
  })
})
