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
        <p>{{content}}}</p>
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
  route.route();
}

//window.onload = redraw;
window.onhashchange = redraw;

window.onload = redraw;
