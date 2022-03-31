<template>
    <body>
    <div id = 'mainContainer' >
        <div id = 'introductionContainer'>
            <div id ='picture'>
                <br>
                <img :src="image" id = 'avatar'>
                <br>
                <h2>{{companyName}}</h2>
            </div>

            <div id= 'about' v-for="(writeup, section) in this.aboutCompany" :key="section"> 
                <h2> {{section}} </h2> 
                <div class ='writeupfont'> {{writeup}} </div>
            </div>
        </div>
        <div  id = 'subContainer' v-for="(data,index) in this.companyProfileData" :key="index">
            <template v-for="(writeup, section) in data" :key ="section">
                <h2> {{ section }} </h2> 
                <div class ='writeupfont'> {{ writeup}} </div>
            </template>
        </div>
    </div>
    <div v-if= 'canRender'>
    <button id ='editButton' @click='goToEditProfile'>Edit Profile</button>
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
            companyProfileData: [],
            aboutCompany: '',
            image: '',
            companyName: '',
            canRender: false,
        }
    },
    async created() {
        this.$watch('companyProfileData', ()=> {
            this.canRender = true;
        })
    },
    async beforeMount() {
            const db = getFirestore(firebaseApp);
            const auth = getAuth()
            const uid = auth.currentUser.uid
            const docRef = doc(db, "User", "" + uid);
            const docSnap = await getDoc(docRef);
            let newData = docSnap.data().companyProfileData
            this.aboutCompany = newData.slice(0,1)[0]
            console.log(newData.slice(0,1)[0])
            this.companyName = docSnap.data().CompanyName
            this.companyProfileData = newData.slice(1)
            this.image = docSnap.data().photoURL
    },

    methods: {
        goToEditProfile() {
                this.$router.push({ path: "/EditEmployerProfile" });

        }
        
    } 
}  

</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");


#avatar {
    border-radius: 50%;
    height: 150px;
    width: 150px;

}

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
    font-weight: bold;
    background-color: #A5A6F6;
    border-style: solid;
    color:black;
    border-color: #A5A6F6;
}

#editButton:hover {
    background-color: #9698f5;

}

#editButton:active {
    transform: translateY(1px);
}
</style>