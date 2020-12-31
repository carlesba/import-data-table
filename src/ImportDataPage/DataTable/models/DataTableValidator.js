
const required = (options, value) => !value
  ? "Cannot be empty"
  : false

const Validators = { 
  required
}


export const apply = (name, options, value) => {
  const checkErrors = Validators[name]
  if (!checkErrors) {
    throw new Error('unknown validator: ' + name)
  }
  const error = checkErrors(options, value)
  return error
}