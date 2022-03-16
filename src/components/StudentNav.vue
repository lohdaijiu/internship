<template>
    <div id="nav1" >
        <div id = 'project'>
            <h2 class = 'projectName'>internSHIP</h2>
            <img src="../assets/boat.png" id = 'icon'>
        </div>
        <router-link class ='routerlink' to="/HomePage">Home </router-link> 
        <router-link class ='routerlink' to="">Resources</router-link> 
        <router-link class ='routerlink' to="/StudentJobBoard">Find Internships</router-link> 
        <router-link class ='routerlink' to="">My Applications</router-link> 
        <router-link class ='routerlink' to="/StudentProfile">Profile</router-link> 
        <button id = 'signButton' >Sign out</button>
    </div>
    
</template>
<script>


</script>
<style>
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 15px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
body, html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
  background-color: rgb(230, 240, 248) ;
}
</style>

<style scoped>
#signButton {
    border-radius: 5px;
    margin-right: 2%;
    width: 5.5%;
    background-color: white;
    border-style: solid;
    border-color: #96C67F;
}

#project {
    display: flex;
    flex-direction: row;
    align-items: center;  
}
.projectName {
    color: #96C67F;
}

#nav1 {
    display: flex;
    justify-items:flex-end;
    background-color: white;
    justify-content: space-between;
    padding:15px;
    height:30px;
    border-bottom: solid 10px;
    border-bottom-color: #96C67F;
}
#nav1 button:last-child {
    margin-left:auto;
}
.routerlink{
    margin-inline: 1%;
    padding: 0.5%;
    text-decoration: none;
}

.routerlink:hover {
    border-bottom: 2px solid #96C67F;
}

</style>