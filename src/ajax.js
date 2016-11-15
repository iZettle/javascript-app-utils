import assert from "assert"
import { Observable } from "rxjs/Observable"
import "rxjs/add/observable/dom/ajax"
import "rxjs/add/observable/of"
import "rxjs/add/operator/map"
import "rxjs/add/operator/catch"

const addMetaIfPresent = (action, meta) => {
  if (meta) action.meta = meta
  return action
}

export default opts => {
  assert(opts.url, "You MUST provide an `url`")
  assert(opts.method, "You MUST provide an `method`")
  assert(opts.successType, "You MUST provide a `successType`")
  assert(opts.failureType, "You MUST provide a `failureType`")

  const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json"
  }

  return Observable
    .ajax({
      method: opts.method,
      url: opts.url,
      body: opts.body,
      headers: opts.headers || defaultHeaders
    })
    .map(request => addMetaIfPresent({
      type: opts.successType,
      payload: request.response
    }, opts.meta))
    .catch(error => Observable.of(addMetaIfPresent({
      type: opts.failureType,
      payload: error,
      error: true
    }, opts.meta)))
}
