import * as DataTableValidator from './DataTableValidator'

export const create = (config, id) => {
  return Object.keys(config.fields).reduce(
    (acc, field) => ({ ...acc, [field]: "", id }),
    {},
  )
}

export const setField = (field, value, item) => ({
  ...item,
  [field]: value
})

export const refuteItemField = (rules, value) => {
  const error = rules.find(rule => {
    return DataTableValidator.apply(rule.name, rule.options, value)
  })
  return error
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