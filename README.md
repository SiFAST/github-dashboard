# github-dashboard






Dashboard to supervise Github activity of a set of developpers on a given repository . 

Il s'agit d'une application web permettant de :

  - chercher un utilisateur sur github et accéder à son profil ainsi que ses repos ( également avec des liens externes vers github ). ( usersFinder.html) 
  - afficher les commits et les puls requests d'un repo donné avec un filtrage personnalisé : par date , et par utilisateur .( reposFinder.html)

### Installation et fonctionnement

  Aucune installation n'est exigée , il suffit de télécharger le répertoire et exécuter les pages html.
  L'application ne fonctionne pas correctement en l'absence d'une connexion internet.

### Mise à jour :


*  La modification de la liste des utilisateurs se fait à travers Le tableau users en haut du fichier dash.js
* Le fichier js mainUsers contient le code js nécessaire pour la recherche d'un utilisateur

* Le fichier js main contient le code js nécessaire pour la recherche des commits du répo donné

* Le fichier js mainPulls contient le code js nécessaire pour la recherche des pulls requests du répo donné

* Le fichier js dash contient le code js nécessaire pour le traitement et l'affichage du dashboard

### Fonctionaliés manquantes
Les graphes présentants les pourcentages des commits et des pulls requests de chaque développeur ne s'affichent pas correctement , il paraît qu'il y a un problème avec la bibliothèque choisie ( elle ne supporte pas plusieurs paramètres)

