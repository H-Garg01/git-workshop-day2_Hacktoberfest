let leftCol = document.querySelector(".left_col");
let topRow = document.querySelector(".top_row");
let grid = document.querySelector(".grid");
// current clicked cell address
let addressInput = document.querySelector(".address-input");
let boldBtn = document.querySelector(".bold");
let italicBtn = document.querySelector(".italic");
let underlineBtn = document.querySelector(".underline");
let alignBtns = document.querySelectorAll(".align-container>*");
let fontSizeElem = document.querySelector(".font-size");
let rows = 100;
let cols = 26;
// left col
for(let i=0;i< rows; i++) {
    let colBox = document.createElement("div");
    colBox.innerText = i + 1;
    colBox.setAttribute("class","box");
    leftCol.appendChild(colBox);
}
// top row
for(let i=0;i< cols;i++) {
    let cell = document.createElement("div");
    // convert asci to no
    cell.innerText = String.fromCharCode(65 + i);
    // set attribute
    cell.setAttribute("class","cell");
    topRow.appendChild(cell);
}
// grid
// UI uniqely identify
for(let i=0;i < rows;i++) {
    let row = document.createElement("div");
    row.setAttribute("class", "row");
    for(let j=0;j < cols;j++) {
        let cell = document.createElement("div");
        //cell.innerText = `${String.fromCharCode(65 + j)} ${i+1}`
        cell.setAttribute("class","cell");
        cell.setAttribute("rid", i);
        cell.setAttribute("cid", j);
        cell.setAttribute("contenteditable","true");
        row.appendChild(cell);
    }
    grid.appendChild(row);
}

// event listener add click;
let allCells = document.querySelectorAll(".grid .cell");
for(let i =0; i<allCells.length; i++) {
    allCells[i].addEventListener("click", function() {
        // address get current cell
        let rid = allCells[i].getAttribute("rid");
        let cid = allCells[i].getAttribute("cid");
        rid = Number(rid);
        cid = Number(cid);
        let address = `${String.fromCharCode(65 + cid)}${rid+1}`;
        //alert(address);
        addressInput.value = address;
    })
}

boldBtn.addEventListener("click", function(){
    //jispe cell click -> bold
    let uiCellElement = findUICellElement();
    uiCellElement.style.fontWeight = "bold";
})

italicBtn.addEventListener("click", function(){
    //jispe cell click -> bold
    let uiCellElement = findUICellElement();
    uiCellElement.style.fontStyle = "italic";
})

underlineBtn.addEventListener("click", function(){
    //jispe cell click -> bold
    let uiCellElement = findUICellElement();
    uiCellElement.style.textDecoration = "underline";
})

function findUICellElement() {
    let address = addressInput.value;
    let riciObj = getRIDCICfromAddress(address);
    let rid = riciObj.rid;
    let cid = riciObj.cid;
    let uiCellElement = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    return uiCellElement;
}

function getRIDCICfromAddress(address) {
    let cid = Number(address.charCodeAt(0)) - 65;
    let rid = Number(address.slice(1)) - 1;
    return { "rid": rid, "cid": cid};
}
// Horizntal Alignment
for(let i=0;i<alignBtns.length;i++){
    alignBtns[i].addEventListener("click",function(){
        let alignment = alignBtns[i].getAttribute("class");
        let uiCellElement = findUICellElement();
        uiCellElement.style.textAlign = alignment;
    })
}

// font-size
fontSizeElem.addEventListener("change", function(){
    let val = fontSizeElem.value;
    let uiCellElement = findUICellElement();
    uiCellElement.style.fontSize = val + "px";
})

allCells[0].click();