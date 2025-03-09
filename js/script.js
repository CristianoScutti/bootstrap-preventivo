//Prelevo input e form//

const richiestaPreventivo = document.getElementById("preventivo");


const name = document. getElementById("InputName");

const surname = document. getElementById("InputSurname");


const email = document. getElementById("InputEmail");


const promoCode = document. getElementById("InputPromocode");

const backendInput = document. getElementById("Backend");
const forntendInput = document. getElementById("Frontend");
const projectInput = document. getElementById("Project");


richiestaPreventivo. addEventListener ("submit", calcolocodicesconto);


//creo la funzione per il bottone calcola preventivo//

 
function calcolocodicesconto(event) {
   event.preventDefault();
   console.log("submit");
   const preventivo = richiestaPreventivo.value;
   
   const inputName = name.value; 

   const inputSurname = surname.value
     
   const inputEmail = email.value;
   
   const InputPromocode = promoCode.value;

   const Backend = backendInput.value;
   const Frontend = forntendInput.value;
   const Project = projectInput.value;

   

   //prezzoBase 

   const prezzobackend = 20.50;
   const ore = 10;
   
   const prezzoFinaleBackend = prezzobackend * ore;
   console.log(prezzoFinaleBackend);

  
   
    
   
   


   
   

   
   
   
   
   
   
 




}

