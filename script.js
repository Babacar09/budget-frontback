const totalSolde = document.getElementById("monSoldes");
const totalDepenses = document.getElementById("monprix1Depenses");

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/solde", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur : ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      totalSolde.textContent = data.solde + " FCFA";
    })
    .catch(error => {
      responseMessage.textContent = `Erreur : ${error.message}`;
    });
});

// Sélecteurs pour les éléments DOM
const validateButton = document.getElementById("validate");
//const responseMessage = document.getElementById("responseMessage");
// Validation et ajout d'une dépense
validateButton.addEventListener("click", () => {
  const montext = document.getElementById("montext").value;
  const montant = parseFloat(document.getElementById("montant").value);
  //const totalMontantDepenses = document.getElementById("monprix1Depenses");

  // // Envoi de la requête pour ajouter une dépense via l'API
  // fetch("http://localhost:3000/depenses/create", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify({ title: montext, montant: montant })
  // })
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error(`Erreur : ${response.statusText}`);
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     // Message de succès après ajout de la dépense
  //     responseMessage.textContent = "Dépense ajoutée avec succès !";

  //     ajouterLigneToTable(montext, montant, ".deleteLigne");
  //     mettreajour();
  //     // Mettre à jour le solde après ajout
  //   })

  //   .catch((error) => {
  //     responseMessage.textContent = `Erreur : ${error.message}`;
  //   });

  // Envoi de la requête pour ajouter une dépense via l'API
  fetch("http://localhost:3000/depenses/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: montext, montant: montant }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur : ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      // Message de succès après ajout de la dépense
      responseMessage.textContent = "Dépense ajoutée avec succès !";

      ajouterLigneToTable(montext, montant, ".deleteLigne");
      mettreajour();
      // Mettre à jour le solde après ajout
    })

    .catch(error => {
      responseMessage.textContent = `Erreur : ${error.message}`;
    });

  // Mise à jour du total des dépenses
});
mettreajour();

// Mise à jour du total des dépenses
// const montant = parseFloat(document.getElementById("montant").value);

//  const totalMontantDepenses = document.getElementById("monprix1Depenses");
//  let totalDepenses2 = parseFloat(totalMontantDepenses.textContent) || 0;
//  totalDepenses2 += montant;
//  totalMontantDepenses.textContent = totalDepenses2.toFixed(2);
//  mettreajour();
//console.log(typeof(totalMontantDepenses));

// const MontantToAdd = parseFloat(supprimerLigne.querySelector(".deleteDepense").textContent);
// let ToutDesDepenses = parseFloat(document.getElementById("monprix1Depenses").textContent) || 0 ;

// ToutDesDepenses += MontantToAdd;
// document.getElementById("monprix1Depenses").textContent = ToutDesDepenses.toFixed(2);

// //   // Mettre à jour le solde après suppression

//console.log(totalMontantDepenses);

//mettreajour()

// mettreajour();

// Fonction pour ajouter une ligne dans la table des dépenses
function ajouterLigneToTable(montext, montant, id, deleteLigne) {
  const tbodyTr = document.querySelector(".monTableBody");
  const newRow = `
    <tr>
        <td>${id}</td> 
        <td>${montext}</td>
        <td class="deleteDepense" >${montant}</td>
        <td><button type="button" class="${deleteLigne}"  id="deleted123">Supprimer</button></td>
    </tr>
    `;

  tbodyTr.insertAdjacentHTML("afterbegin", newRow);

  //   // Mise à jour du total des dépenses

  // Suppression de la ligne de la table
  const buttonSupprimerLigne = tbodyTr.querySelector(`.${deleteLigne}`);
  buttonSupprimerLigne.addEventListener("click", function () {
    let alertDeconfirmation = confirm("Voulez-vous supprimer cette ligne ?");
    const supprimerLigne = this.closest("tr");
    //supprimerLigne.remove()
    if (alertDeconfirmation) {
      //   // Supprimer la ligne de la table
      supprimerLigne.remove(`${id}`);

      //APPEL DE L'API POUR LA SUPRESSION D'UN MONTANT

      //const id = 123
      fetch(`http://localhost:3000/depenses/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: montext, montant: montant }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erreur : ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          // Message de succès après ajout de la dépense
          responseMessage.textContent = "Dépense ajoutée avec succès !";
          ajouterLigneToTable(montext, montant, ".deleteLigne");
          mettreajour(); // Mettre à jour le solde après ajout
        })
        .catch(error => {
          responseMessage.textContent = `Erreur : ${error.message}`;
        });

      // //   // Mise à jour du total des dépenses
      const MontantToDelete = parseFloat(
        supprimerLigne.querySelector(".deleteDepense").textContent
      );
      let ToutDesDepenses =
        parseFloat(document.getElementById("monprix1Depenses").textContent) ||
        0;

      ToutDesDepenses -= MontantToDelete;
      document.getElementById("monprix1Depenses").textContent =
        ToutDesDepenses.toFixed(2);

      // Mettre à jour le solde après suppression
      mettreajour();
    }
  });
}
// mettreajour();

const validateButton1 = document.getElementById("validate1");
// Validation et ajout d'un revenu
validateButton1.addEventListener("click", even => {
  const montext1 = document.getElementById("montext1").value;
  const montant1 = parseFloat(document.getElementById("montant1").value);

  // if (!montext1 || !montant1 || montant1 < 0) {
  //   alert("Veuillez remplir les champs correctement.");
  //   return;
  // }

  // Envoi de la requête pour ajouter un revenu via l'API
  fetch("http://localhost:3000/revenu", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: montext1, montant: montant1 }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur : ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      // Message de succès après ajout du revenu
      responseMessage.textContent = "Revenu ajouté avec succès !";
      ajouterLigneToTable1(montext1, montant1, ".deleteLigne1");
      mettreajour(); // Mettre à jour le solde après ajout
    })
    .catch(error => {
      responseMessage.textContent = `Erreur : ${error.message}`;
    });

  const totalMontantRevenus = document.getElementById("monprixRevenus");
  // Mise à jour du total des revenus
  let totalRevenus = parseFloat(totalMontantRevenus.textContent) || 0;
  totalRevenus += montant1;
  totalMontantRevenus.textContent = totalRevenus.toFixed(2);
  mettreajour();
});
// mettreajour();
// Fonction pour ajouter une ligne dans la table des revenus
function ajouterLigneToTable1(montext1, montant1, id, deleteLigne1) {
  const tbodyTr1 = document.querySelector(".monTableBody1");

  const newRow1 = `
      <tr>
        <td>${id}</td>
        <td>${montext1}</td>
        <td class="deleteRevenu">${montant1}</td>
        <td>
          <button type="button" class="${deleteLigne1}"  ID="deleted123"  >Supprimer</button>
        </td>
      </tr>
    `;

  tbodyTr1.insertAdjacentHTML("afterbegin", newRow1);

  // Suppression de la ligne de la table des revenus
  const buttonSupprimerLigne1 = tbodyTr1.querySelector(`.${deleteLigne1}`);
  buttonSupprimerLigne1.addEventListener("click", function () {
    let alertDeconfirmation1 = confirm("Voulez-vous supprimer cette ligne ?");
    const supprimeLigne1 = this.closest("tr");

    //let val = confirm("Voulez-vous supprimer cette ligne ?");
    if (alertDeconfirmation1) {
      supprimeLigne1.remove(`${id}`);

      fetch(`http://localhost:3000/revenu/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: montext1, montant: montant1 }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erreur : ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          // Message de succès après ajout de la dépense
          responseMessage.textContent = "Dépense ajoutée avec succès !";
          ajouterLigneToTable(montext1, montant1, ".deleteLigne1");
          mettreajour(); // Mettre à jour le solde après ajout
        })
        .catch(error => {
          responseMessage.textContent = `Erreur : ${error.message}`;
        });

      // Mise à jour du total des revenus
      const MontanttodeleteRevenu = parseFloat(
        supprimeLigne1.querySelector(".deleteRevenu").textContent
      );
      let toutDesRevenus =
        parseFloat(document.getElementById("monprixRevenus").textContent) || 0;

      toutDesRevenus += MontanttodeleteRevenu;
      document.getElementById("monprixRevenus").textContent =
        toutDesRevenus.toFixed(2);

      // Mettre à jour le solde après suppression
      mettreajour();
    }
  });
}

// Fonction pour mettre à jour le solde
function mettreajour() {
  const depenses =
    parseFloat(document.getElementById("monprix1Depenses").textContent) || 0;
  const revenus =
    parseFloat(document.getElementById("monprixRevenus").textContent) || 0;
  const solde = revenus - depenses;

  fetch("http://localhost:3000/solde", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ solde }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur : ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      // Message de succès après ajout de la dépense
      responseMessage.textContent = "Dépense ajoutée avec succès !";
      //ajouterLigneToTable(montext1, montant1, ".deleteLigne1");
      // mettreajour(); // Mettre à jour le solde après ajout
    })
    .catch(error => {
      responseMessage.textContent = `Erreur : ${error.message}`;
    });

  fetch("http://localhost:3000/solde", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ solde: solde }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur : ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      // Message de succès après ajout de la dépense
      responseMessage.textContent = "Dépense ajoutée avec succès !";
      //ajouterLigneToTable(montext1, montant1, ".deleteLigne1");
      //mettreajour(); // Mettre à jour le solde après ajout
      document.getElementById("monSoldes").textContent = solde.toFixed(2);
    })
    .catch(error => {
      responseMessage.textContent = `Erreur : ${error.message}`;
    });

  // Affichage du statut du solde
  // if (solde < 0) {
  //   document.getElementById("monSoldes").style.color = "red";
  //   document.getElementById("notes").innerHTML = "Solde insuffisant";
  //   document.getElementById("notes").style.color = "red";
  // } else if (solde > 0) {
  //   document.getElementById("monSoldes").style.color = "green";
  //   document.getElementById("notes").innerHTML = "Solde positif";
  //   document.getElementById("notes").style.color = "green";
  // } else {
  //   document.getElementById("notes").innerHTML = "Solde nul";
  //   document.getElementById("notes").style.color = "black";
  // }
}

// Affichage des formulaires
const addForm = document.getElementById("addForm");
const monButton = document.getElementById("AddButton");
const close = document.querySelector(".close");

monButton.onclick = function () {
  addForm.style.display = "block";
};

close.onclick = function () {
  addForm.style.display = "none";
};

const addForm1 = document.getElementById("addForm1");
const monButton1 = document.getElementById("AddButton1");
const close1 = document.querySelector(".close1");

monButton1.onclick = function () {
  addForm1.style.display = "block";
};

close1.onclick = function () {
  addForm1.style.display = "none";
};

// Charger les dépenses et revenus à l'initialisation de la page
fetch("http://localhost:3000/depenses")
  .then(response => response.json())
  .then(data => {
    const montantTotalDepenses = data.reduce(
      (acc, val) => acc + val.montant,
      0
    );
    totalDepenses.textContent = montantTotalDepenses + " FCFA";
    data.forEach(item => {
      ajouterLigneToTable(
        item.title,
        item.montant,
        item.id,
        document.querySelector(".deleteLigne")
      );
    });
  })
  .catch(error => {
    console.error("Erreur lors du chargement des dépenses", error);
  });

fetch("http://localhost:3000/revenu")
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      ajouterLigneToTable1(
        item.title,
        item.montant,
        item.id,
        document.querySelector(".deleteLigne1")
      );
    });
  })
  .catch(error => {
    console.error("Erreur lors du chargement des revenu", error);
  });

//})

// [
//   {
//       "id": 1,
//       "title": "Ndekki",
//       "montant": 4500
//   },
//   {
//       "id": 4,
//       "title": "Transport",
//       "montant": 700
//   },
//   {
//       "id": 5,
//       "title": "Lunch",
//       "montant": 700
//   }
// ].reduce((acc, value) => {
//   return acc + value.montant
// }, 0)
