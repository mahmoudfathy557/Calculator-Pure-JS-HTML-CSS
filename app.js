// calculator variables

const display1El = document.querySelector('.display-1');
const display2El = document.querySelector('.display-2');
const tempResultEl = document.querySelector('.temp-result');
const numbersEl = document.querySelectorAll('.number');
const operationEl = document.querySelectorAll('.operation');
const equalEl = document.querySelector('.key-equal');
const clearAllEl = document.querySelector('.clear');
const clearLastEl = document.querySelector('.delete');

//    history variables

const openHistory = document.querySelector('.open-history');
const cancelHistory = document.querySelector('.cancel-history');
const deleteHistory = document.querySelector('.delete-history');
const modal = document.getElementById('history-modal-container');
const historyListEl = document.querySelector('.history-list');
const historyModalContainer = document.querySelector('.history-modal-container');

// dealing with calculator

let dis1Num = '';
let dis2Num = '';
let result = null;
let lastOperation = '';
let haveDot = false;
let historyArr = [];

numbersEl.forEach((number) => {
	number.addEventListener('click', (e) => {
		// check if there are more than one dot at a number
		if (e.target.innerText === '.' && !haveDot) {
			haveDot = true;
		} else if (e.target.innerText === '.' && haveDot) return;
		// assigning number or dot to dis2num
		dis2Num += e.target.innerText;
		display2El.innerText = dis2Num;
	});
});

operationEl.forEach((operation) => {
	operation.addEventListener('click', (e) => {
		if (!dis2Num) return;
		// remove dot flag
		haveDot = false;
		// capture type of operation
		const operationName = e.target.innerText;
		// calculate if dis1Num && dis2Num & lastOperation  are available and equal button hadn't pressed yet but only operation button
		if (dis1Num && dis2Num && lastOperation) {
			// console.log('dis1Num && dis2Num & lastOperation are available');

			mathOperation();
		} else {
			// dis2Num is available and user pressed operation button
			result = parseFloat(dis2Num);
			// console.log(' dis2Num is available and user pressed operation button');
		}
		clearVar(operationName);
		lastOperation = operationName;
	});
});

// when user hits operation button once
function clearVar(name = '') {
	dis1Num += dis2Num + ' ' + name + ' ';
	display1El.innerText = dis1Num;
	display2El.innerText = '';
	dis2Num = '';
	tempResultEl.innerText = result;
}

// if user pressed operation button more than twice
function mathOperation() {
	if (lastOperation === 'x') {
		result = parseFloat(result) * parseFloat(dis2Num);
	} else if (lastOperation === '+') {
		result = parseFloat(result) + parseFloat(dis2Num);
	} else if (lastOperation === '-') {
		result = parseFloat(result) - parseFloat(dis2Num);
	} else if (lastOperation === '/') {
		result = parseFloat(result) / parseFloat(dis2Num);
	}
}

equalEl.addEventListener('click', () => {
	// if both display1 , display2 are empty => do nothing
	if (!dis2Num || !dis1Num) return;
	// if there are values
	haveDot = false;
	mathOperation();
	clearVar();
	display2El.innerText = result.toFixed(4);

	tempResultEl.innerText = '';
	dis2Num = result;
	dis1Num = '';

	// adding result to history
	historyArr = [
		...historyArr,
		{
			dis1: display1El.innerText,
			dis2: display2El.innerText,
		},
	];
	renderHistory();
});

function renderHistory() {
	// adding  the results to the history modal
	historyListEl.innerHTML = '';
	let list = document.createElement('ul');

	// if history array is empty
	if (historyArr.length === 0) {
		historyListEl.innerHTML = `<h4>there's no history yet</h4>`;
	}

	// if history array has values
	if (historyArr.length > 0) {
		// appending results to list var
		historyArr.forEach((res) => {
			let li = document.createElement('li');
			li.innerHTML = `<p class="history-result1">${res.dis1} =</p>
            <h4 class="history-result2">${res.dis2}</h4>`;
			list.appendChild(li);
		});
		// appending list to the main history element
		historyListEl.appendChild(list);
	}
}

// clear button
clearAllEl.addEventListener('click', () => {
	dis1Num = '';
	dis2Num = '';
	display1El.innerText = '';
	display2El.innerText = '';
	result = '';
	tempResultEl.innerText = '';
});

// delete button
clearLastEl.addEventListener('click', () => {
	display2El.innerText = display2El.innerText.toString().slice(0, -1);
	dis2Num = dis2Num.toString().slice(0, -1);
});

// dealing with history

openHistory.addEventListener('click', () => {
	modal.style.display = 'block';
	renderHistory();
});

cancelHistory.addEventListener('click', () => {
	modal.style.display = 'none';
});

deleteHistory.addEventListener('click', () => {
	historyArr = [];
	renderHistory();
});
