// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {

    // Get references to the display screen and all buttons
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');

    // Variable to track the current expression
    let currentExpression = '';

    // Loop through each button and add a click event listener
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            // Get the value from the button's data-value attribute
            const value = this.getAttribute('data-value');

            // Use an if-else statement to handle different button clicks
            if (value === 'C') {
                // Clear the expression and reset the display
                currentExpression = '';
                display.textContent = '0';
            } else if (value === '=') {
                // Try to calculate the result when '=' is pressed
                try {
                    // NOTE: eval() is used for simplicity. It's powerful but can be a security risk in complex applications
                    // if it evaluates untrusted user input. For this controlled calculator, it's acceptable.
                    const result = eval(currentExpression);

                    // Check if the result is a valid number
                    if (isNaN(result) || !isFinite(result)) {
                        display.textContent = 'Error';
                    } else {
                        // Display the result and update the current expression
                        display.textContent = result;
                        currentExpression = result.toString();
                    }
                } catch (error) {
                    // If an error occurs during evaluation (e.g., division by zero), display "Error"
                    display.textContent = 'Error';
                    currentExpression = '';
                }
            } else {
                // For all other buttons (numbers and operators)

                // If the display currently shows '0' or 'Error', replace it
                if (display.textContent === '0' || display.textContent === 'Error') {
                    currentExpression = value;
                } else {
                    // Otherwise, append the new value to the expression
                    currentExpression += value;
                }
                // Update the display with the new expression
                display.textContent = currentExpression;
            }
        });
    });
});