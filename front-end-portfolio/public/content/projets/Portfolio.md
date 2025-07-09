<!-- Titre principal -->
<div class="d-flex flex-column align-center mt-16">
  <p class="primary font-weight-bold text-h4">Portfolio</p>
  <div class="mt-7">
    <img src="/assets/portfolio.png" alt="Portfolio Web site" width="1000" />
  </div>
</div>

<hr class='my-2'>

<!-- Sommaire -->
<div class="d-flex flex-column align-center mt-3">
  <div class="mt-2">
    <p class="text-h6 primary font-weight-bold">Sommaire</p>
  </div>
  <ul class="mt-3 primary">
    <li class="mb-3"><a href="#Contexte" style="color: blue;">Contexte</a></li>
    <li class="mb-3"><a href="#Outils" style="color: blue;">Outils utilisées</a></li>
    <li class="mb-3"><a href="#Fonctionnalités" style="color: blue;">Fonctionnalités</a></li>
    <li class="mb-3"><a href="#EspaceAdmin" style="color: blue;">Espace Admin</a></li>
    <li class="mb-3"><a href="#GitHubActions" style="color: blue;">GitHub Actions</a></li>
    <li class="mb-3"><a href="#Backend" style="color: blue;">Back End</a></li>
    <li class="mb-3"><a href="#GitHub" style="color: blue;">GitHub</a></li>

  </ul>
</div>

<hr class='my-2'>

<!-- Contexte -->
<div class="d-flex flex-column align-center mt-3" id="Contexte">
  <p class="text-h6 primary font-weight-bold">Présentation du Projet</p>
  <div class="mt-6">
    <img src="/assets/impactenvironnemental.jpg" alt="Illustration Impact Environnemental" class="bigImgDetail" />
  </div>
  <p class="my-6 primary text-body-1 text-center">
    Ce site a été conçu pour me présenter en tant que développeur web, mettre en avant mes compétences techniques et mon parcours professionnel.
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
      <div class="chip mb-2 text-black">VueJS</div>
      <div class="chip mb-2 text-black">TypeScript</div>
      <div class="chip mb-2 text-black">JavaScript</div>
      <div class="chip mb-2 text-black">CSS</div>
      <div class="chip mb-2 text-black">HTML</div>
      <div class="chip mb-2 text-black">Vitest</div>
      <div class="chip mb-2 text-black">EmailJs</div>
    </div>
  </div>
  <div class="col4">
    <p>Développement Back-end :</p>
    <div class="d-flex my-3">
      <div class="chip text-black">PostgreSQL</div>
      <div class="chip text-black">NestJs</div>
      <div class="chip text-black">Supabase</div>
      <div class="chip text-black">Prisma</div>
      <div class="chip text-black">Swagger</div>
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
      <div class="chip text-black">Docker</div>
      <div class="chip text-black">PgAdmin</div>
      <div class="chip text-black">Visual Studio Code</div>
    </div>
  </div>
</div>

<hr class='my-2'>

<!-- Fonctionnalités -->
<div class="d-flex flex-column align-center mt-3" id="Fonctionnalités">
  <p class="text-h6 primary font-weight-bold">Fonctionnalités</p>

  <!-- Présentation du profil -->
  <div class="mt-6 d-flex flex-column align-center">
    <p class="font-weight-bold">- Présentation de mon profil</p>
    <img src="/assets/portfolio_1.png" alt="Page de présentation du portfolio" width="1000" />
    <p class="mt-2 text-center">
      Présentation de mon profil, de mon expérience professionnelle, de mes diplômes et des liens vers LinkedIn et GitHub.
    </p>
  </div>

  <!-- Compétences -->
  <div class="mt-6 d-flex flex-column align-center">
    <p class="font-weight-bold">- Mes Compétences</p>
    <img src="/assets/portfolio_2.png" alt="Page des compétences" width="1000" />
    <p class="mt-2 text-center">
      Compétences techniques et soft skills acquises pendant ma formation et mes expériences, regroupées par catégories (développement web, base de données, soft skills, langues).<br>
      Indication des années d'expérience, dernières utilisations des technologies, niveaux de langue (avec score TOEIC pour l'anglais), et description des soft skills.
    </p>
  </div>

  <!-- Formations -->
  <div class="mt-6 d-flex flex-column align-center">
    <p class="font-weight-bold">- Mes Formations</p>
    <img src="/assets/portfolio_4.png" alt="Page des formations" width="1000" />
    <p class="mt-2 text-center">
      Mes formations académiques présentées de manière chronologique.
    </p>
  </div>

  <!-- Expériences -->
  <div class="mt-6 d-flex flex-column align-center">
    <p class="font-weight-bold">- Mes Expériences Professionnelles</p>
    <img src="/assets/portfolio_3.png" alt="Liste des expériences" width="1000" />
    <p class="mt-2 text-center">
      Liste de mes expériences professionnelles avec description des tâches, stack technique, dates, et bouton pour afficher les détails.
    </p>
    <img src="/assets/table_workexperience.PNG" alt="Table workExperience" width="500" class="mt-4" />
    <p class="text-center">
      Les données sont stockées dans la table <strong>workExperience</strong> de Supabase. Les images sont hébergées dans le storage Supabase.
    </p>
    <img src="/assets/detail_workexperience.PNG" alt="Détail de l'expérience" width="1000" class="mt-4" />
    <p class="text-center">
      Exemple d’affichage détaillé d’une expérience.
    </p>
  </div>

  <!-- Projets -->
  <div class="mt-6 d-flex flex-column align-center" id="Projet">
    <p class="font-weight-bold">- Mes Projets</p>
    <img src="/assets/projects_page.PNG" alt="Page des projets" width="1000" />
    <p class="mt-2 text-center">
      Page présentant mes projets personnels ou réalisés dans un cadre professionnel.<br>
      Une barre de recherche permet de filtrer les projets par mots-clés, et des tags techniques (ex : VueJS, NestJS, PostgreSQL…) facilitent la sélection dynamique des projets en fonction des technologies utilisées.
    </p>
    <p class="mt-2 text-center">
      Les projets sont affichés sous forme de cartes, classés par année, avec le <strong>nom</strong>, une <strong>description courte</strong> et la <strong>stack technique</strong> principale.
    </p>
    <img src="/assets/project_table.PNG" alt="Table projects" width="500" class="mt-4" />
    <p class="text-center">
      Les données sont extraites depuis une table <strong>projects</strong> dans Supabase.
    </p>
    <img src="/assets/detail_project.PNG" alt="Détail du projet" width="1000" class="mt-4" />
    <p class="text-center">
      Chaque projet possède une fiche détaillée, accessible via un bouton, sur le même principe que les expériences professionnelles. Elle inclut les objectifs, le contexte, les technologies utilisées, les difficultés rencontrées et les solutions apportées.
    </p>
  </div>
</div>
  <div class="mt-6 d-flex flex-column align-center" id="Projet">
    <p class="font-weight-bold">- Consulter mon CV en PDF</p>
</div>
<!-- Formulaire de contact -->
<div class="mt-6 d-flex flex-column align-center">
  <p class="font-weight-bold">- Formulaire de Contact</p>
  <img src="/assets/contact_formulaire.PNG" alt="Formulaire de contact" width="500" />
  <p class="mt-2 text-center">
    Un formulaire de contact permet aux visiteurs de m’envoyer un message directement depuis le site.<br>
    Les informations saisies sont transmises via <strong>EmailJS</strong> et me parviennent directement par e-mail.
  </p>
</div>

<!-- Thème Clair / Sombre -->
<div class="mt-6 d-flex flex-column align-center">
  <p class="font-weight-bold">- Thème Clair / Sombre</p>
  <p class="mt-2 text-center">
    Le site propose deux thèmes d'affichage : un thème <strong>clair</strong> et un thème <strong>sombre</strong>, pour améliorer le confort visuel selon les préférences de l'utilisateur.<br>
    Un bouton situé dans la <strong>navbar</strong> permet de basculer dynamiquement d'un thème à l'autre.
  </p>
</div>
<!-- Connexion / Déconnexion (Authentification) -->
<div class="mt-6 d-flex flex-column align-center">
  <p class="font-weight-bold">- Connexion / Déconnexion</p>
  <img src="/assets/login.PNG" alt="Page de connexion" width="500" />
  <p class="mt-2 text-center">
    Le site propose un système de <strong>connexion sécurisée</strong> pour accéder à une interface d'administration réservée.<br>
    L’authentification est gérée via <strong>Supabase</strong>, avec gestion des <strong>tokens JWT</strong> permettant de valider la session utilisateur côté front-end.<br>
    Une fois connecté, l’utilisateur peut accéder à des fonctionnalités avancées (ajout, modification, suppression de contenus) détaillées dans la section suivante.<br>
    Un bouton dans la navbar permet également de <strong>se déconnecter</strong> proprement.
  </p>
</div>

<hr class='my-2'>

<!-- Espace Administrateur -->
<div class="mt-6 d-flex flex-column align-center" id="EspaceAdmin">
  <p class="font-weight-bold">- Espace Administrateur</p>

  <p class="mt-2 text-center">
    L’interface d’administration est directement intégrée au site, sans interface dédiée : lorsqu’un utilisateur est <strong>authentifié via Supabase</strong>, de nouvelles options apparaissent dans l’interface existante.
    Cela permet d’ajouter, modifier ou supprimer dynamiquement les contenus affichés sur le site.
  </p>

  <!-- Compétences -->
  <p class="mt-4 font-weight-bold text-decoration-underline">🛠️ Gestion des Compétences</p>
  <p class="mt-2 text-center">
    Une fois connecté, l’administrateur peut gérer toutes les compétences depuis la section correspondante. Les compétences sont de trois types : <strong>Informatique</strong>, <strong>Langues</strong> et <strong>Soft Skills</strong>, avec des champs spécifiques selon le type :
    <ul class="text-left mx-10">
      <li>Informatique : nom, années d'expérience, dernières utilisations, image/logo</li>
      <li>Langues : niveau, certification TOEIC/CECRL</li>
      <li>Soft Skills : description textuelle</li>
    </ul>

L’administrateur peut :
<ul class="text-left mx-10">
<img src="/assets/add_skills.PNG" alt="Liste des expériences" width="1000" />
<li><strong>Ajouter</strong> une nouvelle compétence via un formulaire dédié</li>
<img src="/assets/update_skills.PNG" alt="Liste des expériences" width="500" />
<li><strong>Modifier</strong> une compétence existante (le formulaire est pré-rempli)</li>
<li><strong>Supprimer</strong> définitivement une compétence</li>
</ul>
Les actions déclenchent des requêtes sécurisées vers l’API <strong>NestJS</strong>, avec vérification du token d’authentification JWT.
Les données sont immédiatement reflétées sur l’interface grâce à la mise à jour en temps réel du <strong>store Pinia</strong>.

  </p>

  <!-- Expériences Professionnelles -->
  <p class="mt-4 font-weight-bold text-decoration-underline">🏢 Gestion des Expériences Professionnelles</p>
     <img src="/assets/add_experience.PNG" alt="Liste des expériences" width="1000" />
  <p class="mt-2 text-center">
    L’interface permet à l’administrateur de <strong>créer, modifier ou supprimer</strong> des expériences professionnelles :
    <ul class="text-left mx-10">
      <li>Chaque expérience inclut : entreprise, poste, dates, stack technique utilisée</li>
      <li>Un éditeur de texte enrichi permet de rédiger un <strong>détail complet</strong> de l'expérience</li>
      <li>Possibilité d’<strong>ajouter des images</strong> illustratives via le storage Supabase</li>
    </ul>
    <img src="/assets/update_experience.PNG" alt="Liste des expériences" width="1000" />
    Un bouton "Modifier" permet d'afficher un formulaire contenant les données existantes. Toute modification déclenche une requête PUT/PATCH vers l’API, validée uniquement si l’utilisateur est authentifié.
    Le store Pinia est utilisé pour rafraîchir instantanément l’affichage après chaque opération.
  </p>

  <!-- Projets -->
  <p class="mt-4 font-weight-bold text-decoration-underline">📁 Gestion des Projets</p>
  <p class="mt-2 text-center">
    Le module projet fonctionne sur le même principe que les expériences :
    <ul class="text-left mx-10">
    <img src="/assets/add_project.PNG" alt="Liste des expériences" width="1000" />
      <li>Ajout d’un projet avec : nom, année, description courte, stack technique</li>
      <li>Ajout d’un <strong>détail de projet</strong> rédigé via un éditeur enrichi (objectifs, difficultés, solutions)</li>
      <li>Possibilité d’<strong>uploader une ou plusieurs images</strong> dans Supabase Storage pour illustrer le projet</li>
          <img src="/assets/update_project.PNG" alt="Liste des expériences" width="1000" />
      <li><strong>CRUD complet</strong> accessible uniquement après connexion</li>
    </ul>
    La validation du formulaire envoie les données à l’API NestJS, avec vérification du token JWT.
    Le store Pinia assure une mise à jour instantanée sans rechargement de la page.
  </p>
</div>
<hr class='my-2'>
<!-- CI/CD -->
<div class="d-flex flex-column align-center mt-6" id="GitHubActions">
  <p class="text-h6 primary font-weight-bold">CI/CD - GitHub Actions</p>
  <p class="mt-4 text-center">
    Le projet utilise un pipeline CI/CD automatisé avec <strong>GitHub Actions</strong>. À chaque <strong>push ou pull request</strong> sur la branche <code>main</code> :
    <ul class="text-left mx-10">
      <li>Installation des dépendances pour le front et le back (monorepo)</li>
      <li>Build des deux applications</li>
      <li>Lancement des tests (front-end avec <code>Vitest</code>)</li>
      <li>Nettoyage du cache npm pour le back-end</li>
      <li>Création automatique d’un <strong>tag horodaté</strong> si tout s’est bien déroulé</li>
    </ul>
  </p>
  <p class="mt-2 text-center">
    Cela garantit une validation automatique du code et une meilleure stabilité du projet.
  </p>
</div>

<hr class='my-2'>

<!-- Back-end -->
<div class="d-flex flex-column align-center mt-6" id="Backend">
  <p class="text-h6 primary font-weight-bold">Back-end</p>
  <p class="mt-4 text-center">
    L’API back-end est développée avec <strong>NestJS</strong> et expose diverses fonctionnalités nécessaires à la gestion des données du portfolio.<br>
    La documentation complète de l’API est disponible via <a href="https://portfoliovue-back-end-production.up.railway.app/api" target="_blank" style="color: blue; text-decoration: underline;">Swagger UI</a>.
  </p>
</div>

<hr class='my-2'>

<!-- GitHub -->
<div class="d-flex flex-column align-center mt-3" id="GitHub">
  <p class="text-h6 primary font-weight-bold">GitHub</p>
  <div class="mt-6">
    <a href="https://github.com/Geniez91/portfoliovue">Lien vers mon GitHub</a>
  </div>
</div>
