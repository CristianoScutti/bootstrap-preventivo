document.getElementById("preventivo").addEventListener("submit", function (event) {
    event.preventDefault(); // Previene il refresh della pagina

    let nome = document.getElementById("InputName");
    let cognome = document.getElementById("InputSurname");
    let email = document.getElementById("InputEmail");
    let servizio = document.getElementById("servizio");
    let inputCodiceSconto = document.getElementById("InputPromocode").value.trim();

    let error = false; // Flag per errore

    function mostraErrore(elemento, messaggio) {
        let errore = elemento.nextElementSibling;
        errore.textContent = messaggio;
        errore.style.display = "block";
        elemento.classList.add("is-invalid");
        error = true;
    }

    function nascondiErrore(elemento) {
        let errore = elemento.nextElementSibling;
        errore.style.display = "none";
        elemento.classList.remove("is-invalid");
    }

    [nome, cognome, email, servizio, document.getElementById("InputPromocode")].forEach(nascondiErrore);
    error = false;

    if (!nome.value.trim()) {
        mostraErrore(nome, "Il campo Nome è obbligatorio.");
    } else if (nome.value.trim().length < 3) {
        mostraErrore(nome, "Il nome deve contenere almeno 3 lettere.");
    }
    
    if (!cognome.value.trim()) {
        mostraErrore(cognome, "Il campo Cognome è obbligatorio.");
    } else if (cognome.value.trim().length < 3) {
        mostraErrore(cognome, "Il cognome deve contenere almeno 3 lettere.");
    }

    if (!email.value.trim()) mostraErrore(email, "Il campo Email è obbligatorio.");
    if (!servizio.value) mostraErrore(servizio, "Devi selezionare un servizio.");

    if (error) return; // Se c'è un errore, esci

    const prezzoBackend = 20;
    const prezzoFrontend = 15.3;
    const prezzoProject = 33.6;
    const oreLavoro = 10;
    const codiciScontoValidi = ["YHDNU32", "JANJC63", "PWKCN25", "SJDPO96", "POCIE24"];

    let prezzoOrario;
    let servizioSelezionato = servizio.value;
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

    let prezzoTotale = prezzoOrario * oreLavoro;
    let prezzoFinale = prezzoTotale;
    let codiceScontoValido = false;

    let erroreCodiceSconto = document.getElementById("errorCodiceSconto");
    document.getElementById("InputPromocode").addEventListener("input", () => {
        erroreCodiceSconto.style.display = "none";
    });
    
    erroreCodiceSconto.style.display = "none"; // Nasconde l'errore per default

    if (inputCodiceSconto) {
        if (codiciScontoValidi.includes(inputCodiceSconto)) {
            let sconto = (prezzoTotale * 25) / 100;
            prezzoFinale -= sconto;
            codiceScontoValido = true;
        } else {
            erroreCodiceSconto.textContent = "Codice sconto non valido! Verrà applicato il prezzo pieno.";
            erroreCodiceSconto.style.display = "block";
            codiceScontoValido = false;
        }
    }


    let parteIntera = Math.floor(prezzoFinale);
    let parteDecimale = (prezzoFinale % 1).toFixed(2).slice(2);

    document.getElementById("result").innerHTML =
    `<div><strong>Prezzo Finale:</strong> <strong>${parteIntera}</strong>,${parteDecimale} €</div>`;

    let prezzoFinaleHTML = `<div><strong>Prezzo Finale:</strong> <strong>${parteIntera}</strong>,${parteDecimale} €`;

    if (!codiceScontoValido && inputCodiceSconto) {
        prezzoFinaleHTML += " (senza sconto)";
    }
    
    prezzoFinaleHTML += "</div>";
    
    document.getElementById("result").innerHTML = prezzoFinaleHTML;
    

    document.getElementById("result").style.display = "block";
});



























