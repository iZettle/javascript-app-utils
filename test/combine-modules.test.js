import combineModules, {
  moduleMapToArray,
  extractReducers,
  extractEpics
} from "../src/combine-modules"

describe("combineModules()", () => {
  it("should return an object the correct keys", () => {
    const modules = {
      foo: { name: "foo" },
      bar: { name: "bar" }
    }

    expect(combineModules(modules).reducer).not.toBeUndefined()
    expect(combineModules(modules).epic).not.toBeUndefined()
  })

  describe("moduleMapToArray()", () => {
    it("should turn a map of modules into an array", () => {
      const modules = {
        foo: "bar",
        bar: "baz"
      }

      expect(moduleMapToArray(modules)).toEqual(["bar", "baz"])
    })

    it("should not include modules that are not in the allowed pattern", () => {
      const modules = {
        lowercase: "lowercase",
        "snake-case": "snake-case",
        "snakier-snake-case": "snakier-snake-case",
        "with-numb3rs-1n-name": "with-numb3rs-1n-name",
        "camelCase": "camelCase",
        __esModule: "not-allowed"
      }

      expect(moduleMapToArray(modules)).toEqual([
        "lowercase",
        "snake-case",
        "snakier-snake-case",
        "with-numb3rs-1n-name",
        "camelCase": "camelCase",
      ])
    })

    it("should warn when including modules with invalid name", () => {
      console.warn = jasmine.createSpy("warn")
      moduleMapToArray({ "invalid module name": "nej" })
      expect(console.warn).toHaveBeenCalled()
    })
  })

  describe("extractReducers()", () => {
    it("should create a name -> reducer map of all passed modules", () => {
      const modules = [
        { name: "foo", reducer: "dummy value" },
        { name: "bar", reducer: "dummy value" }
      ]

      expect(extractReducers(modules)).toEqual({
        foo: "dummy value",
        bar: "dummy value"
      })
    })
  })

  describe("extractEpics()", () => {
    it("should return an array of all the modules' epics", () => {
      const modules = [
        { name: "foo", epic: "dummyEpic1" },
        { name: "bar", epic: "dummyEpic2" }
      ]

      expect(extractEpics(modules)).toEqual(["dummyEpic1", "dummyEpic2"])
    })

    it("should not try to include non-existing epics", () => {
      const modules = [
        { name: "foo", epic: "dummyEpic1" },
        { name: "bar" }
      ]

      expect(extractEpics(modules)).toEqual(["dummyEpic1"])
    })
  })
})

