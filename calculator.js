let total = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)){
        // is not a number
        hundleSymbol(value);
    } else {
        // is a number
        hundleNumber(value);
	}
	screen.innerText = buffer;
}

function hundleSymbol(symbol) {
	switch (symbol) {
		case 'C':
			buffer = "0";
			total = 0;
			break;
		case '←':
			leftArrow();
			break;
		case '÷':
		case '×':
		case '−':
		case '+':
			hundleMath(symbol);
			break;
		case '=':
			if (previousOperator === null || previousOperator === '='){return;}
			flushOperation(parseInt(buffer));
			buffer = total;
			total = 0;
			previousOperator = symbol;
			break;
	}
}
	
function hundleNumber(numberString) {
		if (previousOperator === '=' && buffer != '0'){
			buffer = '0';
			total = 0;
			previousOperator = null;
		}
		if (buffer === "0"){
			buffer = numberString;
		} else {
			buffer = buffer + numberString;
		}
	}

function leftArrow (){
	if (buffer.length === 1){
		buffer = "0";
	} else {
		buffer = buffer.slice(0, -1);
	}
}

function hundleMath(symbol) {
	// hundel math operations;
	if (buffer === '0'){return;}
	const intBuffer = parseInt(buffer);
	if (total === 0){
		total = intBuffer;
	} else {
		flushOperation(intBuffer);
	}
	previousOperator = symbol;
	buffer = '0';
}

function flushOperation(intBuffer) {
	if (previousOperator === "+"){
		total += intBuffer;
	} else if (previousOperator === '−'){
		total -= intBuffer;
	} else if (previousOperator === '×'){
		total *= intBuffer;
	} else {
		total /= intBuffer;
	}
}

function main() {
    document.querySelector('.calc-buttons')
    .addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    });
}
main();