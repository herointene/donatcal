
// initial players name
let PP1 = "xi";
let PP2 = "mi";
let PP3 = "ni";
let PP4 = "gi";

const nameList = [PP1,PP2,PP3,PP4];

// constants
const goalField = document.querySelector(".goalField");
const goalSubmit = document.querySelector(".goalSubmit");
const table = document.querySelector("#table");

let gamecount = 1;
let totalScore = 0;

let scoreobj = {
  'scoreP1':0,
  'scoreP2':0,
  'scoreP3':0,
  'scoreP4':0,
}
  

// let function works in submit button
goalSubmit.addEventListener("click", initGametable);

function initGametable() {

  goal = Number(goalField.value); //global variant, no need let or var


  // 表頭 即名字行
  let tableHead = table.createTHead();
  let nameRow = tableHead.insertRow(0);

  for (let i = 0; i < nameList.length; i++) {
    let nameCell = nameRow.insertCell();
    nameCell.setAttribute("id","player"+i);
    nameCell.textContent = nameList[i];

  }
  // NextgameButton

  // 目標分數顯示
  const goalShow = document.querySelector(".goal");
  goalShow.textContent = "目標分數：" + goal;

  // disable goal submitbutton
  const submitForm = document.querySelector(".submitForm")
  submitForm.style.display = "none";
  recordInput();
}


// Initialize input for recording score
function recordInput() {
  let inputRow = document.createElement("DIV");
  inputRow.setAttribute("id","recinp");
  let inputhead = document.createElement("P");
  inputhead.setAttribute("id","gamecountP");
  let inputheadtext = document.createTextNode("第一局！請填寫分數：");
  inputhead.appendChild(inputheadtext);
  inputRow.appendChild(inputhead);
  document.body.appendChild(inputRow);
  // 4 input box
  for (let i = 0; i < nameList.length; i++) {
    let inputBox = document.createElement("input");
    inputBox.setAttribute("class","inpbox");
    inputBox.setAttribute("id","input"+(i+1));
    inputBox.setAttribute("type","number");
    inputBox.setAttribute("pattern","[0-9]*");
    
    let inputLbl = document.createElement("label");
    inputLbl.setAttribute("class","inplbl");
    inputLbl.setAttribute("for","input"+(i+1));
    let inpPN = document.createTextNode(nameList[i]);
    inputLbl.appendChild(inpPN);

    document.querySelector("#recinp").appendChild(inputLbl);
    document.querySelector("#recinp").appendChild(inputBox);
  }
  // submit button
  let recbtn = document.createElement("input");
  recbtn.setAttribute("class","recbtn");
  recbtn.setAttribute("type","submit");
  recbtn.setAttribute("value","記錄");
  document.querySelector("#recinp").appendChild(recbtn);

  // run game Loop when click submit
  recbtn.addEventListener("click",gameLoop);
}


// LOOP system

function gameLoop() {
  const inputP1 = Number(document.querySelector("#input1").value);
  const inputP2 = Number(document.querySelector("#input2").value);
  const inputP3 = Number(document.querySelector("#input3").value);
  const inputP4 = Number(document.querySelector("#input4").value);

  const iptscore = [inputP1,inputP2,inputP3,inputP4];

  // insert row
  let scorerow = table.insertRow(-1);
  for (let i = 0; i < nameList.length; i++) {
    let scoreCell = scorerow.insertCell(i);
    scoreCell.setAttribute("id","PS"+(i+1));
    scoreobj["scoreP"+(i+1)] += iptscore[i];
    scoreCell.innerHTML = scoreobj["scoreP"+(i+1)];

  }

  // totalscore bar: 
  for (let i = 0; i < nameList.length; i++){
    totalScore += scoreobj["scoreP"+(i+1)];
    console.log("P"+(i+1)+"score:"+scoreobj["scoreP"+(i+1)]);
    console.log(totalScore);
  }

  document.querySelector(".totalScore").innerHTML = "目前分數：" + totalScore ;
  totalScore = 0;
  
  // compare goal and totalscore
  if (goal > totalScore) {
    // clear input box and focus on P1
    oldscorearr = document.querySelectorAll(".inpbox");
    for (let i = 0; i < nameList.length; i++){
      oldscorearr[i].value = '';
    }

    document.querySelector("#input1").focus();
    
    // new game count placing
    gamecount += 1;
    document.querySelector("#gamecountP").innerHTML = "第" + gamecount + "局！請填寫分數：";

  }
  else {
    document.querySelector(".gameOver").style.display = 'block' ;
    document.querySelector("#recinp").style.display = 'none';
  }

}
