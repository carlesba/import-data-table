import * as ImportTableValidator from './ImportTableValidator'

const omit = (key, _data) => {
  const data = { ..._data }
  delete data[key]
  return data
}

export const create = (config, id) => {
  return config.display.reduce(
    (acc, field) => ({ ...acc, [field]: "", id }),
    {},
  )
}
export const createWithValues = (config, id, values) => {
  return config.display.reduce(
    (acc, field, index) => ({ ...acc, [field]: values[index] || "", id }),
    {},
  )
}
export const setField = (field, value, item) => ({
  ...item,
  [field]: value
})

export const refuteItemField = (rules, value) => {
  try {
    Object.keys(rules).forEach(ruleName => {
      const options = rules[ruleName] === true
        ? {}
        : rules[ruleName]
      const error = ImportTableValidator.apply(ruleName, options, value)
      if (error) {
        throw error
      }
    })
  } catch (error) {
    return error
  }
}

export const refuteItem = (config, item) => {
  let errors = {}
  Object.keys(item).forEach(fieldName => {
    const rules = config.fields?.[fieldName]?.rules
    if (!rules) return
    const error = refuteItemField(rules, item[fieldName])
    if (error) {
      errors[fieldName] = error
    }
  })
  return errors
}

export const updateItemErrors = (fieldName, fieldError, itemErrors) => {
  let errors = itemErrors || {}
  errors = fieldError
    ? {...errors, [fieldName]: fieldError}
    : omit(fieldName, errors)
  
  const numberOfFieldsWithError = Object.keys(errors).length
  return numberOfFieldsWithError === 0
    ? undefined
    : errors
}
