<!-- Titre principal -->
<div class="d-flex flex-column align-center mt-16">
  <p class="primary font-weight-bold text-h4">VVA</p>
  <div class="mt-7">
    <img src="/assets/vva_photo_accueil.PNG" alt="PointNews Web site" width="600" />
  </div>
</div>

<hr class='my-2'>

<!-- Sommaire -->
<div class="d-flex flex-column align-center mt-3">
  <p class="text-h6 primary font-weight-bold">Sommaire</p>
  <ul class="mt-3 primary">
    <li class="mb-3"><a href="#Contexte" style="color: blue;">Présentation du Projet</a></li>
    <li class="mb-3"><a href="#Outils" style="color: blue;">Outils utilisées</a></li>
    <li class="mb-3"><a href="#Fonctionnalités" style="color: blue;">Fonctionnalitées</a></li>
      <li class="mb-3"><a href="#MCD" style="color: blue;">Modèle Conceptuel de Données (MCD)</a></li>
      <li class="mb-3"><a href="#GitHub" style="color: blue;">GitHub</a></li>
  </ul>
</div>

<hr class='my-2'>

<!-- Contexte -->
<div class="d-flex flex-column align-center mt-3">
  <p class="text-h6 primary font-weight-bold">Présentation du Projet</p>
  <p class="my-6 primary text-body-1 text-center mx-10">
    Ce projet a été réalisé dans le cadre de mon <strong>BTS SIO (Services Informatiques aux Organisations)</strong> dans le cadre de l’épreuve <strong>E4 – PPE (Projet Personnel Encadré)</strong>.
    <br><br>
    L’objectif était de développer une application de gestion de réservations pour l’association <strong>VVA – Village Vacances Alpes</strong>, un réseau de villages de vacances engagés dans une démarche de tourisme durable et solidaire. 
    <br><br>
    Le projet consistait à concevoir une application nommée <strong>RESA</strong>, permettant de :
    <ul class="primary text-left mx-10">
      <li>📆 Consulter et réserver un hébergement selon des critères précis</li>
      <li>🔒 Gérer les accès selon les rôles : vacancier, gestionnaire, administrateur</li>
      <li>📊 Suivre les étapes d’une réservation (acompte, solde, remise de clés…)</li>
      <li>🗂️ Centraliser les données des hébergements et des utilisateurs</li>
    </ul>
    <br>
    Ce développement a été réalisé en respectant un cahier des charges précis, fourni par l’équipe pédagogique et basé sur les besoins concrets de l’association.
    <br><br>
    Le site pilote pour le déploiement de l’application a été le village vacances de Pelvoux. Une fois validée, l'application devait être étendue aux autres villages de l'association.
  </p>
</div>
<hr class='my-2'>
<!-- Outils utilisées -->
<div class="d-flex flex-column align-center mt-3" id="Outils">
  <p class="mb-6 text-h6 primary font-weight-bold">Outils utilisées</p>
</div>
<div class="row mx-6 my-3 primary">
  <div class="col4">
    <p>Développement Front-end :</p>
    <div class="flexChip my-3">
      <div class="chip mb-2 text-black">C#</div>
    </div>
  </div>
  <div class="col4">
    <p>Développement Back-end :</p>
    <div class="d-flex my-3">
      <div class="chip text-black">MySQL</div>
    </div>
  </div>
  <div class="col4">
    <p>Design :</p>
    <div class="d-flex my-3">
      <div class="chip text-black">Figma</div>
    </div>
  </div>
  <div class="col4">
    <p>Hébergement :</p>
    <div class="d-flex my-3">
      <div class="chip text-black">Front-end : Vercel</div>
      <div class="chip text-black">Back-end : Railway</div>
      <div class="chip text-black">Base de données : Supabase</div>
    </div>
  </div>
  <div class="col4">
    <p>Outils de Développement :</p>
    <div class="d-flex my-3">
      <div class="chip text-black">PHP My Admin</div>
      <div class="chip text-black">Visual Studio Code</div>
      <div class="chip text-black">Win Design</div>
    </div>
  </div>
</div>

<hr class='my-2'>

<!-- Fonctionnalités -->
<div class="d-flex flex-column align-center mt-3" id="Fonctionnalités">
  <p class="text-h6 primary font-weight-bold">Fonctionnalités</p>
  <ul class="mt-3 primary text-left mx-10">
    <li>
      🔐<strong>🏠 Accueil :</strong> première interface de l’application. L’utilisateur peut choisir de se connecter ou de consulter les hébergements en accès libre.
      <div class="d-flex justify-center mt-4 mb-4">
        <img src="/assets/vva_photo_accueil.PNG" alt="Page d'accueil VVA" width="500" />
      </div>
      Sur cette page, l’utilisateur a deux possibilités :
      <ul class="mt-2">
        <li>Cliquer sur "Connexion" pour se connecter et ainsi pouvoir réserver un hébergement</li>
        <li>Cliquer sur "Consulter hébergement" afin de rechercher un hébergement</li>
      </ul>
    </li>
    <li>🏠 Consultation des hébergements selon des critères (type, capacité, localisation...)</li>
    <li>📝 Réservation d’un hébergement avec suivi des étapes (arrhes, solde, remise des clés...)</li>
    <li>📋 Liste des réservations par semaine</li>
    <hr class="my-4" />
    <li>
      🔐<strong>Connexion :</strong> l’utilisateur saisit ses informations de connexion (login, mot de passe).
      <div class="d-flex justify-center mt-4 mb-4">
        <img src="/assets/vva_connexion.PNG" alt="Page d'accueil VVA" width="500" />
      </div>
      <br><br>
      L’application vérifie tout d’abord si les données transmises par l’utilisateur correspondent à un compte enregistré dans la base de données. Ensuite, elle récupère le type d’utilisateur associé à ce compte.
      <br><br>
      Si les informations sont valides, l’utilisateur est redirigé vers la page d’accueil où il pourra accéder à différentes fonctionnalités, selon son rôle :
      <ul class="mt-2">
        <li><strong>Utilisateur connecté :</strong></li>
        <ul>
          <li>– Consulter Hébergement</li>
          <li>– Réserver Hébergement</li>
        </ul>
        <li><strong>Gestionnaire :</strong></li>
        <ul>
          <li>– Consulter Hébergement</li>
          <li>– Réserver Hébergement</li>
          <li>– Consulter la liste des réservations d’une semaine</li>
          <li>– Ajouter un Hébergement</li>
        </ul>
        <li><strong>Administrateur :</strong></li>
        <ul>
          <li>– Consulter Hébergement</li>
          <li>– Réserver Hébergement</li>
          <li>– Consulter la liste des réservations d’une semaine</li>
          <li>– Consulter la liste des utilisateurs</li>
          <li>– Ajouter un Hébergement</li>
        </ul>
      </ul>
    </li>
    <hr class="my-4" />
    <li>
      🔍<strong>Consulter Hébergement :</strong>
      <div class="d-flex justify-center mt-4 mb-4">
        <img src="/assets/vva_hebergement.PNG" alt="Page d'accueil VVA" width="900" />
      </div>
      <br><br>
      Sur cette page, l’utilisateur a la possibilité de rechercher des hébergements selon différents critères de choix.
      <br><br>
      L’application adapte la recherche aux critères saisis par l’utilisateur. En cliquant sur "Recherche", l’application affichera dans la <code>listBox</code> les différents hébergements correspondants.
      <br><br>
      L’utilisateur peut alors cliquer sur “Infos” pour en savoir plus sur l’hébergement sélectionné.
      <br><br>
      Ensuite, il a la possibilité de réserver l’hébergement choisi.
      <br><br>
      Pour effectuer une réservation, l’utilisateur doit sélectionner la date souhaitée. L’application recherche les dates les plus proches de la date de départ demandée, puis vérifie si l’hébergement est disponible.
      <br><br>
      L’utilisateur peut réserver plusieurs semaines consécutives. Pour valider la réservation, il doit cliquer sur le bouton “Valider”.
    </li>
    <hr class="my-4" />
    <li>
      🏗️<strong>Création d’hébergement :</strong>
            <div class="d-flex justify-center mt-4 mb-4">
        <img src="/assets/vva_creation_hebergement.PNG" alt="Page d'accueil VVA" width="900" />
      </div>
      <br><br>
      <em>Conditions d’accès :</em>
      <ul>
        <li>Être connecté</li>
        <li>Être gestionnaire ou administrateur</li>
      </ul>
      <br>
      L’utilisateur saisit les informations de l'hébergement afin de créer un nouvel hébergement, puis clique sur <strong>Valider</strong> pour enregistrer cet hébergement.
    </li>
      <hr class="my-4" />
    <li>
      🧾<strong>Voir Hébergement :</strong>
      <div class="d-flex justify-center mt-4 mb-4">
        <img src="/assets/vva_voir_hebergement.PNG" alt="Voir Hébergement VVA" width="900" />
      </div>
      <br><br>
      <em>Conditions d’accès :</em>
      <ul>
        <li>Être connecté</li>
        <li>Être gestionnaire ou administrateur</li>
      </ul>
      <br>
      Cette page permet de rechercher un hébergement existant afin de consulter et modifier ses informations.
      <br><br>
      Après avoir sélectionné un hébergement dans la liste, l’utilisateur peut cliquer sur le bouton <strong>"Modifier"</strong>.
      <br><br>
      L’application va alors charger les données actuelles de l’hébergement sélectionné dans un formulaire.
      <br><br>
      L’utilisateur peut modifier les informations souhaitées (nom, capacité, localisation, type, etc.).
      <br><br>
      Une fois les modifications effectuées, il peut cliquer sur le bouton <strong>"Valider"</strong> pour enregistrer les changements dans la base de données.
    </li>
<hr class="my-4" />
<li>
  👥<strong>Voir Liste Utilisateur :</strong>
  <div class="d-flex justify-center mt-4 mb-4">
    <img src="/assets/vva_voir_liste_user.PNG" alt="Voir Utilisateurs VVA" width="900" />
  </div>
  <br><br>
  <em>Conditions d’accès :</em>
  <ul>
    <li>Être connecté</li>
    <li>Être administrateur</li>
  </ul>
  <br>
  Cette page permet de consulter la liste complète des utilisateurs enregistrés dans la base de données.
  <br><br>
  Pour chaque utilisateur, les informations affichées sont :
  <ul class="mt-2">
    <li>👤 Nom et prénom</li>
    <li>📧 Adresse e-mail</li>
    <li>🆔 Identifiant</li>
    <li>🔐 Rôle (vacancier, gestionnaire, administrateur)</li>
  </ul>
  <br>
  Cette page permet à l’administrateur de contrôler les accès et de vérifier les comptes utilisateurs enregistrés dans le système.
</li>

</div>
<hr class="my-4" />

<!-- MCD -->
<div class="d-flex flex-column align-center mt-3" id="MCD">
  <p class="text-h6 primary font-weight-bold">Modèle Conceptuel de Données (MCD)</p>
  <p class="my-6 primary text-body-1 text-center mx-10">
    Ci-dessous se trouve le modèle conceptuel de données (MCD) utilisé pour la conception de l'application RESA. 
  </p>
  <div class="d-flex justify-center mt-4 mb-4">
    <img src="/assets/vva_mcd.PNG" alt="Modèle Conceptuel de Données VVA" width="600" />
  </div>
</div>

<hr class='my-2'>

<!-- Lien GitHub -->
<div class="d-flex flex-column align-center mt-3" id="GitHub">
  <p class="text-h6 primary font-weight-bold">Lien GitHub</p>
  <p class="my-6 primary text-body-1 text-center">
    Le code source du projet RESA est disponible ici :  
    <br><br>
    <a href="https://github.com/Geniez91/RESA" target="_blank" style="color: blue; font-weight: bold;">
      🔗 https://github.com/Geniez91/RESA
    </a>
  </p>
</div>