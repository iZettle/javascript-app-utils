`javascript-app-utils`
======================

Utilities and helpers for javascript applications developed with React, Redux and RxJS.

`combineModules()`
------------------
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
