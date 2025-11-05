let raw = document.getElementById("data").textContent
let select = document.getElementById("select")
function py_to_json(str = raw) {
    return str.replaceAll("(", "[").replaceAll(")", "]").replaceAll("'", '"');
}
let data = JSON.parse(py_to_json(raw))
console.table(data)


select.addEventListener("change", (e) => {
    let val = e.target.value
    console.log(val)
    // console.log(data[0][1])
    console.log
    document.getElementById("table").hidden = false
    let to = document.getElementById("to")
    // let box = document.getElementById("tobox")
    let label = document.getElementById("label")
    if (val == "color") {
        to.type = "color"
        to.value = data[0][2]
        label.textContent = "please select a new color"
    }
    else {
        to.type = "text"
        to.value = data[0][1]
        label.textContent = " please whrite a new name"
    }

})