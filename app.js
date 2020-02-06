const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

// canvas pixel 설정
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// content 기본 설정
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    // 캔버스 위의 마우스 x, y 좌표 찾기
    const x = event.offsetX;
    const y = event.offsetY;

    if (!painting) { // 클릭하기 전까지 path를 생성
        ctx.beginPath(); 
        ctx.moveTo(x, y);
    } else { // 클릭후 뗄 때까지 path를 연속적으로 stroke
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

// 선택한 색으로 context의 color를 변경
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

// range에서 지정한 값만큼 브러쉬 size로 설정
function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

// 캔버스 드로잉 모드 변경
function handleModeClick() {
    if (filling === true) {
        filling = false;        
        mode.innerText = "🎨 F i l l"
    } else { 
        filling = true;
        mode.innerText = "D r a w";
    }
}

// 캔버스 채우기
function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

// 마우스 우클릭 이벤트 방지
function handleCM(event) {
    event.preventDefault();
}

// 그림 저장
function handleSaveClick() {
    // 그린 이미지 데이터 가져오기
    const image = canvas.toDataURL(); // default type: PNG
    const link = document.createElement("a");
    link.href = image;
    link.download = "mypainting";
    link.click(); 
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

if (colors) {
    Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
}

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}