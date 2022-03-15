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

export class BlockExpression implements Expression {
  constructor(public elements: Expression[]) {}
}

export class WhileExpression implements Expression {
  constructor(
    public condition: Expression,
    public body: Expression
  ) {}
}

export class IfExpression implements Expression {
  constructor(
    public condition: Expression,
    public thenClause: Expression,
    public elseClause?: Expression
  ) {}
}

export class FunctionCall implements Expression {
  constructor(
    public name: string,
    public args: Expression[]
  ) {}
}

export class Println implements Expression {
  constructor(public arg: Expression) {}
}

export interface TopLevel {}

export class Program {
  constructor(
    public definitions: TopLevel[]
  ) {}
}

export class FunctionDefinition implements TopLevel {
  constructor(
    public name: string,
    public args: string[],
    public body: Expression
  ){}
}

export class GlobalVariableDefinition implements TopLevel {
  constructor(
    public name: string,
    public expression: Expression
  ) {}
}

export class Environment {
  constructor(
    public bindings: Map<string, number>,
    public next?: Environment
  ) {}

  public findBindings(name: string): Map<string, number> | null {
    if (this.bindings.get(name) !== null) {
      return this.bindings
    }

    if (this.next) {
      return this.next.findBindings(name)
    }

    return null
  }
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

  public static lessThan(lhs: Expression, rhs: Expression): BinaryExpression {
    return new BinaryExpression(Operator.LESS_THAN, lhs, rhs)
  }

  public static lessOrEqual(lhs: Expression, rhs: Expression): BinaryExpression {
    return new BinaryExpression(Operator.LESS_OR_EQUAL, lhs, rhs)
  }

  public static greaterThan(lhs: Expression, rhs: Expression): BinaryExpression {
    return new BinaryExpression(Operator.GREATER_THAN, lhs, rhs)
  }

  public static greaterOrEqual(lhs: Expression, rhs: Expression): BinaryExpression {
    return new BinaryExpression(Operator.GREATER_OR_EQUAL, lhs, rhs)
  }

  public static equalEqual(lhs: Expression, rhs: Expression): BinaryExpression {
    return new BinaryExpression(Operator.EQUAL_EQUAL, lhs, rhs)
  }


  public static assignment(name: string, expression: Expression): Assignment {
    return new Assignment(name, expression)
  }

  public static symbol(name: string): Identifier {
    return new Identifier(name)
  }

  public static block(...elements: Expression[]): BlockExpression {
    return new BlockExpression(elements)
  }

  public static call(name: string, ...args: Expression[]): FunctionCall {
    return new FunctionCall(name, args)
  }

  public static while(condition: Expression, body: Expression): WhileExpression {
    return new WhileExpression(condition, body)
  }

  public static if(condition: Expression, thenClause: Expression, elseClause?: Expression): IfExpression {
    return new IfExpression(condition, thenClause, elseClause)
  }

  public static Println(arg: Expression): Println {
    return new Println(arg)
  }

  public static DefineFunction(name: string, args: string[], body: Expression):FunctionDefinition {
    return new FunctionDefinition(name, args, body)
  }
}
