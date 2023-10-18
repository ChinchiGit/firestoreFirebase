const firebaseConfig = {
    apiKey: "AIzaSyB4tC2LRQlgBbFUm0nNaogSV3Ybgr_Rhgg",
    authDomain: "fir-firebase-f2fa5.firebaseapp.com",
    projectId: "fir-firebase-f2fa5",
    storageBucket: "fir-firebase-f2fa5.appspot.com",
    messagingSenderId: "977029365894",
    appId: "1:977029365894:web:cc5b08eb3cf8779951d107"
};

firebase.initializeApp(firebaseConfig);// Inicializaar app Firebase

const db = firebase.firestore();// db representa mi BBDD //inicia Firestore

let formulario = document.querySelector("form");
const pintar = document.getElementById("pintar");

let usuario;

//crear usuario
const createPicture = () => {
    db.collection("usersList02")
        .add(usuario)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id)
        })
        .catch((error) => console.error("Error adding document: ", error));
};




formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = event.target.nombre.value;
    const email = event.target.email.value;
    const mensaje = event.target.mensaje.value;
    const imagen = event.target.imagen.value;

    usuario = {
        nombre: nombre,
        email: email,
        mensaje: mensaje,
        imagen: imagen
    }

    createPicture(usuario);
    //readAll ();

})



//Funcion para leer la coleccion y mandarla a pintar
const readAll = () => {
    db.collection("usersList02")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let contact = doc.data();
                console.log((contact.nombre, contact.email, contact.imagen, contact.mensaje , contact.id));

                let card = document.createElement("article");
                let picture = document.createElement('img');                
                picture.setAttribute('src', contact.imagen);
                picture.setAttribute('style', 'max-width:250px');
                let caption = document.createElement('span');
                caption.innerHTML= contact.nombre;
                let correo = document.createElement("span");
                correo.innerHTML = contact.email;
                let mens = document.createElement("span");
                mens.innerHTML = contact.mensaje;

                card.appendChild(picture);
                card.appendChild(caption);
                card.appendChild(correo);
                card.appendChild(mens);
                pintar.appendChild(card);

            });

        })
        .catch(() => console.log('Error reading documents'));
};

//Delete
const deletePicture = () => {
    const id = prompt('Introduce el ID a borrar');
    db.collection("usersList02").doc(id).delete().then(() => {
      alert(`Documento ${id} ha sido borrado`);
      //Clean
      document.getElementById('pintar').innerHTML = "";
      //Read all again
      readAll();
    })
      .catch(() => console.log('Error borrando documento'));
  };


//Clean screen
const cleanList = () => {
    document.getElementById('pintar').innerHTML = "";
  };


// Borrar toda la DB  

function deleteAllDb(){
    db.collection("usersList02")
    .get()
    .then(res => {
      res.forEach(element => {
        element.ref.delete();
      });
    });
}




// ******* EVENTOS BOTONES ***********

document.getElementById("read-all").addEventListener("click", () => {
    readAll();
});


//Delete one
document.getElementById('delete').addEventListener('click', () => {
    deletePicture();
});

//Clean
document.getElementById('clean').addEventListener('click', () => {
    cleanList();
});


//Borrar toda la BD
document.getElementById("deleteAll").addEventListener('click', () => {
    deleteAllDb ();
});