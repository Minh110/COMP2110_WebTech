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
  <div class="job-details">
    <h2>{{attributes.title}}</h2>
    <h3>{{attributes.location}}</h3>
    <h3>{{attributes.type}}</h3>
    <h4>Created at: {{attributes.createdAt}}</h4>
    <h4>Updated at: {{attributes.updatedAt}}</h4>
    <h4>Published at: {{attributes.publishedAt}}</h4>
    <h3><a href="/#!/companies/{{attributes.company.data.id}}">{{attributes.company.data.attributes.name}}</a></h3>
    <div class="job-description"></div>

  </div>`);

  //<p id="desc">{{attributes.description}}</p>
  const target = document.getElementById(id);
  target.innerHTML = template(job);
  const desc = document.getElementsByClassName("job-description")[0];
  desc.innerHTML = job.attributes.description;
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

export const companyView = (id, comp, compArray) => {
  const template = Handlebars.compile(`
  <div class="company-details">
    <img src="{{attributes.logo}}" alt="logo">
    <h2>{{attributes.name}}</h2>
    <h4>{{attributes.createdAt}}</h4>
    <h4>{{attributes.updatedAt}}</h4>
    <h4>{{attributes.publishedAt}}</h4>
    <h4><a href = "{{attributes.url}}">{{attributes.url}}</a></h4>
  </div>
  <h4>Listed Jobs: </h4>
  <div class= "job"></div>  
  `);
  const template2 = Handlebars.compile(`
    {{#each array}}
      <ul>
        <li><a href="/#!/jobs/{{id}}">{{attributes.title}} - {{attributes.location}} - {{attributes.type}}</a></li>
      </ul>
    {{/each}}
  `);

  //<p id="desc">{{attributes.description}}</p>
  const target = document.getElementById(id);
  target.innerHTML = template(comp);
  const desc = document.getElementsByClassName("job")[0];
  desc.innerHTML = template2({ array: compArray });
};
