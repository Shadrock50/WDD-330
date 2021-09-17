const links = [
    {
      label: "Week1 notes",
      url: "/week01/index.html"
    }
  ]

function createList(){

    links.forEach(fillInList());

}

function fillInList(x){

    const ol = document.querySelector("#summaryOL");
    const li = document.createElement('li');
    var a = document.createElement("a");

    a.textContent = x.label;
    a.setAttribute('href', links.url);

    li.appendChild(a);

    ol.appendChild(li);

}