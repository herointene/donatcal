
// initial players name
//let PP1 = "xi";
//let PP2 = "mi";
//let PP3 = "ni";
//let PP4 = "gi";

const nameList = ['牛筋丸', '椰子雞', '毛血旺', '雞胸肉', '炸醬麵', '蒜蓉醬', '臭豆腐']
let NAME = []
//const nameList = [PP1,PP2,PP3,PP4];

// constants
const goalField = document.querySelector(".goalField");
const goalSubmit = document.querySelector(".goalSubmit");
const table = document.querySelector("#table");
let goal = 0
let gamecount = 1;
let totalScore = 0;

//let scoreobj = {
//  'scoreP1':0,
//  'scoreP2':0,
 // 'scoreP3':0,
 // 'scoreP4':0,
//}
let SCOREOBJ = []

// let function works in submit button
goalSubmit.addEventListener("click", initGametable);

function initGametable() {

  goal = Number(goalField.value); //global variant, no need let or var
  const playersNum = Number(document.querySelector('#players').value);
  NAME = [];
  console.log(playersNum);
  for (let i=0; i<playersNum; i++) {
    NAME.push(nameList[i])
  }

  for (let k = 0; k < NAME.length; k++) {
	SCOREOBJ.push(0)
  }
  
  // 表頭 即名字行
  let tableHead = table.createTHead();
  let nameRow = tableHead.insertRow(0);
  console.log(NAME);
  for (let i = 0; i < NAME.length; i++) {
    let nameCell = nameRow.insertCell();
    nameCell.setAttribute("id","player"+(i+1));
    nameCell.textContent = NAME[i];

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
  //  input box
  for (let i = 0; i < NAME.length; i++) {
    let inputBox = document.createElement("input");
    inputBox.setAttribute("class","inpbox");
    inputBox.setAttribute("id","input"+(i+1));
    inputBox.setAttribute("type","number");
    inputBox.setAttribute("pattern","[0-9]*");
    
    let inputLbl = document.createElement("label");
    inputLbl.setAttribute("class","inplbl");
    inputLbl.setAttribute("for","input"+(i+1));
    let inpPN = document.createTextNode(NAME[i]);
    inputLbl.appendChild(inpPN);
    
    let iptForm = document.createElement("div");
    iptForm.setAttribute("class","iptForm");
    iptForm.setAttribute("id","ipt"+(i+1));
    document.querySelector("#recinp").appendChild(iptForm);
    document.querySelector("#ipt"+(i+1)).appendChild(inputLbl);
    document.querySelector("#ipt"+(i+1)).appendChild(inputBox);

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
//  const inputP1 = Number(document.querySelector("#input1").value);
//  const inputP2 = Number(document.querySelector("#input2").value);
//  const inputP3 = Number(document.querySelector("#input3").value);
 // const inputP4 = Number(document.querySelector("#input4").value);

 // const iptscore = [inputP1,inputP2,inputP3,inputP4];

let  IPTSCORE = []

  for (let k = 0; k < NAME.length; k++) {
    IPTSCORE.push(Number(document.querySelector('#input'+ (k+1)).value));
    console.log(IPTSCORE[k]);
  }
  // insert row
  let scorerow = table.insertRow(-1);
  for (let i = 0; i < NAME.length; i++) {
    let scoreCell = scorerow.insertCell(i);
    scoreCell.setAttribute("id","PS"+(i+1));
    SCOREOBJ[i] += IPTSCORE[i];
    scoreCell.innerHTML = SCOREOBJ[i];

  }

  // totalscore bar: 
  for (let i = 0; i < NAME.length; i++){
    totalScore += SCOREOBJ[i];
  }

  document.querySelector(".totalScore").innerHTML = "目前分數：" + totalScore ;

  
  // compare goal and totalscore
  if (goal > totalScore) {
    // clear input box and focus on P1
    let oldscorearr = document.querySelectorAll(".inpbox");
    for (let i = 0; i < NAME.length; i++){
      oldscorearr[i].value = '';
    }

    document.querySelector("#input1").focus();
    
    // new game count placing
    gamecount += 1;
    document.querySelector("#gamecountP").innerHTML = "第" + gamecount + "局！請填寫分數：";
    
    totalScore = 0;
  }
  else {
    document.querySelector(".gameOver").style.display = 'block' ;
    document.querySelector("#recinp").style.display = 'none';
  }

}


