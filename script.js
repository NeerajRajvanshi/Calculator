const display = document.getElementById("display");
const buttons = document.getElementById("buttons"); 

// ================================== here only onclick oparetion perform on browser 
buttons.addEventListener("click", (event) => {
    let target = event.target;
    ClickSound();
    // -------------
    if (target.innerHTML === "AC") {
        display.value = "";
    }
    else if (target.classList.contains("clear")) {
        let str = "";
        let i = 0;
        while (i <= display.value.length - 2) {
            str += display.value[i]
            i++;
        }
        display.value = str;
    }
    else if (target.classList.contains("number")) {
        display.value += target.innerHTML;
    }
    else if (target.classList.contains("operator")) {
        let lastChar = display.value[display.value.length - 1]; //last character of string
        if (["+", "-", "*", "/"].includes(lastChar)) {
            display.value = display.value.slice(0, -1) + target.innerHTML; //eliminates repeated operators
        } else {
            display.value += target.innerHTML;
        }
    }
    else if (target.innerHTML === "=") {
        if (display.value.length !== 0) {
            //handling unexpected syntax expressions
            try {
                display.value = eval(display.value);
            } catch (error) {
                display.value = "Syntax Error!";
            }
        } else display.value = "First Perform Operation...";
    }
});
// ====================================================== End here :- 

// ====================== click sound here 
function ClickSound() {
    let audio = new Audio("./sound/sound.mp3"); //for sound
    audio.play();
}
// ====================================================== End here :-


// Add event listener for keydown event

document.addEventListener("keydown", (event) => {
    KeyboardInput(event.key);
});

// Function to handle keyboard input
function KeyboardInput(key) {
    ClickSound();

    const validKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "+", "-", "*", "/","(",")","%"];
    if (validKeys.includes(key)) {
        display.value += key;
    } else if (key === "Escape" || key === "Delete") {
        // clear all using Esc button or Delete button on the keyboard
        display.value = "";
    } else if (key === "Backspace") {
        // clear one by one using Backspace button on the keyboard
        display.value = display.value.slice(0, -1);
    } else if (key === "Enter") {
        oparetionKeyboard();
    } else {
        // Ignore other keys
    }

}
// ------------------------------------- press Enter button on keyboard get result 
function oparetionKeyboard() {
    if (display.value.length !== 0) {
        try {
            display.value = eval(display.value);
        } catch (error) {
            display.value = "Syntax Error!";
        }
    } else {
        display.value = "Frist Perform Operation...";
    }
}
// ======================================================== end here :-
