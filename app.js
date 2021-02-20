const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "black"
const CANVAS_SIZE = 600;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    }

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRange(event){
    const changedRange = event.target.value;
    ctx.lineWidth = changedRange;
}

function handleModeClick(){
if(filling === true){
    filling = false;
    mode.innerText = "Fill";
}else{
    filling = true;
    mode.innerText = "Paint";
}
}

function handleCanvasclick(){
    if(filling){
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}
}

function handleCM(event){
    event.prevenetDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL(); //canvas를 URL데이터로 저장 디폴트가 PNG
    const link = document.createElement("a"); //a태그를 생성
    link.href = image; //다운로드 URL 지정
    link.download = "PaintJS[EXPORT]"; //다운로드 파일의 이름을 지정
    link.click(); //생성한 a태그 링크를 자동으로 클릭
}
// canvas와 같은 변수에 값이 지정되어있는지 검사하기 위해 if를 사용한것
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasclick);
    canvas.addEventListener("contextmenu", handleCM);
}

if(range){
range.addEventListener("input", handleRange);
}

Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick));

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}