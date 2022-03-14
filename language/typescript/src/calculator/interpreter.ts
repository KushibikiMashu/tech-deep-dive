import {BinaryExpression, Expression, IntegerLiteral} from "./ast";
import {Operator} from "./operator";

export default class Interpreter {
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
        default:
          throw new Error(`Unknown operator ${expression.operator}`)
      }
    } else if (expression instanceof IntegerLiteral) {
      return expression.value
    } else {
      throw new Error('not reach here')
    }
  }
}
