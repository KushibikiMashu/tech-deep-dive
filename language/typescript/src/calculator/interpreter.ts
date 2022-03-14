import {Assignment, BinaryExpression, Expression, Identifier, IntegerLiteral} from "./ast";
import {Operator} from "./operator";

export default class Interpreter {
  environment: Map<string, number>

  constructor() {
    this.environment = new Map<string, number>();
  }

  public interpret(expression: Expression): number {
    if (expression instanceof BinaryExpression) {
      const lhs = this.interpret(expression.lhs)
      const rhs = this.interpret(expression.rhs)

      switch (expression.operator) {
        case Operator.ADD:
          return lhs + rhs
        case Operator.SUBTRACT:
          return lhs - rhs
        case Operator.MULTIPLY:
          return lhs * rhs
        case Operator.DIVIDE:
          if (rhs === 0) {
            throw new Error("Division by zero")
          }

          return lhs / rhs
        case Operator.LESS_THAN:
          return lhs < rhs ? 1 : 0
        case Operator.LESS_OR_EQUAL:
          return lhs <= rhs ? 1 : 0
        case Operator.GREATER_THAN:
          return lhs > rhs ? 1 : 0
        case Operator.GREATER_OR_EQUAL:
          return lhs >= rhs ? 1 : 0
        case Operator.EQUAL_EQUAL:
          return lhs === rhs ? 1 : 0
        case Operator.NOT_EQUAL:
          return lhs !== rhs ? 1 : 0
        default:
          throw new Error(`Unknown operator ${expression.operator}`)
      }
    } else if (expression instanceof IntegerLiteral) {
      return expression.value
    } else if (expression instanceof Identifier) {
      const value = this.environment.get(expression.name)

      if (!value) {
        throw new Error(`Unknown identifier ${expression.name}`)
      }

      return value
    } else if (expression instanceof Assignment) {
      const value = this.interpret(expression.expression)
      this.environment.set(expression.name, value)
      return value
    }
    else {
      throw new Error('not reach here')
    }
  }
}
