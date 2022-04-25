export const generalTemplate = Handlebars.compile(`
    <div class=about>
        <p>{{content}}</p>
    </div>
    `);

export function infoView(targetid, info) {
  const list = generalTemplate(info);
  const target = document.getElementById(targetid);

  target.innerHTML = list;
}

export const errorView = () => {
  const target = document.getElementById("content");
  target.innerHTML = "<p> Page not found </p>";
};

export const jobView = (id, job) => {
  const template = Handlebars.compile(`
  <div class="job-description">
    <h2>{{attributes.title}}</h2>
    <h3>{{attributes.location}}</h3>
    <h3>{{attributes.type}}</h3>
    <h3 [innerHTML]="attributes.description"></h3> 
  </div>`);

  const target = document.getElementById(id);
  target.innerHTML = template(job);
};

export const jobListView = (id, jobArray) => {
  const template = Handlebars.compile(`
      {{#each array}}
        <div class=job>
          <ul>
            <li><a href="/#!/jobs/{{id}}">{{attributes.title}} - {{attributes.location}} - {{attributes.type}}</a></li>
          </ul>
        </div>
      {{/each}}
  `);

  const target = document.getElementById(id);
  target.innerHTML = template({ array: jobArray });
};

export const homeView = (id) => {
  const content = `
  <h1>Job Web App</h1>
  
  <p>This web app shows a list of jobs.</p>
  `;
  const target = document.getElementById(id);
  target.innerHTML = content;
};
