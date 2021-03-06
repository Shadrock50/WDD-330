
function createList(){

    const links = [
        {
          label: "Week 1 notes",
          url: "../WDD-330/week01/index.html"
        },
        {
          label: "Week 2 notes",
          url: "../WDD-330/week02/index.html"
        },
        {
          label: "Week 3 notes",
          url: "../WDD-330/week03/index.html"
        },
        {
          label: "Week 4 notes",
          url: "../WDD-330/week04/index.html"
        },
        {
          label: "Week 5 notes",
          url:"../WDD-330/week05/index.html"
        },
        {
          label: "ToDo List",
          url:"../WDD-330/ToDo/index.html"
        },
        {
          label: "week 7 notes",
          url: "../WDD-330/week07/index.html"
        },
        {
          label: "Week 8 notes",
          url: "../WDD-330/week08/index.html"
        },
        {
          label: "Week 9 notes",
          url: "../WDD-330/week09/index.html"
        },
        {
          label: "Final Project",
          url: "../WDD-330/Final-Project/index.html"
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