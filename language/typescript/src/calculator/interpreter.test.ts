import Interpreter from "./interpreter";
import Ast from "./ast";

const interpreter = new Interpreter()

describe('Interpreter', () => {
  test('add(10, 20)を評価すると、30を返す', () => {
    const expression = Ast.add(Ast.integer(10), Ast.integer(20))
    const actual = interpreter.interpret(expression)
    expect(actual).toBe(30)
  })

  test('add(10, 0)を評価すると、10を返す', () => {
    const expression = Ast.add(Ast.integer(10), Ast.integer(0))
    const actual = interpreter.interpret(expression)
    expect(actual).toBe(10)
  })
})
