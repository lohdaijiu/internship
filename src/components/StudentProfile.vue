<template>
    <body>
    <div id = 'mainContainer' >
        <div id = 'introductionContainer'>
            <div id ='picture'>
                <br>
                <img :src="image">
                <br>
                <h2>{{name}}</h2>
            </div>

            <div id= 'about' v-for="(writeup, section) in this.about" :key="section"> 
                <h2> {{section}} </h2> 
                <div class ='writeupfont'> {{writeup}} </div>
            </div>
            <div v-if='canRender'>
                <h2> Support Documents:</h2>
                <a :href="resumeURL" target="_blank" id ='resumeLink' >Resume Document</a>


            </div>
        </div>
        <div  id = 'subContainer' v-for="(data,index) in this.profileData" :key="index">
            <template v-for="(writeup, section) in data" :key ="section">
                <h2> {{ section }} </h2> 
                <div class ='writeupfont'> {{ writeup}} </div>
            </template>
        </div>
    </div >
    <div v-if='canRender'>
    <button  id ='editButton' @click='goToEditProfile'>Edit Profile</button>
    </div>
    </body>
   
</template>
<script>
import firebaseApp from '../main.js'
import { getFirestore} from "firebase/firestore";
import { doc , getDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";


export default {
    data() {
        return {
            profileData: [],
            about: '',
            image: '',
            name: '',
            resumeURL:'',
            canRender: false,
        }
    },
    async created() {
        this.$watch('profileData', ()=> {
            this.canRender = true;
        })
    },
    async beforeMount() {
            const db = getFirestore(firebaseApp);
            const auth = getAuth()
            const uid = auth.currentUser.uid
            const docRef = doc(db, "User", "" + uid);
            const docSnap = await getDoc(docRef);
            let newData = docSnap.data().ProfileData
            this.about = newData.slice(0,1)[0]
            this.name = docSnap.data().Name
            this.profileData = newData.slice(1)
            this.image = docSnap.data().photoURL
            this.resumeURL = docSnap.data().resumeURL

    },

    methods: {
        goToEditProfile() {
                this.$router.push({ path: "/EditStudentProfile" });

        }
        
    } 
}  

</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");

#resumeLink {
    text-decoration: none;
    font-family: "Poppins", sans-serif;
  
    font-weight: 300;
    color: #1f1d2a;
    font-size: 18px;
}

a:hover {
    
    border-bottom: solid 1px #1f1d2a;
    
    
}
.writeupfont {
    font-family: "Poppins", sans-serif;
  
    font-weight: 300;
    color: #1f1d2a;
    font-size: 16px;
}



#picture {
    display: flex;
    flex-direction: column;
    margin-top: 2%;
    padding-left: 2%;
    margin-right: 2%;
    width: 3%;
    min-width: 10%;
}

h2{
    min-width: 200px;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    color: #1f1d2a;
    font-size: 20px;
}

#about {
    display: flex;
    flex: 1 1 auto;
    padding-left: 2%;
    padding-right: 3%;
    justify-content: left;
    align-items: left;
    text-align: left;
    flex-direction: column;
    margin-left: 5%;
    font-weight: 600;
    color: #1f1d2a;
    font-size: 22px;
}


#introductionContainer {
    display:flex;
    justify-content:space-evenly;
    align-items: center;
    flex-direction: row;
    max-height: 10%;
    text-align: left;
    overflow: auto;
    resize: none;
    padding-top: 2%;
    padding-bottom: 2%;
    padding-left: 2.5%;
    padding-right: 10%;
    width: 85%;
    
}
#mainContainer {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    width: 80%;
    margin-top: 5%;
    margin-bottom: 1%;
    margin-left: 9.5%;
    margin-right: 5%;
    padding-bottom: 4%;
    min-height:500px;
    border-radius: 30px;
    background-color: white;
}

#subContainer {
    display:flex;
    justify-content: center;
    align-items: left;
    flex-direction: column;
    margin-top: 2%;
    margin-left: 4%;
    margin-right: 4%;
    margin-bottom: 1%;
    text-align: left;
    width: 90%;
    resize: none;
    overflow: auto;
    min-height: 100px;
    
}

#editButton {
    border-radius: 5px;
    margin-left: 80%;
    margin-top: 1%;
    padding-left: 1.5%;
    padding-right: 1.5%;
    padding-top: 0.5%;
    text-align: center;
    padding-bottom: 0.5%;
    margin-bottom: 5%;
    color:black;
    font-weight: bold;
    background-color: #D4D381;
    border-style: solid;
    border-color: #96C67F;
}

#editButton:hover {
    background-color: #50e655;

}

#editButton:active {
    transform: translateY(1px);
}
</style>