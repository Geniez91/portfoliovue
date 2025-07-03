<!-- Titre principal -->
<div class="d-flex flex-column align-center mt-16">
  <p class="primary font-weight-bold text-h4">go-url-shorter</p>
</div>

<hr class='my-2'>

<!-- Sommaire -->
<div class="d-flex flex-column align-center mt-3">
  <p class="text-h6 primary font-weight-bold">Sommaire</p>
  <ul class="mt-3 primary">
    <li class="mb-3"><a href="#Contexte" style="color: blue;">Présentation du Projet</a></li>
    <li class="mb-3"><a href="#Outils" style="color: blue;">Outils et Technologies</a></li>
    <li class="mb-3"><a href="#Fonctionnalites" style="color: blue;">Fonctionnalités</a></li>
    <li class="mb-3"><a href="#LienGitHub" style="color: blue;">Lien GitHub</a></li>
  </ul>
</div>

<hr class='my-2'>

<!-- Contexte -->
<div class="d-flex flex-column align-center mt-3" id="Contexte">
  <p class="text-h6 primary font-weight-bold">Présentation du Projet</p>
  <p class="my-6 primary text-body-1 text-center mx-10">
    <strong>go-url-shorter</strong> est un projet éducatif visant à implémenter un service de raccourcissement d'URL en utilisant le langage Go. Ce projet permet de comprendre les bases du développement backend avec Go, la gestion des routes HTTP, et l'intégration d'une base de données NoSQL avec Redis.
  </p>
</div>

<hr class='my-2'>

<!-- Outils et Technologies -->
<div class="d-flex flex-column align-center mt-3" id="Outils">
  <p class="text-h6 primary font-weight-bold">Outils et Technologies</p>
  <div class="row mx-6 my-3 primary">
    <div class="col4">
      <p>Développement :</p>
      <div class="flexChip my-3">
        <div class="chip mb-2 text-black">Go</div>
        <div class="chip mb-2 text-black">Gin</div>
      </div>
    </div>
    <div class="col4">
      <p>Base de données :</p>
      <div class="flexChip my-3">
        <div class="chip mb-2 text-black">Redis</div>
      </div>
    </div>
    <div class="col4">
      <p>Outils de développement :</p>
      <div class="d-flex my-3">
        <div class="chip text-black">Visual Studio Code</div>
        <div class="chip text-black">GitHub</div>
      </div>
    </div>
  </div>
</div>

<hr class='my-2'>

<!-- Fonctionnalités -->
<div class="d-flex flex-column align-center mt-3" id="Fonctionnalites">
  <p class="text-h6 primary font-weight-bold">Fonctionnalités</p>
  <ul class="mt-3 primary text-left mx-10">
    <li>🔗 <strong>Raccourcissement d'URL</strong>
      <ul class="mt-2">
        <li>Accepte une URL longue en entrée et génère une URL courte unique.</li>
      </ul>
    </li>
    <li>🗄️ <strong>Base de données Redis</strong>
      <ul class="mt-2">
        <li>Stocke les URL longues et courtes dans une base de données Redis pour une récupération rapide.</li>
      </ul>
    </li>
    <li>🔁 <strong>Redirection</strong>
      <ul class="mt-2">
        <li>Redirige les utilisateurs vers l'URL longue lorsqu'ils visitent l'URL courte.</li>
      </ul>
    </li>
    <li>📊 <strong>Statistiques</strong>
      <ul class="mt-2">
        <li>Affiche des statistiques basiques comme le nombre de liens raccourcis et les clics sur chaque lien.</li>
      </ul>
    </li>
  </ul>
</div>

<hr class='my-2'>

<!-- Lien GitHub -->
<div class="d-flex flex-column align-center mt-3" id="LienGitHub">
  <p class="text-h6 primary font-weight-bold">Lien GitHub</p>
  <p class="my-6 primary text-body-1 text-center">
    Le code source du projet go-url-shorter est disponible ici :
    <br><br>
    <a href="https://github.com/rayan917/go-url-shorter" target="_blank" style="color: blue; font-weight: bold;">
      🔗 https://github.com/rayan917/go-url-shorter
    </a>
  </p>
</div>
