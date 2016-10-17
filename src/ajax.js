import { Observable } from "rxjs"

export default opts => Observable
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
  .catch(error => (
    // TODO: guard for JSON parse errors
    Observable.of({
      type: opts.failureType,
      payload: JSON.parse(error.xhr.response),
      error: true
    })
  ))
