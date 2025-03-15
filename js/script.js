document.getElementById("preventivo").addEventListener("submit", function (event) {
    event.preventDefault(); // Previene il refresh della pagina

    let nome = document.getElementById("InputName");
    let cognome = document.getElementById("InputSurname");
    let email = document.getElementById("InputEmail");
    let servizio = document.getElementById("servizio");
    let inputCodiceSconto = document.getElementById("InputPromocode").value.trim();
    let privacyCheckbox = document.getElementById("flexCheckChecked"); // Checkbox Privacy
    let error = false; // Flag per errore

    function mostraErrore(elemento, messaggio) {
        let errore = elemento.nextElementSibling;
        errore.textContent = messaggio;
        errore.style.display = "block";
        elemento.classList.add("is-invalid");
        elemento.classList.remove("is-valid"); // Rimuove lo stato valido in caso di errore
        error = true;
    }

    function nascondiErrore(elemento) {
        let errore = elemento.nextElementSibling;
        if (errore) {
            errore.style.display = "none";
        }
        elemento.classList.remove("is-invalid");

        // Se è un checkbox, rimuove is-invalid e aggiunge is-valid per farlo tornare blu
        if (elemento.type === "checkbox") {
            elemento.classList.add("is-valid"); 
        }
    }

    // Nasconde tutti gli errori inizialmente
    error = false;
    [nome, cognome, email, servizio, document.getElementById("InputPromocode"), privacyCheckbox].forEach(nascondiErrore);

    // Validazione Nome
    if (!nome.value.trim()) {
        mostraErrore(nome, "Il campo Nome è obbligatorio.");
    } else if (nome.value.trim().length < 3) {
        mostraErrore(nome, "Il nome deve contenere almeno 3 lettere.");
    }

    // Validazione Cognome
    if (!cognome.value.trim()) {
        mostraErrore(cognome, "Il campo Cognome è obbligatorio.");
    } else if (cognome.value.trim().length < 3) {
        mostraErrore(cognome, "Il cognome deve contenere almeno 3 lettere.");
    }

    // Validazione Email
    if (!email.value.trim()) mostraErrore(email, "Il campo Email è obbligatorio.");

    // Validazione Servizio
    if (!servizio.value.trim()) mostraErrore(servizio, "Devi selezionare un servizio.");

    // **Validazione Checkbox Privacy Policy**
    if (!privacyCheckbox.checked) {
        mostraErrore(privacyCheckbox, "Devi accettare la Privacy Policy.");
    }

    if (error) return; // Blocca l'invio se ci sono errori

    // Prezzi per servizio
    const prezzi = {
        Backend: 20,
        Frontend: 15.3,
        Project: 33.6
    };
    const oreLavoro = 10;
    const codiciScontoValidi = ["YHDNU32", "JANJC63", "PWKCN25", "SJDPO96", "POCIE24"];

    let prezzoOrario = prezzi[servizio.value] || 0;
    if (prezzoOrario === 0) {
        alert("Seleziona un servizio valido.");
        return;
    }

    let prezzoTotale = prezzoOrario * oreLavoro;
    let prezzoFinale = prezzoTotale;

    // Validazione e applicazione codice sconto
    let erroreCodiceSconto = document.getElementById("errorCodiceSconto");
    erroreCodiceSconto.style.display = "none"; // Nasconde l'errore per default

    if (inputCodiceSconto) {
        if (codiciScontoValidi.includes(inputCodiceSconto)) {
            prezzoFinale -= (prezzoTotale * 25) / 100;
        } else {
            erroreCodiceSconto.textContent = "Codice sconto non valido! Verrà applicato il prezzo pieno.";
            erroreCodiceSconto.style.display = "block";
        }
    }

    // Formattazione del prezzo
    let parteIntera = Math.floor(prezzoFinale);
    let parteDecimale = (prezzoFinale % 1).toFixed(2).slice(2);

    // Mostra il risultato
    document.getElementById("result").innerHTML =
        `<div><strong>Prezzo Finale:</strong> <strong>${parteIntera}</strong>,${parteDecimale} €</div>`;
    document.getElementById("result").style.display = "block";
});

// Gestione messaggio per il checkbox Privacy Policy
document.getElementById("flexCheckChecked").addEventListener("change", function () {
    let errore = this.nextElementSibling; // Il messaggio di errore accanto al checkbox
    
    if (this.checked) {
        this.classList.remove("is-invalid"); // Rimuove il bordo rosso
        this.classList.add("is-valid"); // Aggiunge il bordo blu
        
        // Mostra il messaggio che l'utente ha accettato la privacy policy
        if (errore) {
            errore.textContent = "Hai accettato la Privacy Policy"; // Cambia il messaggio
            errore.style.display = "block"; // Mostra il messaggio
            errore.style.color = "blue"; // Colore blu per il messaggio di successo
        }
    } else {
        this.classList.add("is-invalid"); // Mantiene il bordo rosso se deselezionato
        if (errore) {
            errore.textContent = "Devi accettare la Privacy Policy."; // Messaggio di errore
            errore.style.display = "block"; // Mostra il messaggio
            errore.style.color = "red"; // Colore rosso per il messaggio di errore
        }
    }
});

// Nasconde l'errore del codice sconto quando si digita nel campo
document.getElementById("InputPromocode").addEventListener("input", function () {
    document.getElementById("errorCodiceSconto").style.display = "none";
});

























