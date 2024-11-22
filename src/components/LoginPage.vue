<template>
  <div class="container">
    <div class="wrapper">
      <div class="title"><span>Login Form</span></div>
      <form>
        <div class="row">
          <i class="fas fa-user"></i>
          <input v-model="email" type="text" placeholder="Email" required />
        </div>
        <div class="row">
          <i class="fas fa-lock"></i>
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div class="pass"><a href="#">Forgot password?</a></div>
        <div class="row button">
          <input type="button" value="Login" @click="iniciarSesion" />
        </div>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <div class="signup-link">Not a member? <a href="#">Signup now</a></div>
      </form>
    </div>
  </div>
</template>

<style>
/* General styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  margin: 0;
  background: #e0e0e0; /* Light grey background */
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #e0e0e0;
}

/* Wrapper for the login box */
.wrapper {
  width: 100%;
  max-width: 400px;
  background: #f5f5f5; /* White with a hint of grey */
  border-radius: 10px;
  box-shadow: 0px 4px 10px 1px rgba(0, 0, 0, 0.2);
  padding: 20px;
  text-align: center;
}

/* Title styling */
.wrapper .title {
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
  font-weight: bold;
}

/* Form rows styling */
.wrapper form .row {
  margin-top: 15px;
  position: relative;
}

.wrapper form .row input {
  height: 50px;
  width: 100%;
  outline: none;
  padding-left: 45px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  font-size: 16px;
  background: #ffffff;
  transition: all 0.3s ease;
}

form .row input:focus {
  border-color: #333;
}

form .row input::placeholder {
  color: #999;
}

/* Icons in the input fields */
.wrapper form .row i {
  position: absolute;
  width: 40px;
  height: 100%;
  color: #555;
  font-size: 18px;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Button styling */
.wrapper form .button input {
  margin-top: 20px;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  background: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  height: 50px;
  width: 100%;
}

form .button input:hover {
  background: #555;
}

/* Error message styling */
.error-message {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}

/* Sign-up link styling */
.wrapper form .signup-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}

.wrapper form .signup-link a {
  color: #333;
  text-decoration: none;
}

form .signup-link a:hover {
  text-decoration: underline;
}

/* Forgot password link styling */
.wrapper form .pass a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
}

.wrapper form .pass a:hover {
  text-decoration: underline;
}
</style>

<script>
import axios from "axios";

export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async iniciarSesion() {
      console.log("Hizo click...");
      console.log("Email: " + this.email + ", Password: " + this.password);

      const endpointURL = "http://68.183.142.21/api/v1/user/signin";
      const user = {
        email: this.email,
        password: this.password,
      };

      try {
        const response = await axios.post(endpointURL, user);
        if (response.status === 200) {
          console.log("Login exitoso");
          // Navegar a la página de películas usando Vue Router
          this.$router.push("/movies");
        }
      } catch (error) {
        console.log("El error es:", error);
        this.errorMessage =
          "Credenciales incorrectas. Por favor, inténtelo nuevamente.";
      }
    },
  },
};
</script>
