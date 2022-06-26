from sympy.abc import *
from sympy import solve
from sympy.parsing.sympy_parser import parse_expr
from sympy.plotting import plot
from PIL import Image
import json


def solveAlgebraic(equation, degree):
    try:
        print("Degree of the equation: ", degree)
        lhs = parse_expr(equation.split("=")[0])
        rhs = parse_expr(equation.split("=")[1])
        solution = solve(lhs-rhs)
    except:
        return 'Invalid Equation'
    p = plot(str(lhs-rhs), show=False)
    p.save(path='solution.png')
    return solution

def solveArithmetic(expression):
    def operate(fb, sb, op):
        result = 0
        if operator == '+':
            result = int(first_buffer) + int(second_buffer)
        elif operator == '-':
            result = int(first_buffer) - int(second_buffer)
        elif operator == 'x':
            result = int(first_buffer) * int(second_buffer)
        elif operator == '/':
            result = int(first_buffer) / int(second_buffer)
        return result

    if not expression or not expression[0].isdigit():
        return 'Invalid Expression'

    operator = ''
    first_buffer = ''
    second_buffer = ''

    for i in range(len(expression)):
        if expression[i].isdigit():
            if len(second_buffer) == 0 and len(operator) == 0:
                first_buffer += expression[i]
            else:
                second_buffer += expression[i]
        else:
            if len(second_buffer) != 0:
                result = operate(first_buffer, second_buffer, operator)
                first_buffer = str(result)
                second_buffer = ''
            operator = expression[i]

    result = int(first_buffer)
    if len(second_buffer) != 0 and len(operator) != 0:
        result = operate(first_buffer, second_buffer, operator)

    return result


def calculate(operation):
    string, head = '', None
    temp = string = str(operation)
    if '=' not in string:
        if 'x' in string:
            string = string.replace('x', '*')
        if 'X' in string:
            string = string.replace('X', '*')
        try:
            result = eval(string)
            return string, result
        except:
            return string, 'Invalid Expression'

    operation = string
    string = ''
    degree = 1
    for k in operation:
        if head is None:
            head = k
            string += head
        if k in ['+', '-', '*', '/', '='] or head in ['+', '-', '*', '/', '=']:
            head = k
            string += head
        elif k.isnumeric() and not head.isnumeric():
            head = k
            added = '**' + k
            string += added
            degree = max(degree, int(k))
        elif not k.isnumeric() and head.isnumeric():
            head = k
            added = '*' + k
            string += added

    if '=' not in string:
        return string, solveArithmetic(string)
    else:
        return string, solveAlgebraic(string, degree)
