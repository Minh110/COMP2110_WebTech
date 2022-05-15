/* COMP 2110 - Quang Minh Pham - 45546339*/

export { Auth };

const Auth = {
  userData: null,

  login: function (authInfo) {
    console.log("the authInfo is ", authInfo);
    fetch("http://localhost:1337/api/auth/local", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authInfo),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let auth = document.getElementById("login-form");
        if (data.data === null) {
          const template = Handlebars.compile(`
                <p>Invalid Username or Password</p>
            `);
          const target = document.getElementsByClassName("header-auth")[0];
          target.innerHTML = template(template);
        } else {
          auth.style.visibility = "hidden";
          const template = Handlebars.compile(`
                <p>Logged in as bob</p>
                <button
                    id="logoutbutton"
                    class="search-button"     
                > Log Out </button>
            `);
          const target = document.getElementsByClassName("header-auth")[0];
          target.innerHTML = template(template);

          console.log("Well Done!");
          console.log("the response data is ", data);
          this.userData = data;
          let event = new CustomEvent("userLogin");
          window.dispatchEvent(event);
        }
      })
      .catch((error) => {
        //if (error.response !== undefined) {
        console.log("An error occurred:", error.response);
        //}
      });
  },

  getJWT: function () {
    if (this.userData) {
      return this.userData.jwt;
    } else {
      return null;
    }
  },

  getUser: function () {
    if (this.userData) {
      return this.userData.user;
    } else {
      return null;
    }
  },
};
