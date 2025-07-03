<!-- Titre principal -->
<div class="d-flex flex-column align-center mt-16">
  <p class="primary font-weight-bold text-h4">DoctoLib</p>
  <div class="mt-7">
    <img src="/assets/doctolib.png" alt="Portfolio Web site" width="200" />
  </div>
</div>

<hr class='my-2'>

<!-- Sommaire -->
<div class="d-flex flex-column align-center mt-3">
  <p class="text-h6 primary font-weight-bold">Sommaire</p>
  <ul class="mt-3 primary">
    <li class="mb-3"><a href="#Contexte" style="color: blue;">Contexte</a></li>
    <li class="mb-3"><a href="#Fonctionnalites" style="color: blue;">Fonctionnalités</a></li>
    <li class="mb-3"><a href="#InputsOutputs" style="color: blue;">@Input / @Output</a></li>
    <li class="mb-3"><a href="#Validators" style="color: blue;">Validators personnalisés</a></li>
    <li class="mb-3"><a href="#Pipes" style="color: blue;">Pipes personnalisés</a></li>
    <li class="mb-3"><a href="#Directives" style="color: blue;">Directive personnalisée</a></li>
    <li class="mb-3"><a href="#Outils" style="color: blue;">Outils utilisés</a></li>
    <li class="mb-3"><a href="#GitHub" style="color: blue;">Lien GitHub</a></li>
  </ul>
</div>

<hr class='my-2'>

<!-- Contexte -->
<div class="d-flex flex-column align-center mt-3" id="Contexte">
  <p class="text-h6 primary font-weight-bold">Présentation du Projet</p>
  <p class="my-6 primary text-body-1 text-center">
    DoctoLib est une application Angular qui permet aux utilisateurs de planifier, gérer et annuler des rendez-vous médicaux.
    Elle s’inspire du fonctionnement de la célèbre plateforme <strong>Doctolib</strong>, tout en mettant en œuvre des concepts avancés d’Angular tels que les directives personnalisées, les pipes, les validators et l’utilisation des entrées/sorties de composants.
  </p>
</div>

<hr class='my-2'>

<!-- Fonctionnalités -->
<div class="d-flex flex-column align-center mt-3" id="Fonctionnalites">
  <p class="text-h6 primary font-weight-bold">Fonctionnalités</p>
  <ul class="mt-3 primary text-left mx-10">
    <li><strong>Connexion :</strong> Authentification sécurisée de l’utilisateur</li>
    <li><strong>Inscription :</strong> Création de compte avec formulaire de validation</li>
    <li><strong>Affichage des rendez-vous disponibles :</strong> Liste des créneaux proposés</li>
    <li><strong>Prise de rendez-vous :</strong> Sélection et réservation d’un créneau</li>
    <li><strong>Annulation de rendez-vous :</strong> Option accessible depuis le profil</li>
    <li><strong>Affichage des médecins :</strong> Fiche détaillée avec informations du praticien</li>
    <li><strong>Page de profil utilisateur :</strong> Visualisation et édition des informations personnelles</li>
  </ul>
</div>

<hr class='my-2'>

<!-- Input / Output -->
<div class="d-flex flex-column align-center mt-3" id="InputsOutputs">
  <p class="text-h6 primary font-weight-bold">@Input / @Output</p>
  <p class="my-6 primary text-body-1 text-center">
    Les composants liés aux rendez-vous utilisent les décorateurs <code>@Input</code> et <code>@Output</code> pour communiquer entre parent et enfant.<br>
    Exemple : le composant détaillé d’un rendez-vous reçoit les données via <code>@Input()</code> et émet des événements (comme une annulation) via <code>@Output()</code>.
  </p>
</div>

<hr class='my-2'>

<!-- Validators personnalisés -->
<div class="d-flex flex-column align-center mt-3" id="Validators">
  <p class="text-h6 primary font-weight-bold">Validators personnalisés</p>
  <p class="my-6 primary text-body-1 text-center">
    Plusieurs <strong>validators personnalisés</strong> ont été développés pour renforcer la sécurité et la validation des formulaires :
  </p>
  <ul class="primary text-left mx-10">
    <li>✅ Vérification de l’absence de caractères spéciaux</li>
    <li>✅ Validation du format d’adresse e-mail</li>
    <li>✅ Vérification de la correspondance du mot de passe avec la confirmation</li>
    <li>✅ Vérification que le champ ne contient que des chiffres</li>
  </ul>
</div>

<hr class='my-2'>

<!-- Pipes personnalisés -->
<div class="d-flex flex-column align-center mt-3" id="Pipes">
  <p class="text-h6 primary font-weight-bold">Pipes personnalisés</p>
  <p class="my-6 primary text-body-1 text-center">
    Le projet inclut plusieurs <strong>pipes Angular personnalisés</strong> :
  </p>
  <ul class="primary text-left mx-10">
    <li>📅 Format de date en <strong>français</strong> (jour/mois/année)</li>
    <li>👨‍⚕️ Affichage conditionnel de la <strong>conventionnalité d’un médecin</strong></li>
  </ul>
</div>

<hr class='my-2'>

<!-- Directive personnalisée -->
<div class="d-flex flex-column align-center mt-3" id="Directives">
  <p class="text-h6 primary font-weight-bold">Directive personnalisée</p>
  <p class="my-6 primary text-body-1 text-center">
    Une directive personnalisée met en valeur visuellement les rendez-vous selon leur date :
  </p>
  <ul class="primary text-left mx-10">
    <li><span style="color: orange;">🟠 Orange :</span> pour les <strong>rendez-vous du jour</strong></li>
    <li><span style="color: goldenrod;">🟡 Jaune :</span> pour les <strong>rendez-vous de la semaine</strong></li>
  </ul>
  <p class="mt-4 text-center">
    Cette directive est appliquée dynamiquement aux éléments en fonction de la date du rendez-vous.
  </p>
</div>

<hr class='my-2'>

<!-- Outils utilisés -->
<div class="d-flex flex-column align-center mt-3" id="Outils">
  <p class="text-h6 primary font-weight-bold">Outils utilisés</p>
  <p class="my-6 primary text-body-1 text-center">
    Ce projet a été développé avec les technologies suivantes :
  </p>
  <ul class="primary text-left mx-10">
    <li>🧩 <strong>HTML</strong> — Structure des composants</li>
    <li>🎨 <strong>CSS</strong> — Mise en forme et styles</li>
    <li>⚙️ <strong>Angular</strong> — Framework principal (CLI, modules, routing...)</li>
    <li>📘 <strong>TypeScript</strong> — Logique métier et typage fort</li>
  </ul>
</div>

<hr class='my-2'>

<!-- Lien GitHub -->
<div class="d-flex flex-column align-center mt-3" id="GitHub">
  <p class="text-h6 primary font-weight-bold">Lien GitHub</p>
  <p class="my-6 primary text-body-1 text-center">
    Le code source complet de ce projet est disponible sur GitHub :
    <br><br>
    <a href="https://github.com/rayan917/doctolib-angular" target="_blank" style="color: blue; font-weight: bold;">
      🔗 https://github.com/rayan917/doctolib-angular
    </a>
  </p>
</div>
