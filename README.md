# ads2-midterm
This program is a Postfix++ arithmetic calculator created using JavaScript and can perform simple mathematical calculations like addition and multiplication, as well as functions such as finding the cosine and logarithms. It also runs functions that can assign key-pair values, perform value lookups, and delete values. The program also accounts for error handling, logging errors, and prompting users for the correct input.

The program uses the data structures arrays, stacks, and hash tables. Arrays are used to store and process user input, such as ensuring that user input is of the correct length for certain functions. Stacks are used to store values used to compute the Postfix expression. We iterate through the input array and push each value to the “bottom” of the stack. When we encounter an operand, we pop the two “top”-most values of the stack for computation. A hash table was used for key-pair value lookups, as they allow for rapid data retrieval.

## Requirements

- Node.js

## How to run

From this folder:
node index.js

The program prints a menu and waits for a choice:

```
---------------------------
Menu
---------------------------
1: PostFix++ calculator
2: Search variable
3: Assign variable
4: Delete variable
5: Exit program
Input (1-5):
```

After each action you can repeat it (`1`) or return to the menu (`2`).

## Usage

### 1. Postfix calculator

Enter numbers and operators separated by spaces. Each operator is applied to the two values already entered: the program pops the latest value first, then the one before it, and prints `latest operator earlier = result`.

```
20 30 +
```

```
30 + 20 = 50
Result:  50
```

Decimals are accepted. A non-integer result is printed to two decimal places.

```
4 10 /
```

```
10 / 4 = 2.50
Result:  2.50
```

Letters stand for variables that were assigned earlier. With `A` set to `9`:

```
A 5 *
```

```
5 * 9 = 45
Result:  45
```

### 2. Search variable

Look up one letter (`A`–`Z`). If it has a value, the program prints it. Otherwise it reports that the variable has not been declared.

```
Search for a variable: A
>> A = 9
```

### 3. Assign variable

Store an integer under a single letter. A later assignment to the same letter replaces the old value.

```
Assign value to a variable (e.g. a 9): a 9
>> A has been set as 9
```

Letters are stored in uppercase, so `a` and `A` are the same variable.

### 4. Delete variable

Remove one stored letter. If that letter was never assigned, the program says it does not exist.

### 5. Exit

Choice `5` ends the program.

## Error handling

The calculator checks the expression before returning a result:

| Situation | Message |
| --- | --- |
| Fewer than three tokens | `Invalid input: your expression is too short.` |
| Unknown token (not a number, `A`–`Z`, or `+ - * /`) | `Invalid input: invalid expression` |
| Operator with fewer than two values on the stack | `Invalid: Not enough values to compute` |
| Letter that was never assigned | `Error: One or more variables are not defined.` |
| Division by zero | `Invalid input: Cannot divide by 0` |
| No operator in the expression | `Invalid input: No operator found in expression.` |
| Extra values left on the stack | `Error: Incomplete expression` |
| Menu choice outside `1`–`5` | `Please enter a valid input` |

Variable commands also reject the wrong number of tokens, a key that is not a single letter `A`–`Z`, and a value that is not an integer.