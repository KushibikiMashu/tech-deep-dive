export const Operator = {
  ADD: '+',
  SUBTRACT: '-',
  MULTIPLY: '*',
  DIVIDE: '/',
  LESS_THAN: '<',
  LESS_OR_EQUAL: '<=',
  GREATER_THAN: '>',
  GREATER_OR_EQUAL: '>=',
  EQUAL_EQUAL: '===',
  NOT_EQUAL: '!==',
} as const
export type OperatorType = typeof Operator[keyof typeof Operator]
