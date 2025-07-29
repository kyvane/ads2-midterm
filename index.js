// import readline required to read user input
const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const rl = readline.createInterface({ input, output });

// hash table constructor
class HashTable {
    constructor() {
        // create new hash table with 26 buckets for 26 alphabets
        this.size = 26;
        this.hash_table = [];

        // initialize each index with empty array for collision handling
        for (let i = 0; i < this.size; i++) {
            this.hash_table[i] = [];
        }
    }

    // hash function to get the index of the key
    // computes an index for a given key by summing character codes and taking modulo 26
    hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % this.hash_table.length;
    }

    // funcction to set a key-value pair
    insert(key, value) {
        // get index of the key
        const index = this.hash(key);
        // get bucket of the index
        const bucket = this.hash_table[index];

        // loop through each bucket in the hash table
        for (var i = 0; i < bucket.length; i++) {
            // if a matching key is found, replace the current value
            if (bucket[i][0] == key) {
                bucket[i][1] = value;
                return;
            }
        }

        // push the key and value into the bucket
        bucket.push([key, value]);
    }

    // function to look for a key and return the value
    search(key) {
        // get index of the key
        const index = this.hash(key);
        // get bucket of the index
        const bucket = this.hash_table[index];

        // loop through each bucket in the hash table
        for (var i = 0; i < bucket.length; i++) {
            // if a matching key is found, return the value
            if (bucket[i][0] == key) {
                return bucket[i][1];
            }
        }

        // otherwise, return undefined
        return undefined;
    }

    // function to delete the key-value pair in the hash table
    delete(key) {
        // get index of the key
        const index = this.hash(key);
        // get bucket of the index
        const bucket = this.hash_table[index];

        // loop through each bucket in the hash table
        for (var i = 0; i < bucket.length; i++) {
            // if a matching key is found, remove the key-pair value
            if (bucket[i][0] == key) {
                bucket.splice(i, 1);
                // if key is removed successfully, return true
                return true;
            }
        }

        // return fals if there is no match
        return false;
    }
}

// stack constructor
class Stack {
    constructor() {
        this.stack = [];
    }

    // method to push element into the stack
    push(element) {
        this.stack.push(element);
    }

    // method to pop top most element from the stack
    pop() {
        return this.stack.pop();
    }

    // method to get the size of the stack
    size() {
        return this.stack.length;
    }

    // method to check if the stack is empty
    isEmpty() {
        if (this.stack.length == 0) {
            return true;
        } else {
            return false;
        }
    }
}

// main function to run the program
function main() {
    // promp for use input
    rl.question(
        "---------------------------\nMenu\n---------------------------\n1: PostFix++ calculator\n2: Search variable\n3: Assign variable\n4: Delete variable\n5: Exit program\nInput (1-5): ",
        (userInput) => {
            // remove whitespace before and after user input
            userInput = userInput.trim();

            // check user input and run respective function
            switch (userInput) {
                case "1":
                    console.log("---------------------------");
                    postfixCalculator();
                    break;
                case "2":
                    console.log("---------------------------");
                    searchVar();
                    break;
                case "3":
                    console.log("---------------------------");
                    insertVar();
                    break;
                case "4":
                    console.log("---------------------------");
                    deleteVar();
                    break;
                case "5":
                    // case to exit program
                    console.log("---------------------------");
                    process.exit();
                default:
                    // case if user gives other inputs
                    console.log("Please enter a valid input");
                    break;
            }
            // run program again if user gives other inputs
            main();
        }
    );
}

// run program
main();

// create new hash table
const hashTable = new HashTable();

// function to ask follow up question
function followUpQn(questionText, repeatFunction) {
    // prompt for user input
    rl.question(questionText, (userInput) => {
        // remove whitespace before and after user input
        userInput = userInput.trim();

        // check user input and run respective function
        switch (userInput) {
            case "1":
                // repeat current function
                repeatFunction();
                break;
            case "2":
                // return to menu
                main();
                break;
            default:
                // case if user gives other inputs
                console.log("Please enter a valid input.");
                followUpQn(questionText, repeatFunction);
                break;
        }
    });
}

// function to search for an element in the hash table
function searchVar() {
    // prompt for user input
    rl.question("Search for a variable: ", (inputArray) => {
        // convert user input into uppercase, then into an array
        inputArray = inputArray.toUpperCase().trim().split(" ");

        // assign question text and function to repeat for the follow up question
        questionText = "Search for another variable (1) or main menu (2): ";
        repeatFunction = searchVar;

        // check if input has exactly 1 elements
        if (inputArray.length == 1) {
            // element is a single character from A-Z
            let searchingVar = inputArdray[0].match(/^[A-Z]$/);

            // if input is a single character from A-Z
            if (searchingVar) {
                // declare variable to search
                const variable = inputArray[0];
                // search for declared variable within the hash table
                const value = hashTable.search(variable);

                // if variable has been assigned a value
                if (value !== undefined) {
                    // display search results
                    console.log(">> " + variable + " = " + value);
                    // ask follow up question
                    followUpQn(questionText, repeatFunction);
                } else {
                    // if variable has not been declared
                    console.log(">> " + variable + " has not been declared");
                    // ask next question
                    followUpQn(questionText, repeatFunction);
                }
            } else {
                // if input is not a single character from A-Z (e.g. aaa, 2, etc.)
                console.log("!! Invalid input. Input should have 1 alphabetic character only (A-Z)");
                // ask for input again
                searchVar();
            }
        } else {
            // if input has more than 1 element (e.g. a b c), continue with a follow up question
            console.log("!! Invalid input. Input should have 1 element only (A-Z)");
            followUpQn(questionText, repeatFunction);
        }
    });
}

// function to assign a key-pair value
function insertVar() {
    rl.question("Assign value to a variable (e.g. a 9): ", (inputArray) => {
        // convert user input into uppercase, then into an array
        inputArray = inputArray.toUpperCase().trim().split(" ");

        // assign question text and function to repeat for the follow up question
        questionText = "Assign another variable (1) or main menu (2): ";
        repeatFunction = insertVar;

        // check if input has exactly 2 elements
        if (inputArray.length == 2) {
            // 1st element is alphabet, 2nd element is a digit
            let alphabet_requirements = inputArray[0].match(/^[A-Z]$/);
            let numerical_requirements = inputArray[1].match(/^[-]?[0-9]+$/);

            // check if first element is a key (A-Z) and second element is a value
            if (alphabet_requirements && numerical_requirements) {
                // assign variable and value to array elements
                const variable = inputArray[0];
                const value = inputArray[1];

                // insert elements into hash table
                hashTable.insert(variable, value);

                // log to console
                console.log(">> " + variable + " has been set as " + value);

                // ask follow up question
                followUpQn(questionText, repeatFunction);
            } else if (!alphabet_requirements) {
                // if first element is not an alphabet, run insertVar() again
                console.log("!! Invalid input. First element should be an alphabet (A-Z).");
                insertVar();
            } else if (!numerical_requirements) {
                // if second element is not a number, run insertVar() again
                console.log("!! Invalid input. Second element should be a number.");
                insertVar();
            }
        } else {
            // if input has too many elements, ask follow up question
            console.log("!! Invalid input. Input should have an alphabet (A-Z) and a number.");
            followUpQn(questionText, repeatFunction);
        }
    });
}

// function to delete a key-pair value
function deleteVar() {
    rl.question("Delete a variable: ", (inputArray) => {
        // convert user input into uppercase, then into an array
        inputArray = inputArray.toUpperCase().trim().split(" ");

        // assign question text and function to repeat for the follow up question
        questionText = "Delete another variable (1) or main menu (2): ";
        repeatFunction = deleteVar;

        // check if input has exactly 1 elements
        if (inputArray.length == 1) {
            // element is a single character from A-Z
            let searchingVar = inputArray[0].match(/^[A-Z]$/);

            // if input is a single character from A-Z
            if (searchingVar) {
                // assign variable to array element
                const variable = inputArray[0];

                // delete variable's key-value pair from the hash table
                const removeSuccess = hashTable.delete(variable);

                // if variable has been successfully removed
                if (removeSuccess) {
                    // log to console
                    console.log(variable + " has been deleted.");

                    // ask follow up question
                    followUpQn(questionText, repeatFunction);
                } else {
                    // if not, it means variable is not found in the hash table
                    console.log(variable + " does not exist");

                    // ask follow up question
                    followUpQn(questionText, repeatFunction);
                }
            } else {
                // if input is not a single character from A-Z (e.g. aaa, 2, etc.), ask for input again by running deleteVar()
                console.log("!! Invalid input. Input should have 1 alphabetic character only (A-Z)");
                deleteVar();
            }
        } else {
            // if input has more than 1 element (e.g. a b c)
            console.log("!! Invalid input. Input should have 1 element only (A-Z)");

            // ask follow up question
            followUpQn(questionText, repeatFunction);
        }
    });
}

// function for postfix calculator
function postfixCalculator() {
    rl.question("Enter a PostFix++ expression (e.g. '20 30 +', 'A 20 - 5 *'): ", (inputArray) => {
        // convert user input into uppercase, then into an array
        inputArray = inputArray.toUpperCase().trim().split(" ");

        if (inputArray.length < 3) {
            // if input length is less than 3, reject input
            console.log("Invalid input: your expression is too short.");
        } else {
            // otherwise, compute the postfix expression and log the results
            console.log("Result: ", evaluatePostFix(inputArray));
        }

        // ask follow up question
        questionText = "New expression (1) or main menu (2): ";
        repeatFunction = postfixCalculator;
        followUpQn(questionText, repeatFunction);
    });
}

// get element key-value for postfix calculation
function getValue(input) {
    // check if value is a number or alphabet
    if (isNaN(input)) {
        // if input is an alphabet, get its value from the hash table
        value = Number(hashTable.search(input));

        // check if key exists in the hash table
        if (isNaN(value)) {
            // it does not exist, return undefined
            return undefined;
        } else {
            // if it exists, return the value
            return value;
        }
    } else {
        // else, it is a number. return input
        return input;
    }
}

// function to calculate postfix
function evaluatePostFix(inputArray) {
    // declare stack array
    let stack = new Stack();

    // default as false
    operatorFound = false;

    // regex expressions
    isNumber = /^[-]?\d+(\.\d+)?$/; // includes decimals
    isAlphabet = /^[A-Z]$/;
    isOperant = /^[+\-*/]$/;

    // loop through user input
    for (var i = 0; i < inputArray.length; i++) {
        // get element at current index
        let element = inputArray[i];

        // check if input is a number or alphabet
        if (element.match(isNumber)) {
            // if input is number (e.g. 4, -4), push it onto the stack and convert to number
            stack.push(Number(element));
        } else if (element.match(isAlphabet)) {
            // if input is an alphabet (e.g. A, B), push it onto the stack
            stack.push(element);
        } else if (element.match(isOperant)) {
            // if input is an operator, declare as true
            operatorFound = true;

            // if current stack array only has 1 element,  return undefined
            if (stack.length < 2) {
                console.log("Invalid: Not enough values to compute");
                return undefined;
            } else {
                // get x and y from stack
                x = stack.pop();
                y = stack.pop();

                // get the numerical value of val1 and val2
                x = getValue(x);
                y = getValue(y);

                // if x or y values cannot be found in the hash table, return undefined
                if (x === undefined || y === undefined) {
                    console.log("Error: One or more variables are not defined.");
                    return undefined;
                }

                // perform actions for respective operations
                switch (element) {
                    // addition
                    case "+":
                        result = x + y;
                        break;
                    // subtraction
                    case "-":
                        result = x - y;
                        break;
                    // multiplication
                    case "*":
                        result = x * y;
                        break;
                    // division
                    case "/":
                        // error handling for division by 0
                        if (y == 0) {
                            console.log("Invalid input: Cannot divide by 0");
                            return undefined;
                        } else {
                            result = x / y;
                        }
                        break;
                }
                // push result from above into stack
                stack.push(result);

                // print mathematical workings
                console.log(x, inputArray[i], y, "=", result);
            }
        } else {
            // if user inputs a non-valid character (e.g. %, ^), return undefined
            console.log("Invalid input: invalid expression");
            return undefined;
        }
    }

    // returning result into postfixCalculator()
    if (!operatorFound) {
        //if no operator is found in user input
        console.log("Invalid input: No operator found in expression.");
        return undefined;
    } else if (stack.isEmpty()) {
        // if stack is empty
        console.log("Error: No result to return.");
        return undefined;
    } else if (stack.size() != 1) {
        // expression error (e.g. '1 2 + 3')
        console.log("Error: Incomplete expression");
        return undefined;
    } else {
        // get remaining value in the stack
        result = stack.pop();
        if (Number.isInteger(result)) {
            // if value is a whole number, return as it is
            return result;
        } else if (isNaN(result)) {
            // if value is not a number, return undefined
            return undefined;
        } else {
            // if value is a decimal, format to two decimal places and return
            result = result.toFixed(2);
            return result;
        }
    }
}
