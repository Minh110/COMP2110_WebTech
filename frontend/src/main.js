import { Router } from "./router.js";

let about = {
  content:
    "Bob's Jobs is a revolution in career planning brought to you by Bob Bobalooba himself!",
};

let applicantHelp = { content: "Be sure to he honest in your application!" };

const infoTemplate = Handlebars.compile(`
    <div class=info>
        <p>Name: {{name}}</p>
        <p>Age: {{age}}</p>
    </div>`);

const aboutTemplate = Handlebars.compile(`
    <div class=about>
        <p>{{content}}</p>
    </div>
    `);

function infoView(targetid, info) {
  const list = aboutTemplate(info);
  const target = document.getElementById(targetid);

  target.innerHTML = list;
}

const errorView = () => {
  const target = document.getElementById("content");
  target.innerHTML = "<p> Page not found </p>";
};

const route = new Router(errorView);

route.get("/about", () => {
  infoView("content", about);
});

route.get("/help", () => {
  infoView("content", applicantHelp);
});

function redraw() {
  var active = 0;
  var elements = document.getElementsByTagName("li");
  var curLink = window.location.href.split("#")[1];
  //console.log(elements);
  for (var i = 0; i < document.getElementsByTagName("li").length; i++) {
    var subElements = elements[i].children[0].href.split("#")[1];
    if (subElements === curLink) {
      active = i;
    } else {
      elements[i].className = "";
    }
  }
  elements[active].className = "selected";
  route.route();
}

//window.onload = redraw;
window.onhashchange = redraw;

window.onload = redraw;
