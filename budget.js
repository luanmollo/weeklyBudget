let budget;
let name;
let expenses;
let balance;
let bigArray = [];
let arrayExpenses = [];
let mediaQueryMobile = window.matchMedia("(max-width: 780px)");

document.getElementById("budget").focus();

function removeFocus(arg){
	document.getElementById(arg).blur();
}

function putFocus(arg){
	document.getElementById(arg).focus()
}

if(mediaQueryMobile.matches){
	removeFocus("budget");
}

let showBudget = document.getElementById("showBudget");
let p = document.getElementById("setBudget");
p.addEventListener("click", getBudget);

let b = document.getElementById("budget");
b.addEventListener("keyup", enterBudget);

function enterBudget(event){
	if(event.keyCode === 13){
		event.preventDefault();
		document.getElementById("setBudget").click();
	}
}

function getBudget(){

	let b = document.getElementById("budget");
	budget = parseFloat(b.value);

	if(budget > 0){

	document.getElementById("divBudget").style.display = "none";
	document.getElementById("divExpenses").style.display = "flex";
	document.getElementById("divExpenses").style.display = "center";
	document.getElementById("formBudget").style.display = "none"
	document.getElementById("name").focus();

	if(mediaQueryMobile.matches){
		removeFocus("name");
	}

	result.innerHTML = "Balance: $" + budget;
	budgetResult.innerHTML = "Presupuesto: $" + budget;

	let color = document.getElementById("result");
	color.style.backgroundColor = "lightgreen";

	}
	else{
		document.getElementById("budget").focus();
		document.getElementById("budget").value = "";
		document.getElementById("budget").style.borderBottom = "1px solid pink";
		showBudget.innerHTML = "El presupuesto ingresado no es válido. Por favor, ingrese otro.";
	}
}

let l = document.getElementById("name");
l.addEventListener("keyup", enterExpense);

let m = document.getElementById("expenses");
m.addEventListener("keyup", enterExpense);

function enterExpense(event){
	if(mediaQueryMobile.matches){
		if(event.keyCode === 13){
			if(!!document.getElementById("name").value == true){
				if(!!document.getElementById("expenses").value == true){
					event.preventDefault();
					document.getElementById("addExpense").click();
				}
				else{
					event.preventDefault();
					document.getElementById("expenses").focus();
				}
			}
			else if(!!document.getElementById("expenses").value == true){
				mistake.innerHTML = "Hay campos sin llenar";
				document.getElementById("name").focus();
				document.getElementById("name").style.borderBottom = "1px solid pink"
			}
			else if(!!document.getElementById("name").value == false && !!document.getElementById("expenses").value == false){
				mistake.innerHTML = "Hay campos sin llenar";
				document.getElementById("name").focus();
				document.getElementById("name").style.borderBottom = "1px solid pink";
				document.getElementById("expenses").style.borderBottom = "1px solid pink";
			}
		}
	}
	else if(event.keyCode === 13){
		event.preventDefault();
		document.getElementById("addExpense").click();
	}
}


let result = document.getElementById("result");
let mistake = document.getElementById("mistake")
let r = document.getElementById("addExpense");
r.addEventListener("click", setExpense);
let totalExpenses = document.getElementById("totalExpenses");
let budgetResult = document.getElementById("budgetResult");

function setExpense(){

	document.getElementById("name").focus();
	document.getElementById("name").style.borderBottom = "1px solid lightgrey";
	document.getElementById("expenses").style.borderBottom = "1px solid lightgrey";

	if(!!document.getElementById("name").value == false && !!document.getElementById("expenses").value == false){
		mistake.innerHTML = "Hay campos sin llenar";
		document.getElementById("name").focus();
		document.getElementById("name").style.borderBottom = "1px solid pink";
		document.getElementById("expenses").style.borderBottom = "1px solid pink";
	}

	if(!!document.getElementById("name").value == true){
		if(!!document.getElementById("expenses").value == true){
			if(parseFloat(document.getElementById("expenses").value) > 0){

				let n = document.getElementById("name");
				let e = document.getElementById("expenses");
				arrayExpenses.push(parseFloat(e.value)); 

				let nUpperCase = (n.value).charAt(0).toUpperCase() + (n.value).slice(1).toLowerCase();

				bigArray.push({name: nUpperCase, expense: "$" + parseFloat(e.value)});

				n.value = "";
				e.value = "";

				let outcomes = document.getElementById("outcomes");
				let paragraph = document.createElement("span");
				outcomes.appendChild(paragraph);
				paragraph.className = "paragraph";

				let spanName = document.createElement("span");
				let spanExpense = document.createElement("span");
				paragraph.appendChild(spanName);
				paragraph.appendChild(spanExpense);
				spanName.id = "spanName";
				spanExpense.id = "spanExpense";

				spanName.innerHTML += bigArray[bigArray.length - 1].name;
				spanExpense.innerHTML += bigArray[bigArray.length - 1].expense;

				let sumOfExpenses = arrayExpenses.reduce(function (a, b){
			   		return a + b;
			 	});

				balance = budget - sumOfExpenses;

				setColorBalance();
				
				result.innerHTML = "Balance: $" + balance + " (" + Math.round((balance/budget)*100) + "%)";

				budgetResult.innerHTML = "Presupuesto: $" + budget;

				mistake.innerHTML = "";
			}
			else{
				mistake.innerHTML = "El monto ingresado no es válido, por favor ingrese otro.";
				document.getElementById("expenses").value = "";
				document.getElementById("expenses").focus();
				document.getElementById("expenses").style.borderBottom = "1px solid pink";
			}
		}
		else{
			mistake.innerHTML = "Hay campos sin llenar.";
			document.getElementById("expenses").focus();
			document.getElementById("expenses").style.borderBottom = "1px solid pink";
		}
	}
	else{
		mistake.innerHTML = "Hay campos sin llenar.";
		document.getElementById("name").focus();
		document.getElementById("name").style.borderBottom = "1px solid pink";
	}
}

function setColorBalance(){
	if(balance < (budget * 0.25)){
		let color = document.getElementById("result");
		color.style.backgroundColor = "pink";
	}
	else if(balance < (budget * 0.5)){
		let color = document.getElementById("result");
		color.style.backgroundColor = "gold";
	}
	else if(balance > (budget * 0.5)){
		let color = document.getElementById("result");
		color.style.backgroundColor = "lightgreen";
	}
}

let nb = document.getElementById("newBudget");
nb.addEventListener("click", advice);

function advice(){
	let c = confirm("¿Estás seguro? Perderás los datos ingresados.");
	if(c === true){
		reload();
	}
}

let h = document.getElementById("header");
h.addEventListener("click", reload);

function reload(){
	location.reload();
	return false;
}