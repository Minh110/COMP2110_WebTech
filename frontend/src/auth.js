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
        console.log("Well Done!");
        console.log("the response data is ", data);
        this.userData = data;
        let event = new CustomEvent("userLogin");
        window.dispatchEvent(event);

        let auth = document.getElementById("login-form");
        if (!this.userData) {
          const template = Handlebars.compile(`
                <p>Invalid Username or Password</p>
            `);
          const target = document.getElementById("authentication");
          target.innerHTML = template(template);
        } else {
          auth.style.visibility = "hidden";
          const template = Handlebars.compile(`
                <p>Logged in as bob</p>
                <input
                    id="logoutbutton"
                    type="submit"
                    class="search-button"
                    aria-label="Search"
                    value="Log out"      
                />
            `);
          const target = document.getElementById("authentication");
          target.innerHTML = template(template);
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
