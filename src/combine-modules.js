import { combineReducers } from "redux"
import { combineEpics } from "redux-observable"

const expectedInvalidModuleNames = [
  "__esModule"
].join() // join because Array.includes does not work

const isValidModuleName = name => {
  const isValid = /^[a-zA-Z\-0-9]*$/.test(name)
  const isExpected = expectedInvalidModuleNames.includes(name)

  if (!isValid && !isExpected) {
    console.warn(`"${name}" is not a valid module name`)
  }

  return isValid
}

export const moduleMapToArray = moduleMap =>
  Object.keys(moduleMap)
    .filter(isValidModuleName)
    .map(name => moduleMap[name])

export const extractReducers = modules => modules
  .filter(module => module.name && module.reducer)
  .reduce((reducers, module) => {
    reducers[module.name] = module.reducer
    return reducers
  }, {})

export const extractEpics = modules => modules
  .filter(module => module.epic)
  .map(module => module.epic)

export default moduleMap => {
  const modules = moduleMapToArray(moduleMap)
  const reducers = extractReducers(modules)
  const epics = extractEpics(modules)

  return {
    reducer: combineReducers(reducers),
    epic: combineEpics(...epics)
  }
}

