// see https://repl.it/@AZIZSALIHI/Goodreads-Server-Express for implementation details
const booksBody = document.querySelector("#bookTable > tbody");

var input = document.getElementById("userInput");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("subButton").click();
  }
});

function getInput() {
  this.userInput = document.getElementById("userInput").value;
  if (!isEmpty(this.userInput)) {
    loadBooks(this.userInput);
  } else {
    while (booksBody.firstChild) {
      booksBody.removeChild(booksBody.firstChild);
    }
  }
}

function isEmpty(str) {
  return !str || 0 === str.length;
}

function loadBooks(val) {
  let request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://Goodreads-Server-Express.azizsalihi.repl.co/search/${val}`
  );
  request.send();
  request.onload = () => {
    // console.log(request);
    if (request.status === 200) {
      const json = JSON.parse(request.response);
      // console.log(json);
      populateBooks(json);
    } else {
      console.log(`error ${request.status} ${request.statusText}`);
    }
  };
}

function populateBooks(json) {
  while (booksBody.firstChild) {
    booksBody.removeChild(booksBody.firstChild);
  }

  Object.keys(json.list).forEach(function (item) {
    // console.log(item); // key
    // console.log(json.list[item]); // value
    const tr = document.createElement("tr");
    const obj = json.list[item];
    const values = Object.values(obj);
    // console.log(values);
    values.forEach((cell) => {
      // console.log(cell);
      const td = document.createElement("td");
      const img = document.createElement("img");
      if (cell.endsWith("jpg") || cell.endsWith("png")) {
        img.src = cell;
        td.appendChild(img);
        tr.prepend(td);
      } else {
        td.textContent = cell;
        tr.appendChild(td);
      }
    });
    booksBody.appendChild(tr);
  });
}
