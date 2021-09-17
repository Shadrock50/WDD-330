
function createList(){

    const links = [
        {
          label: "Week1 notes",
          url: "../WDD-330/week01/index.html"
        }
      ]

    links.forEach(fillInList);

}

function fillInList(x){

    const ol = document.getElementById("listOL");
    const li = document.createElement('li');
    var a = document.createElement("a");

    a.textContent = x.label;
    a.setAttribute('href', x.url);

    li.appendChild(a);

    ol.appendChild(li);

}