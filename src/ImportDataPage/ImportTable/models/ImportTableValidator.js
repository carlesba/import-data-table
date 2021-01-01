import dateValidator from 'is-my-date-valid'

const required = (options, value) => {
  if (!value) {
    return "Cannot be empty"
  }
}

const numeric = (options, value) => {
  const n = Number(value)
  if (isNaN(n)) {
    return "Should be a number"
  }
}

const oneOf = (options, value) => {
  const { list } = options
  if (list.indexOf(value) < 0) {
    return "Should be one of (" + list.join(", ") + ")"
  }
}

const dateFormat = (options, value) => {
  const { format } = options
  const validate = dateValidator({ format })
  try {
    if (validate(value)) return
    throw Error
  } catch {
    return "Invalid format, should match: " + format
  }
}

export const Validators = {
  required,
  numeric,
  oneOf,
  dateFormat
}


export const apply = (name, options, value) => {
  const checkErrors = Validators[name]
  if (!checkErrors) {
    throw new Error('unknown validator: ' + name)
  }
  const error = checkErrors(options, value)
  return error
}