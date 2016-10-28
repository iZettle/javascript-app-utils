import assert from "assert"
import { Observable } from "rxjs/Observable"
import "rxjs/add/observable/dom/ajax"
import "rxjs/add/observable/of"
import "rxjs/add/operator/map"
import "rxjs/add/operator/catch"

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
        "Content-Type": "application/json"
      }
    })
    .map(request => ({
      type: opts.successType,
      payload: request.response
    }))
    .catch(error => Observable.of({
      type: opts.failureType,
      payload: error,
      error: true
    }))
}
