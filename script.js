const eq = document.querySelector(".op");
const ans = document.querySelector(".ans");
let answer = "";
let eqtn = "";
let value = 0;

const dbtns = document.querySelectorAll(".d");
const dot = document.querySelector(".p");
let isDot = false;
const obtns = document.querySelectorAll(".o");
let flag = "";
const ac = document.querySelector("#ac");
const back = document.querySelector("#b");
const equal = document.querySelector("#e");

function oprs(eqn, fn, id) {
    let arr = eqn.split(fn);
    if (arr[1] === "") {
        backspace();
        eqtn += id;
        value = arr[0]
        return;
    }
    let a = Number(arr[0]);
    let b = Number(arr[1]);
    if (fn === "+") sum(a, b);
    else if (fn === "-") sub(a, b);
    else if (fn === "*") mul(a, b);
    else div(a, b);
}

function sum(a, b) {
    value = ((a + b) * 10) / 10;
}

function sub(a, b) {
    value = ((a - b) * 10) / 10;
}

function mul(a, b) {
    value = ((a * b) * 10) / 10;
}

function div(a, b) {
    if (b === 0) {
        alert("Don't try this trick again.");
        return;
    }
    value = ((a / b) * 10) / 10;
}

dbtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        eqtn += btn.id;
        eq.innerHTML = eqtn;
    });
});

dot.addEventListener("click", () => {
    if (isDot === false) {
        if (eqtn === "") eqtn = "0.";
        else eqtn += ".";
        eq.innerHTML = eqtn;
        isDot = true;
    }
});

obtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        isDot = false;
        if (flag == "") {
            eqtn += btn.id;
            eq.innerHTML = eqtn;
            flag = btn.id;
        } else {
            oprs(eqtn, flag, btn.id);
            eqtn = String(value);
            eqtn += btn.id;
            flag = btn.id;
            eq.innerHTML = eqtn;
        }
    });
});

ac.addEventListener("click", () => {
    eqtn = "";
    value = 0;
    isDot = false;
    flag = "";
    eq.innerHTML = "0";
    ans.innerHTML = "";
});

function backspace() {
    let arr = eqtn.split("");
    if (arr[arr.length-1]==flag) flag = ""
    arr.pop();
    eqtn = arr.join("");
    if (eqtn === "") eqtn = "0";
    eq.innerHTML = eqtn;
}

back.addEventListener("click", () => {
    backspace();
});

equal.addEventListener("click", () => {
    if (flag!=""){
        let arr = eqtn.split(flag);
        if (arr[1] === "") {
            backspace();
            value = Number(eqtn);
        } else {
            oprs(eqtn, flag, flag);
            eqtn = String(value);
        }
        flag = ""
    }
    isDot= false
    ans.innerHTML = String((value*10)/10);
});
