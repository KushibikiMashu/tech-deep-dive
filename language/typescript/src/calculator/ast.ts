import {Operator, OperatorType} from "./operator";

export interface Expression {}

export class BinaryExpression implements Expression {
  constructor(
    public operator: OperatorType,
    public lhs: Expression,
    public rhs: Expression
  ) {}
}

export class IntegerLiteral implements Expression {
  constructor(public value: number) {}
}

export class Assignment implements Expression {
  constructor(
    public name: string,
    public expression: Expression
  ) {}
}

export class Identifier implements Expression {
  constructor(public name: string) {}
}

/**
 * 数式の抽象構文木
 */
export default class Ast {
  public static add(lhs: Expression, rhs: Expression): BinaryExpression {
    return new BinaryExpression(Operator.ADD, lhs, rhs)
  }

  public static subtract(lhs: Expression, rhs: Expression): BinaryExpression {
    return new BinaryExpression(Operator.SUBTRACT, lhs, rhs)
  }

  public static multiply(lhs: Expression, rhs: Expression): BinaryExpression {
    return new BinaryExpression(Operator.MULTIPLY, lhs, rhs)
  }

  public static divide(lhs: Expression, rhs: Expression): BinaryExpression {
    return new BinaryExpression(Operator.DIVIDE, lhs, rhs)
  }

  public static integer(value: number): IntegerLiteral {
    return new IntegerLiteral(value)
  }

  public static assignment(name: string, expression: Expression): Assignment {
    return new Assignment(name, expression)
  }

  public static identifier(name: string): Identifier {
    return new Identifier(name)
  }
}
