
# Au Tableau - Gestion de soutenances pour Webstart

## Description

**Au Tableau** est une application de gestion des soutenances pour les professeurs de Webstart. L'objectif de l'application est de faciliter l'organisation des soutenances en permettant aux enseignants de gérer les classes et les étudiants, et de sélectionner de façon aléatoire les étudiants qui passeront au tableau pour leur soutenance.

### Fonctionnalités principales

- Gérer des classes : créer, modifier et supprimer des classes.
- Gérer des étudiants dans chaque classe : ajouter, modifier et supprimer des étudiants.
- Organiser des soutenances : appeler un étudiant de manière aléatoire au tableau pour sa soutenance.
- Un étudiant ne peut passer au tableau qu'une seule fois par soutenance.
- Suivi des soutenances : visualiser qui est passé et qui doit encore passer.

### Contraintes

- **Soutenance unique** : Il ne peut y avoir qu'une seule soutenance en cours à la fois.
- **Gestion locale** : Les soutenances sont gérées uniquement côté client via un mécanisme de stockage local (par exemple, `localStorage`).
- **Pas de modifications en temps réel** : Impossible d'ajouter des étudiants à une classe pendant qu'une soutenance est en cours.
- **Unicité des étudiants** : Un étudiant ne peut appartenir qu'à une seule classe et doit être unique dans chaque classe.

## Interface utilisateur

- **Aléatoire** : Un bouton permet de tirer au sort un étudiant pour passer au tableau.
- **Statistiques (BONUS)** : Gestion des statistiques de passage.
- **Suivi des étudiants (BONUS)** : Visualisation des étudiants qui sont déjà passés et de ceux qui doivent encore passer.
- **Gestion manuelle (BONUS)** : Permettre de forcer ou d'annuler le passage d'un étudiant au tableau.

## Technologies utilisées

### Frontend

- **Vanilla JS** : Utilisation de JavaScript pur pour la gestion de l'interface sans librairie ni framework.
- **CSS Framework** : Au choix pour styliser l'interface utilisateur.

### Backend

- **Express.js** : Gestion des routes et de l'API.
- **Base de données** : Utilisation de MongoDB, MySQL, PostgreSQL ou SQLite pour la gestion des classes et des étudiants.

## API Endpoints

### Classes (`/classrooms`)

- **GET /classrooms** : Récupérer la liste des classes (HTTP 200)
- **POST /classrooms** : Créer une nouvelle classe avec un paramètre `name`
  - HTTP 422 : Paramètre `name` manquant
  - HTTP 409 : La classe existe déjà
  - HTTP 201 : Classe créée avec succès
- **DELETE /classrooms/:id** : Supprimer une classe
  - HTTP 404 : Classe non trouvée
  - HTTP 204 : Classe supprimée
- **PUT/PATCH /classrooms/:id** : Modifier une classe avec un paramètre `name`
  - HTTP 404 : Classe non trouvée
  - HTTP 409 : Le nom de classe existe déjà
  - HTTP 422 : Paramètre `name` manquant
  - HTTP 200 : Classe modifiée avec succès

### Étudiants (`/students`)

- **GET /classrooms/:classroom_id/students** : Récupérer la liste des étudiants dans une classe (HTTP 200)
- **POST /classrooms/:classroom_id/students** : Ajouter un étudiant dans une classe avec un paramètre `name`
  - HTTP 404 : Classe non trouvée
  - HTTP 422 : Paramètre `name` manquant
  - HTTP 409 : L'étudiant existe déjà dans la classe
  - HTTP 201 : Étudiant ajouté avec succès
- **DELETE /classrooms/:classroom_id/students/:student_id** : Supprimer un étudiant
  - HTTP 404 : Classe ou étudiant non trouvé
  - HTTP 204 : Étudiant supprimé
- **PUT/PATCH /classrooms/:classroom_id/students/:student_id** : Modifier un étudiant avec un paramètre `name`
  - HTTP 404 : Classe ou étudiant non trouvé
  - HTTP 409 : L'étudiant existe déjà
  - HTTP 422 : Paramètre `name` manquant
  - HTTP 200 : Étudiant modifié avec succès

## Installation

### Prérequis

- Node.js et npm
- Base de données (MongoDB, MySQL, PostgreSQL, SQLite...)

### Étapes

1. Clonez le projet :
   ```bash
   git clone https://github.com/Mohammed-ela/au_tableau.git
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Configurez votre base de données dans le fichier de configuration.
4. Lancez le serveur :
   ```bash
   npm start
   ```

## Auteur

Projet développé par **El amrani Mohammed** dans le cadre des travaux pratiques pour Webstart.
