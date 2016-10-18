import assert from "assert"
import { Observable } from "rxjs"

export class AjaxError extends Error {
  constructor(error) {
    super(error)
    this.name = "AjaxError"
    this.message = `${error.xhr.status}: ${error.xhr.response}`
    this.xhr = error.xhr
  }
}

export default opts => {
  assert(opts.url, "You MUST provide an `url`")
  assert(opts.method, "You MUST provide an `method`")
  assert(opts.successType, "You MUST provide a `successType`")
  assert(opts.failureType, "You MUST provide a `failureType`")

  return Observable
    .ajax({
      method: opts.method,
      url: opts.url,
      body: opts.body,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        credentials: "include"
      }
    })
    .map(request => ({
      type: opts.successType,
      payload: request.response
    }))
    .catch(error => Observable.of({
      type: opts.failureType,
      payload: new AjaxError(error),
      error: true
    }))
}
