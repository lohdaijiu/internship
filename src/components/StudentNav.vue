<template>
  <div id="nav1">
    <div id="project">
      <h2 class="projectName">internSHIP</h2>
      <img src="../assets/boat.png" id="icon" />
    </div>
    <router-link class="routerlink" to="/StudentHome">Home </router-link>
    <router-link class="routerlink" to="/studentresources"
      >Resources</router-link
    >
    <router-link class="routerlink" to="/StudentJobBoard"
      >Find Internships</router-link
    >
    <router-link class="routerlink" to="/applicationdashboard"
      >My Applications</router-link
    >
    <router-link class="routerlink" to="/StudentProfile">Profile</router-link>
    <router-link class="routerlink" to="/studentchatselection"
      >Messages</router-link
    >
    <button id="signButton" @click="logout">Log out</button>
  </div>
</template>
<script>
import { getAuth, signOut } from "firebase/auth";
import { alertMsg } from "../functions/alertMsg";
export default {
  methods: {
    logout() {
      signOut(getAuth())
        .then(() => {
          console.log("SignOut Successful");
          this.$router.push("/");
        })
        .catch((error) => {
          alertMsg("error", error.message);
        });
    },
  },
};
</script>



<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");
#signButton {
  border-radius: 5px;
  margin-right: 2%;
  width: 5.5%;
  background-color: white;
  border-style: solid;
  border-color: #96c67f;
  font-family: "Poppins", sans-serif;
}

#project {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.projectName {
  color: #96c67f;
}

#nav1 {
  display: flex;
  justify-items: flex-end;
  background-color: white;
  justify-content: space-between;
  padding: 15px;
  height: 30px;
  border-bottom: solid 10px;
  border-bottom-color: #96c67f;
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  color: #1f1d2a;
  font-size: 16px;
}
#nav1 button:last-child {
  margin-left: auto;
}
.routerlink {
  margin-inline: 1%;
  padding-left: 0.5%;
  padding-right: 0.5%;
  padding-top: 0.2%;
  text-decoration: none;
}

.routerlink:hover {
  border-bottom: 2px solid #96c67f;
}

.router-link-active {
  color: #96c67f !important;
  font-weight: 500;
}

.routerlink:visited {
  color: grey;
}

.routerlink:link {
  color: grey;
}
</style>