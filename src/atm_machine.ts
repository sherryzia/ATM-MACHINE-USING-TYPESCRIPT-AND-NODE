import inquirer from 'inquirer';

// Function to generate random user data
function generateRandomUserData() {
    const userId ="2412";
    const pin = "2001";
    const balance = Math.floor(Math.random() * 10000) + 1000;

    return { userId, pin, balance };
}

// ATM functionalities
function displayBalance(balance: number) {
    console.log(`Your balance: $${balance}`);
}

function withdraw(balance: number, amount: number) {
    if (amount > balance) {
        console.log("Insufficient funds!");
    } else {
        console.log(`Withdrawal successful. Remaining balance: $${balance - amount}`);
        balance = balance - amount;
    }
}

// Main ATM logic
async function runATM() {
    const userData = generateRandomUserData();

    console.log("Welcome to the ATM Machine!");

    const { enteredUserId, enteredPin } = await inquirer.prompt([
        {
            type: 'input',
            name: 'enteredUserId',
            message: 'Enter User ID:',
        },
        {
            type: 'password',
            name: 'enteredPin',
            message: 'Enter PIN:',
            mask: '*',
        },
    ]);

    if (enteredUserId === userData.userId && enteredPin === userData.pin) {
        console.log("Login successful!");

        // ATM functionalities
        while (true) {
            const { choice } = await inquirer.prompt({
                type: 'list',
                name: 'choice',
                message: 'ATM Menu:',
                choices: [
                    'Display Balance',
                    'Withdraw',
                    'Exit',
                ],
            });

            switch (choice) {
                case 'Display Balance':
                    displayBalance(userData.balance);
                    break;
                case 'Withdraw':
                    const { amount } = await inquirer.prompt({
                        type: 'number',
                        name: 'amount',
                        message: 'Enter withdrawal amount:',
                    });
                    withdraw(userData.balance, amount);
                    break;
                case 'Exit':
                    console.log("Thank you for using the ATM. Have a nice day!\n\n");
                    

                    process.exit(0);
                default:
                    console.log("Invalid choice. Please enter a valid option.");
            }
        }
    } else {
        console.log("Invalid User ID or PIN. Exiting...\n");
    }


}

// Run the ATM
runATM();

