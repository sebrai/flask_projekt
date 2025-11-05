let raw = document.getElementById("data").textContent

function py_to_json(str = raw) {
    return str.replaceAll("(", "[").replaceAll(")", "]").replaceAll("'", '"');
}
let data = JSON.parse(py_to_json(raw))
console.table(data)
let nname = document.getElementById("name")
let color = document.getElementById("color")
nname.value = data[0][1]
color.value = data[0][2]