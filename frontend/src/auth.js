/* COMP 2110 - Quang Minh Pham - 45546339*/

export { Auth };

const Auth = {
  userData: null, //contain the current user

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
        return response.json(); //handling if succeed (the user exists)
      })
      .then((data) => {
        let auth = document.getElementById("login-form");
        //decide which login form to render
        if (data.data === null) {
          //if the user does not exist, return invalid
          const template = Handlebars.compile(`
                <p>Invalid Username or Password</p>
            `);
          const target = document.getElementsByClassName("header-auth")[0];
          target.innerHTML = template(template);
        } else {
          //if the user exists, return the log out button
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

          this.userData = data; //add the logged in user to the variable for later use
          let event = new CustomEvent("userLogin");
          window.dispatchEvent(event);
        }
      })
      .catch((error) => {
        //handling unexpected error
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
