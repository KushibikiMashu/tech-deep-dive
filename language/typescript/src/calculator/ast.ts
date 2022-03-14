import {Operator, OperatorType} from "./operator";

interface Expression {}

class BinaryExpression implements Expression {
  constructor(
    public operator: OperatorType,
    public lhs: Expression,
    public rhs: Expression) {
  }
}

/**
 * 数式の抽象構文木
 */
class Ast {
  public static add(lhs: Expression, rhs: Expression): BinaryExpression {
    return new BinaryExpression(Operator.ADD, lhs, rhs)
  }
}
