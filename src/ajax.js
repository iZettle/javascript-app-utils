import { Observable } from "rxjs"

export const ajax = opts => Observable
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
    Observable.of({
      type: opts.failureType,
      payload: error.xhr.response,
      error: true
    })
  ))
