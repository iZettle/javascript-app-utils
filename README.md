`javascript-app-utils`
======================

Utilities and helpers for javascript applications developed with React, Redux and RxJS.

`combineModules()`
------------------
Combine modules that has a reducer and/or an epic:
```js
import { applyMiddleware, createStore } from "redux"
import { createEpicMiddleware } from "redux-observable"
import { combineModules } from "@izettle/app-utils"
import * as modules from "./modules"

const rootModule = combineModules(modules)

const store = createStore(rootModule.reducer, {}, applyMiddleware(
  createEpicMiddleware(rootModule.epic)
))
```

Modules must look like this:
```js
const exampleModule = {
  name: "example",
  reducer: (state, action) => state,
  epic: action$ => action$
}
```
