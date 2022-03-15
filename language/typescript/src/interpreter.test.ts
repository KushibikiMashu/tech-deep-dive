import Interpreter from "./interpreter";
import Ast, {Program, TopLevel} from "./ast";

const interpreter = new Interpreter()

describe('Interpreter', () => {
  describe('add', () => {
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

    test('add(0, 10)を評価すると、10を返す', () => {
      const expression = Ast.add(Ast.integer(0), Ast.integer(10))
      const actual = interpreter.interpret(expression)
      expect(actual).toBe(10)
    })
  })

  describe('subtract', () => {
    test('subtract(10, 20)を評価すると、-10を返す', () => {
      const expression = Ast.subtract(Ast.integer(10), Ast.integer(20))
      const actual = interpreter.interpret(expression)
      expect(actual).toBe(-10)
    })

    test('subtract(10, 0)を評価すると、10を返す', () => {
      const expression = Ast.subtract(Ast.integer(10), Ast.integer(0))
      const actual = interpreter.interpret(expression)
      expect(actual).toBe(10)
    })

    test('subtract(0, 10)を評価すると、-10を返す', () => {
      const expression = Ast.subtract(Ast.integer(0), Ast.integer(10))
      const actual = interpreter.interpret(expression)
      expect(actual).toBe(-10)
    })
  })

  describe('multiply', () => {
    test('multiply(10, 20)を評価すると、200を返す', () => {
      const expression = Ast.multiply(Ast.integer(10), Ast.integer(20))
      const actual = interpreter.interpret(expression)
      expect(actual).toBe(200)
    })

    test('multiply(10, 0)を評価すると、0を返す', () => {
      const expression = Ast.multiply(Ast.integer(10), Ast.integer(0))
      const actual = interpreter.interpret(expression)
      expect(actual).toBe(0)
    })

    test('multiply(0, 10)を評価すると、0を返す', () => {
      const expression = Ast.multiply(Ast.integer(0), Ast.integer(10))
      const actual = interpreter.interpret(expression)
      expect(actual).toBe(0)
    })
  })

  describe('divide', () => {
    test('divide(10, 20)を評価すると、0.5を返す', () => {
      const expression = Ast.divide(Ast.integer(10), Ast.integer(20))
      const actual = interpreter.interpret(expression)
      expect(actual).toBe(0.5)
    })

    test('divide(20, 10)を評価すると、2を返す', () => {
      const expression = Ast.divide(Ast.integer(20), Ast.integer(10))
      const actual = interpreter.interpret(expression)
      expect(actual).toBe(2)
    })

    test('divide(0, 10)を評価すると、0を返す', () => {
      const expression = Ast.divide(Ast.integer(0), Ast.integer(10))
      const actual = interpreter.interpret(expression)
      expect(actual).toBe(0)
    })
  })

  describe('exception', () => {
    test('divide(10, 0)を評価すると、エラーを投げる', () => {
      const expression = Ast.divide(Ast.integer(10), Ast.integer(0))
      expect(() => interpreter.interpret(expression)).toThrow()
    })
  })

  describe('factorial', () => {
    test('1から5までフィボナッチ数列を計算すると、120を返す', () => {
      const topLevels: TopLevel[] = [
        //  def main() {
        //    fact(5)
        //  }
        Ast.DefineFunction('main', [], Ast.block(
          Ast.call('fact', Ast.integer(5)))
        ),
        // def factorial(n) {
        //    if (n < 2) {
        //      1
        //    } else {
        //      n * fact(n - 1)
        //    }
        //  }
        Ast.DefineFunction('fact', ['n'], Ast.block(
          Ast.if (
            Ast.lessThan(Ast.symbol('n'), Ast.integer(2)),
            Ast.integer(1),
            Ast.multiply(
              Ast.symbol('n'),
              Ast.call('fact', Ast.subtract(Ast.symbol('n'), Ast.integer(1)))
            )
          )
        ))
      ]

      const actual = interpreter.callMain(new Program(topLevels))
      expect(actual).toBe(120)
    })

  })
})
