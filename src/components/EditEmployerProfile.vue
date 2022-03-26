<template>
<body>
    <div id = 'mainContainer'>
        <div id = 'uploadContainer'>
            <div id ='picture'>
                <h2>My Profile</h2>
                <img :src='image'>
                <br>
                <button id = 'uploadButton' @click="onPickFile">Upload Image</button>
                <input type="file" ref= "fileInput" style="display: none" accept="image/*" @change="onFilePicked">
                <br>
            </div>
        </div>
        <div id = 'contentContainer'>
            <div  id = 'subContainer' v-for="(profile, index) in this.profile" :key="index">
                    <span  @click="deleteExistingSection(profile.section)">x</span>
                    <input type="text" v-model="profile.section"> 
                    <br>
                    <textarea type="text" v-model="profile.writeup"> </textarea>
            </div>
            <button id='addButton' @click="addSection">Add another section</button>
            <br>
            <div id = 'subContainer' v-for="(profile, counter) in this.tempProfile" :key="counter">
                <span  @click="deleteSection(counter)">x</span>
                
                <input type="text" placeholder="Enter Section Title here" v-model="profile.section" required>
                <br>
                <textarea type="text" placeholder="Please enter here" v-model="profile.writeup"> </textarea>
                
            </div>
        </div>
        
    </div>
    <div id = 'buttonContainer'>
        <router-link to="/EmployerProfile"> <button id ='applyButton' @click="apply" >Apply</button></router-link>
        <router-link to="/EmployerProfile"> <button id ='cancelButton' >Cancel</button></router-link>
    </div>
</body>
</template>

<script>
import firebaseApp from '../main.js';
import { getFirestore} from "firebase/firestore";
import { doc , getDoc, updateDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default {
    data() {
        return {
            profile: [{
                section: "",
                writeup: ""
            }],
            tempProfile: [{
                section: "",
                writeup: ""
            }],
            image: '',

        }
    },

    async created() {
            const db = getFirestore(firebaseApp);
            const auth = getAuth();
            const uid = auth.currentUser.uid;
            const docRef = doc(db, "User", "" + uid);
            const docSnap = await getDoc(docRef);
            let arrayData = docSnap.data().companyProfileData;
            for (let i = 0; i< arrayData.length; i++) {
                let val = arrayData[i];
                for  (const [key,value] of Object.entries(val)) {
                        this.profile.push({
                            section: key,
                            writeup: value
                        })               
                }
            }
            this.image = docSnap.data().photoURL
            this.profile.shift()
            this.tempProfile.shift()
    },

    methods: {
        async apply() {
            const db = getFirestore(firebaseApp);
            const auth = getAuth();
            const uid = auth.currentUser.uid;
            const docRef = doc(db, "User", "" + uid);
            let array = [];
            for (let i = 0; i< this.profile.length;i++) {
                let val = this.profile[i];
                let mapValue = {}
                mapValue[val.section] = val.writeup
                array.push(mapValue)
            }
            
            for (let i = 0; i< this.tempProfile.length;i++) {
                let val = this.tempProfile[i];
                let mapValue = {}
                mapValue[val.section] = val.writeup
                array.push(mapValue)
            }

            updateDoc(docRef, {
                companyProfileData: array,
                photoURL: this.image,
            })
        },

        addSection() {
            this.tempProfile.push({
                section: '',
                expiration: '',
            })
        },
        
        deleteExistingSection(section) {
            for (let i = 0; i< this.profile.length;i++) {
                let val = this.profile[i];
                if (section == val.section) {
                    this.profile.splice(i,1);
                }
            }
        },

        deleteSection(counter){
            this.tempProfile.splice(counter,1);
        },
        onPickFile() {
            this.$refs.fileInput.click()
        },
        
        

        onFilePicked(event) {
            const auth = getAuth();
            const uid = auth.currentUser.uid;
            const file = event.target.files[0];
            const storage = getStorage();
            const storageRef = ref(storage, ''+ uid + '/profile/' + file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed', 
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        console.log(snapshot.state)
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                        }
                    },
                        (error) => {
                        switch (error.code) {
                            case 'storage/unauthorized':
                                // User doesn't have permission to access the object
                                break;
                            case 'storage/canceled':
                                // User canceled the upload
                                break;                    
                        }
                    },
                    () => {
                            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                this.image = downloadURL
                        });
                    }
                );      
        },
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

h2 {
    font-family: "Poppins";
    text-align: center;
}
#buttonContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-left: 73.5%;
    max-width: 15%;
    padding-right: 3%;
    min-height: 200px;
}
#addButton {
    border-radius: 10px;
    margin-left: 73.5%;
    padding-left: 1.5%;
    padding-right: 1.5%;
    padding-top: 0.5%;
    padding-bottom: 0.5%;
    text-align: center;
    padding-bottom: 0.5%;
    margin-top: 2%;
    font-weight: bold;
    background-color: #A5A6F6;
    border-style: solid;
    border-color: #A5A6F6;
}

#addButton:hover {
    background-color: #a9abfa;

}
#addButton:active {
    transform: translateY(1px);
}



#picture {
    display: flex;
    flex-direction: column;
    flex: 1 1  auto;
    
    background-size: 30px 30px;
    margin-top: 25%;
    margin-left:10%;
    width: 5%;
    min-width: 80%;
    min-height: 300px;
    
    
}

span:hover {
    background-color:#ccc;
    
}

span {
    border-radius: 15px;
    min-width: 0.5%;
    text-align: center;
}
#uploadButton {
    border-radius: 5px;
    padding-top: 5%;
    padding-bottom: 5%;
    text-align: center;
    font-weight: bold;
    background-color: #A5A6F6;
    border-style: solid;
    border-color: #A5A6F6;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    color: #1f1d2a;
    font-size: 16px;
}

#uploadButton:hover {
    background-color: #a9abfa;

}

#uploadButton:active {
    transform: translateY(1px);
}

#applyButton {
    border-radius: 10px;
    
    padding-left: 50%;
    padding-right: 50%;
    padding-top: 24%;
    padding-bottom: 24%;
    text-align: center;

    font-weight: bold;
    background-color: #A5A6F6;
    border-style: solid;
    border-color: #A5A6F6;
}

#cancelButton {
    border-radius: 10px;
    margin-left: 30%;
    
    padding-left: 40%;
    padding-right: 40%;
    padding-top: 20%;
    padding-bottom: 20%;
    text-align: center;
    font-weight: bold;
    background-color: #A5A6F6;
    border-style: solid;
    border-color: #A5A6F6;
}
#applyButton:hover {
    background-color: #a9abfa;

}
#applyButton:active {
    transform: translateY(1px);
}

#cancelButton:hover {
    background-color: #a9abfa;

}
#cancelButton:active {
    transform: translateY(1px);
}
input {
    border: #ccc;
    background-color: #f8f8f8;
    box-sizing:border-box;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    color: #1f1d2a;
    font-size: 16px;
    border-radius: 15px;
    max-width: 30%;
}

textarea {
    width: 100%;
    height: 150px;
    padding: 12px 20px;
    box-sizing:border-box;
    border: 2px solid #ccc;
    border-radius: 10px;
    background-color: #f8f8f8;
    font-family: "Poppins", sans-serif;
    font-weight: 300;
    color: #1f1d2a;
    font-size: 16px;
    resize: none;
}

#uploadContainer {
    display:flex;
    justify-content:space-evenly;
    align-items: center;
    flex-direction: column;
    width: 15%;
    text-align: left;
    overflow: auto;
    resize: none;
}

#contentContainer {
    display:flex;
    justify-content:space-evenly;
    align-items: center;
    flex-direction: column;
    width: 80%;
    text-align: left;
    overflow: auto;
    resize: none;
    min-height: 500px;
    
}
#mainContainer {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-direction: row;
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
span {
    margin-left: 97%;
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

</style>