import {
  Assignment,
  BinaryExpression, BlockExpression, Environment,
  Expression, FunctionCall, FunctionDefinition, GlobalVariableDefinition,
  Identifier,
  IfExpression,
  IntegerLiteral, Println, Program,
  WhileExpression
} from "./ast";
import {Operator} from "./operator";

export default class Interpreter {
  private variableEnvironment: Environment;
  private functionEnvironment: Map<string, FunctionDefinition>

  constructor() {
    this.variableEnvironment = this.newEnvironment();
    this.functionEnvironment = new Map<string, FunctionDefinition>();
  }

  newEnvironment(next?: Environment) {
    return new Environment(new Map(), next)
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
      const bindings = this.variableEnvironment.findBindings(expression.name)
      if (!bindings) {
        throw new Error(`Unknown identifier ${expression.name}`)
      }
      return bindings.get(expression.name) ?? 0
    } else if (expression instanceof Assignment) {
      const bindings = this.variableEnvironment.findBindings(expression.name)
      const value = this.interpret(expression.expression)
      if (bindings) {
        bindings.set(expression.name, value)
      } else {
        this.variableEnvironment.bindings.set(expression.name, value)
      }
      return value
    } else if (expression instanceof IfExpression) {
      const condition = this.interpret(expression.condition)
      if (condition === 1) {
        // 条件が true の場合
        return this.interpret(expression.thenClause)
      } else {
        // 条件が false の場合
        const elseClause = expression.elseClause
        if (!elseClause) {
          return 1
        }
        return this.interpret(elseClause)
      }
    } else if (expression instanceof WhileExpression) {
      while(true) {
        const condition = this.interpret(expression.condition)
        if (condition === 1) {
          this.interpret(expression.body)
        } else {
          break
        }
      }
      return 1
    } else if (expression instanceof BlockExpression) {
      let value = 0
      for (const element of expression.elements) {
        value = this.interpret(element)
      }
      return value
    } else if (expression instanceof FunctionCall) {
      const definition = this.functionEnvironment.get(expression.name)
      if (!definition) {
        throw new Error(`Unknown function ${expression.name}`)
      }
      // 実引数
      const actualParams = expression.args
      const values = actualParams.map(param => this.interpret(param))
      const backup = this.variableEnvironment
      this.variableEnvironment = this.newEnvironment(this.variableEnvironment)
      // 仮引数
      const formalParams = definition.args
      for (let i = 0; i < formalParams.length; i++) {
        const formalParamName = formalParams[i]
        this.variableEnvironment.bindings.set(formalParamName, values[i])
      }
      const result = this.interpret(definition.body)
      this.variableEnvironment = backup
      return result
    } else if (expression instanceof Println) {
      return this.interpret(expression.arg)
    } else {
      console.log(expression);
      throw new Error('not reach here')
    }
  }

  public callMain(program: Program): number {
    for (const definition of program.definitions) {
      if (definition instanceof FunctionDefinition) {
        this.functionEnvironment.set(definition.name, definition)
      } else if (definition instanceof GlobalVariableDefinition) {
        this.variableEnvironment.bindings.set(
          definition.name,
          this.interpret(definition.expression)
        )
      }
    }

    const mainFunction = this.functionEnvironment.get('main')
    if (mainFunction) {
      return this.interpret(mainFunction.body)
    } else {
      throw new Error('main function is not defined')
    }
  }
}
