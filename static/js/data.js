let raw = document.getElementById("data").textContent
let table = document.getElementById("table")
// console.log(raw)
// let type = typeof raw
// console.log(type)

function py_to_json(str = raw) {
    return str.replaceAll("(", "[").replaceAll(")", "]").replaceAll("'", '"');
}
function isColorLightOrDark(color) {
    // Convert HEX to RGB if necessary
    let r, g, b;
    if (color.startsWith('#')) {
        const hex = color.slice(1);
        const bigint = parseInt(hex, 16);
        r = (bigint >> 16) & 255;
        g = (bigint >> 8) & 255;
        b = bigint & 255;
    } else if (color.startsWith('rgb')) {
        const matches = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        if (!matches) {
            console.error("Invalid RGB color format.");
            return null;
        }
        r = parseInt(matches[1]);
        g = parseInt(matches[2]);
        b = parseInt(matches[3]);
    } else {
        console.error("Unsupported color format. Please use HEX or RGB.");
        return null;
    }

   
    const hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );

   
    if (hsp > 127.5) {
        return true;
    } else {
        return false;
    }
}
let data = JSON.parse(py_to_json(raw))
console.table(data)
// console.log(data.length)

let tnid = document.createTextNode("id")
let tnname =document.createTextNode("name")
let tncolor = document.createTextNode("fav_color")
let t_options = document.createTextNode("actions")

let eid = document.createElement("th")
let ename = document.createElement("th")
let ecolor = document.createElement("th")
let eopt = document.createElement("th")

eid.appendChild(tnid)
ename.appendChild(tnname)
ecolor.appendChild(tncolor)
eopt.appendChild(t_options)

let headrow = document.createElement("tr")
headrow.appendChild(eid)
headrow.appendChild(ename)
headrow.appendChild(ecolor)
headrow.appendChild(eopt)

table.appendChild(headrow)
for (let i = 0; i < data.length; i++) {
    const row = document.createElement("tr")
    row.id = "row" + (i + 1)
    table.appendChild(row)
    // console.log(i + 1, "rows")
    for (let j = 0; j < data[i].length; j++) {
        const content = data[i][j]
        const tnode = document.createTextNode(content)
        const box =document.createElement("td")
        box.appendChild(tnode)
        row.appendChild(box)
        if (content[0]== "#"){ // if this is the color row
            box.style.backgroundColor = content

            if(!isColorLightOrDark(content)){
                box.style.color = "white"
            }
            else {
                box.style.color ="black"
            }
            // console.log("color")
        }
    }
    let box  = document.createElement("td")
    let alter = document.createElement("button")
    let alter_tekst = document.createTextNode("alter ")
    let del = document.createElement("button")
    let del_tekst = document.createTextNode("delete")
    alter.appendChild(alter_tekst)
    del.appendChild(del_tekst)
    box.appendChild(alter)
    box.appendChild(del)
    row.appendChild(box)
    alter.addEventListener("click",() => {
        console.log("button got clicked", data[i][1])
        const wowurl = new URL(window.location)
        wowurl.pathname =`/alter/${data[i][1]}`
        history.replaceState(null,"",wowurl)
        location.reload()
    })
     del.addEventListener("click",() => {
        console.log("button got clicked", data[i][1])
        const wowurl = new URL(window.location)
        wowurl.pathname =`/delete/${data[i][1]}`
        history.pushState(null,"",window.location)
        window.location = wowurl
    })
}
// console.log(table)