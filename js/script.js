
document.getElementById("preventivo").addEventListener("submit", function (event) {
   event.preventDefault(); // Previene il refresh della pagina
   let nome = document.getElementById("InputName").value.trim();
   let cognome = document.getElementById("InputSurname").value.trim();
   let email = document.getElementById("InputEmail").value.trim();

   // Verifica che tutti i campi obbligatori siano compilati
   if (!nome || !cognome || !email) {
       alert("Compila tutti i campi obbligatori.");
       return; // Interrompe l'esecuzione se manca un campo obbligatorio
   }
 
   
   // Definizione dei prezzi per ogni servizio
   const prezzoBackend = 20;
   const prezzoFrontend = 15.3;
   const prezzoProject = 33.6;
   
   // Numero fisso di ore di lavoro
   const oreLavoro = 10;
   
   // Lista dei codici sconto validi
   const codiciScontoValidi = ["YHDNU32", "JANJC63", "PWKCN25", "SJDPO96", "POCIE24"];

     // Recupera il servizio selezionato
     let selectElement = document.getElementById("servizio");
     let servizioSelezionato = selectElement.value;
  
     // Recupera il codice sconto inserito dall'utente
     let inputCodiceSconto = document.getElementById("InputPromocode");
     let codiceSconto = inputCodiceSconto.value.trim();
   
   
   let prezzoOrario;
   
   // Determina il prezzo orario in base al servizio selezionato
   if (servizioSelezionato === "Backend") {
       prezzoOrario = prezzoBackend;
   } else if (servizioSelezionato === "Frontend") {
       prezzoOrario = prezzoFrontend;
   } else if (servizioSelezionato === "Project") {
       prezzoOrario = prezzoProject;
   } else {
       alert("Seleziona un servizio");
       return;
   }
   
   // Calcola il prezzo totale
   let prezzoTotale = prezzoOrario * oreLavoro;
   let prezzoFinale = prezzoTotale;
   
   // Applica lo sconto se il codice è valido
   let codiceScontoValido = false;
   let sconto = 0
   if (codiceSconto) {
       if (codiciScontoValidi.includes(codiceSconto)) {
           sconto =(prezzoTotale * 25) / 100;
           prezzoFinale = prezzoTotale - sconto; // Applica sconto del 25%
           codiceScontoValido =true;
       } else {
           alert("Codice sconto non valido! Verrà applicato il prezzo pieno.");
         
       }
   }
   
   // Mostra il prezzo finale nella pagina
   document.getElementById("finalPrice").textContent = prezzoFinale.toFixed(2);
   document.getElementById("result").style.display = "block";


    // Se il codice sconto è errato, mostra un messaggio per informare l'utente
    if (!codiceScontoValido && codiceSconto) {
      document.getElementById("finalPrice").textContent += " (senza sconto)";
  }
});

    

  

  
   
    
   
   


   
   

   
   
   
   
   
   
 





