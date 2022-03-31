<template>
    <div id="nav1" >
        <div id = 'project'>
            <h2 class = 'projectName'>internSHIP</h2>
            <img src="../assets/boat.png" id = 'icon'>
        </div>
        <router-link class ='routerlink' to="/EmployerHome">Home </router-link> 
        <router-link class ='routerlink' to="/addjoblisting">Create Listing</router-link> 
        <router-link class ='routerlink' to="/viewapplicants">Application Management</router-link> 
        <router-link class ='routerlink' to="/EmployerProfile">Profile</router-link> 
        <router-link class ='routerlink' to="/employerchatselection">Messages</router-link> 
        <button id = "signButton" @click ="logout">Log out </button>
    </div>
    
</template>
<script>
import { getAuth, signOut } from "firebase/auth";

export default {
    methods : {
        logout() {

            signOut(getAuth())
            .then(() => {console.log("SignOut Successful");
            this.$router.push('/')})
            .catch((error) => {alert(error.message)})
        }
    }
}

</script>

<style scoped>
#signButton {
    border-radius: 5px;
    margin-right: 2%;
    width: 5.5%;
    background-color: white;
    border-style: solid;
    border-color: #A5A6F6;
}

#project {
    display: flex;
    flex-direction: row;
    align-items: center;  
}
.projectName {
    color: #A5A6F6;
}

#nav1 {
    display: flex;
    justify-items:flex-end;
    background-color: white;
    justify-content: space-between;
    padding:15px;
    height:30px;
    border-bottom: solid 10px;
    border-bottom-color: #A5A6F6;
    font-family: "Poppins", sans-serif;
    font-weight: 300;
    color: #1f1d2a;
    font-size: 16px;
}
#nav1 button:last-child {
    margin-left:auto;
}
.routerlink{
    margin-inline: 1%;
    padding-left: 0.5%;
    padding-right: 0.5%;
    padding-top: 0.2%;
    text-decoration: none;
}

.routerlink:hover {
    border-bottom: 2px solid #A5A6F6;
}

.router-link-active {
    color: #A5A6F6 !important;
    font-weight: 500;
}
</style>