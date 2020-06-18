
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBxx6DU6ZoJvDMng3u_kgc4wPfdANkNRnI",
    authDomain: "amdt-web-development-proj.firebaseapp.com",
    databaseURL: "https://amdt-web-development-proj.firebaseio.com",
    projectId: "amdt-web-development-proj",
    storageBucket: "amdt-web-development-proj.appspot.com",
    messagingSenderId: "651873758981",
    appId: "1:651873758981:web:6a35e9d834cc16829c916c",
    measurementId: "G-7QPSFPM834"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

$(document).ready(function(){
    getTestimonials();

    var db = firebase.firestore();


    $("#addTestimonial").on('click', function () {
        const fname  = $("#f_name").val();
        const lname  = $("#l_name").val();
        const name = fname+ ' '+ lname;
        const shortName = fname.slice(0,1)+lname.slice(0,1);
        const msg  = $("#msg").val();

        if(fname!="" && lname!="" && msg!=""){

            db.collection("testimonial").add({
                name: name,
                message:msg,
                short_name: shortName,
            })
                .then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    alert('Testimonial Added');
                    $("#f_name").val('')
                    $("#l_name").val('')
                    $("#msg").val('')
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                    alert('ERROR - Please try again')
                });
        }

    })

    function getTestimonials() {
        firebase.firestore().collection('testimonial').get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    const rname = doc.data().name;
                    const rmsg = doc.data().message;
                    const rsn = doc.data().short_name;
                    console.log(rname,rmsg,rsn);

                    /*Card*/
                    const card = "<div class=\"col-lg-4\">\n" +
                        "        <div class=\"_card\">\n" +
                        "            <span class=\"tag\">"+rsn+"</span>\n" +
                        "            <p>"+rmsg+"</p>\n" +
                        "            <p class=\"author\">-"+rname+"-</p>\n" +
                        "        </div>\n" +
                        "    </div>"

                    $("#testimonials").append(card)
                })
            })
    }

    $("form").submit(function(e){
        e.preventDefault();
    });

});