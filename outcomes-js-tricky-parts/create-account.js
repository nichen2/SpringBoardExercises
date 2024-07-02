function createAccount(pin, amount = 0) {
    let balance = amount;
    let currentPin = pin;

    return {
        checkBalance: function(inputPin) {
            if (inputPin !== currentPin) {
                return "Invalid PIN.";
            }
            return `$${balance}`;
        },
        deposit: function(inputPin, amount) {
            if (inputPin !== currentPin) {
                return "Invalid PIN.";
            }
            if (amount > 0) {
                balance += amount;
                return `Succesfully deposited $${amount}. Current balance: $${balance}.`;
            } else {
                return "Deposit amount must be positive.";
            }
        },
        withdraw: function(inputPin, amount) {
            if (inputPin !== currentPin) {
                return "Invalid PIN.";
            }
            if (amount > balance) {
                return "Withdrawal amount exceeds account balance. Transaction cancelled.";
            } else if (amount <= 0) {
                return "Withdrawal amount must be positive.";
            } else {
                balance -= amount;
                return `Succesfully withdrew $${amount}. Current balance: $${balance}.`;
            }
        },
        changePin: function(inputPin, newPin) {
            if (inputPin !== currentPin) {
                return "Invalid PIN.";
            }
            currentPin = newPin;
            return "PIN successfully changed!";
        }
    };
}

module.exports = { createAccount };
