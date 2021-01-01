import { Validators } from './ImportTableValidator'

test("required validator", () => {
  expect(Validators.required(null, "")).toBe("Cannot be empty")
  expect(Validators.required(null, undefined)).toBe("Cannot be empty")
  expect(Validators.required(null, "0")).toBeFalsy()
})

test("numeric validator", () => {
  expect(Validators.numeric(null, "")).toBeFalsy()
  expect(Validators.numeric(null, "0")).toBeFalsy()
  expect(Validators.numeric(null, "1234.12")).toBeFalsy()
  expect(Validators.numeric(null, "124710")).toBeFalsy()
  expect(Validators.numeric(null, "a")).toBe("Should be a number")
  expect(Validators.numeric(null, "1234,12")).toBe("Should be a number")
  expect(Validators.numeric(null, "1234.12.4")).toBe("Should be a number")
})

test("oneOf validator", () => {
  const options = { list: ["EA", "G", "M"] }
  expect(Validators.oneOf(options, "")).toBe("Should be one of (EA, G, M)")
  expect(Validators.oneOf(options, "ea")).toBe("Should be one of (EA, G, M)")
  expect(Validators.oneOf(options, "EAG")).toBe("Should be one of (EA, G, M)")
  expect(Validators.oneOf(options, "EA")).toBeFalsy()
  expect(Validators.oneOf(options, "G")).toBeFalsy()
  expect(Validators.oneOf(options, "M")).toBeFalsy()
})

test("date validator", () => {
  const options = { format: "YYYY-MM-DD" }

  expect(Validators.dateFormat(options, "asdfasdf")).toBe("Invalid format, should match: YYYY-MM-DD")
  expect(Validators.dateFormat(options, "2020-1212-")).toBe("Invalid format, should match: YYYY-MM-DD")
  expect(Validators.dateFormat(options, "2020-12-12")).toBeFalsy()
})
