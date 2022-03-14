export const Operator = {
  ADD: '+',
  SUBTRACT: '-',
  MULTIPLY: '*',
  DIVIDE: '/',
} as const
export type OperatorType = typeof Operator[keyof typeof Operator]
