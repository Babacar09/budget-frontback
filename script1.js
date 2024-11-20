const totalSolde = document.getElementById("monSoldes");
const totalDepenses = document.getElementById("monprix1Depenses");
const totalRevenus = document.getElementById('monprixRevenus');
document.addEventListener('DOMContentLoaded', ()=>{
    fetch('http://localhost:3000/solde',{
        method:'GET',
        headers:{
            "Content-Type":"application/json"
        },
        
    })
    .then(response =>{
        if(!response.ok){
            throw new Error(`Erreur: ${response.statusText}`)
        }
        return response.json()
    })
    .then(data =>{
        totalSolde.textContent = data.solde + " FCFA"
     
    })
   .catch(error =>{
    responseMessage.textContent = `Erreur: ${error.message}`
   })

})
    const validateButton = document.getElementById('validate')
    validateButton.addEventListener('click', ()=>{
        const montext = document.getElementById('montext').value
        const montant = parseFloat( document.getElementById('montant').value)
 
        fetch('http://localhost:3000/depenses/create',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({title:montext, montant:montant})
        })
        .then(response =>{
            if(!response.ok){
                throw new Error(`Erreur:${response.statusText}`)
            }
            return response.json()
        })
        .then(data =>{
            responseMessage.textContent ='Depense ajoute avec succes'
              ajouterLigneToTable( montext, montant, ".deleteLigne")
              mettreajour()

         })
        .catch(error =>{
            responseMessage.textContent = `Erreur:${error.message}`
           
        })
    
        if(montant < 0){
          alert('veuiler mettre un bon montant ')
        }

     
    })
 
   mettreajour()
    function ajouterLigneToTable(montant, montext, id, deleteLigne){
      const tbodyTr = document.querySelector(".monTableBody");
      const newRow = `
          <tr>
            <td>${id}</td> 
            <td>${montext}</td>
            <td class="deleteDepense"  id="deleteDepense2" >${montant}</td>
            <td><button type="button" class="${deleteLigne}"  id="deleted123">Supprimer</button></td>
        </tr>
        `;
      tbodyTr.insertAdjacentHTML("afterbegin", newRow);
      const buttonSupprimerLigne = tbodyTr.querySelector(`.${deleteLigne}`);

      buttonSupprimerLigne.addEventListener("click", function () {
        let alertConfirmation = confirm("vouler vous supprimer");
        const supprimerLigne = this.closest("tr");
        if (alertConfirmation) {
          supprimerLigne.remove(`${id}`);
          fetch(`http://localhost:3000/depenses/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: montext, montant: montant }),
          })
          .then((response) => {
              if (!response.ok) {
                throw new Error(`Erreur : ${response.statusText}`);
              }
              return response.json();
           })
          .then((data) => {
              // Message de succès après ajout de la dépense
              responseMessage.textContent = "Dépense ajoutée avec succès !";
              ajouterLigneToTable(montext, montant, ".deleteLigne");
              mettreajour(); // Mettre à jour le solde après ajout


           })

            .catch((error) => {
              responseMessage.textContent = `Erreur : ${error.message}`;
             

            });
          

              


             //converstion d'une chaine de caractere
             const MontantToDelete = parseFloat(
              supprimerLigne.querySelector(".deleteDepense").textContent
            );
            
          
           



          
            console.log(MontantToDelete);
            
            let ToutDesDepenses =
              parseFloat(document.getElementById("monprix1Depenses").textContent) ||
              0;
              ToutDesDepenses -= MontantToDelete;
            document.getElementById("monprix1Depenses").textContent =   ToutDesDepenses.toFixed(2);
           
              mettreajour();
              location.reload();
             

              console.log(ToutDesDepenses);
       

          

         
          // Mettre à jour le solde après suppression
           
        
        }
        
       
      });
    }

    const validateButton1 = document.getElementById('validate1')
    validateButton1.addEventListener('click', ()=>{
        const montext1 = document.getElementById('montext1').value;
        const montant1 =  parseFloat( document.getElementById('montant1').value)

        fetch('http://localhost:3000/revenu',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({title:montext1, montant:montant1})
        })
        .then(response =>{
            if(!response.ok){
                throw new Error(`Erreur:${response.statusText}`)
            }
            return response.json()
        })
        .then(data =>{
            responseMessage.textContent ='Depense ajoute avec succes'
              ajouterLigneToTable( montext1, montant1, ".deleteLigne")
              mettreajour()

         })
        .catch(error =>{
            responseMessage.textContent = `Erreur:${error.message}`
           
        })
        if(montant1 < 0){
          alert('veuiler mettre un bon montant ')
        }
 
    })

    function ajouterLigneToTable1(montant1, montext1, id, deleteLigne1){
        const tbodyTr1 = document.querySelector(".monTableBody1")
        const newRow1 = `
          <tr>
            <td>${id}</td> 
            <td>${montext1}</td>
            <td class="deleteDepense1" >${montant1}</td>
            <td><button type="button" class="${deleteLigne1}" id="deleted123">Supprimer</button></td>
        </tr>
        `

        tbodyTr1.insertAdjacentHTML("afterbegin", newRow1);
        const buttonSupprimerLigne1 = tbodyTr1.querySelector(`.${deleteLigne1}`)
        buttonSupprimerLigne1.addEventListener("click", function () {
            let alertConfirmation1 = confirm('vouler vous supprimer')
            const supprimerLigne1 = this.closest('tr')
            if(alertConfirmation1){
                supprimerLigne1.remove(`${id}`)

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
                        ajouterLigneToTable(montext1, montant1, ".deleteLigne");
                        mettreajour(); // Mettre à jour le solde après ajout
                      })
                    
                  
                    .catch(error => {
                      responseMessage.textContent = `Erreur : ${error.message}`;
                    });

                    const MontantToDelete1 = parseFloat(
                        supprimerLigne1.querySelector(".deleteDepense1").textContent
                      ) ;
                      let ToutDesDepenses1 =
                        parseFloat(document.getElementById("monprix1Depenses").textContent) ||
                        0;
                     ;
                     ToutDesDepenses1 -= MontantToDelete1;
                     document.getElementById("monprixRevenus").textContent =
                       ToutDesDepenses1.toFixed(2)
                   
                       location.reload();
                        
                          console.log(ToutDesDepenses1);
                 

                     
                        
                      // Mettre à jour le solde après suppression
                      mettreajour();
            }
        })

    }
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
        
            document.getElementById("monSoldes").textContent = solde.toFixed(2);
          })
          .catch(error => {
            responseMessage.textContent = `Erreur : ${error.message}`;
          });
      
        
      }



const addForm = document.getElementById("addForm");
const monButton = document.getElementById("AddButton");
const maValidate = document.getElementById("validate");
const close = document.querySelector(".close");



maValidate.onclick = function () {
  addForm.style.display = "none";
};
monButton.onclick = function () {
  addForm.style.display = "block";
};
close.onclick = function () {
  addForm.style.display = "none";
};



const addForm1 = document.getElementById("addForm1");
const monButton1 = document.getElementById("AddButton1");
const maValidate1 = document.getElementById("validate1");
const close1 = document.querySelector(".close1");


maValidate1.onclick = function () {
  addForm1.style.display = "none";
};
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
    console.error("Erreur lors du chargement des dépenses", error)
  });



  fetch("http://localhost:3000/revenu")
  .then(response => response.json())
  .then(data => {
    
    const montantTotalRevenu = data.reduce(
        (acc, val) => acc + val.montant,
        0
      );
      totalRevenus.textContent = montantTotalRevenu + " FCFA";
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

