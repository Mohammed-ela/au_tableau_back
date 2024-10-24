
# Projet API "Au Tableau"

Cette API permet de gérer des classes et des étudiants. Elle est sécurisée par un paramètre `key` que vous devez passer dans l'URL pour accéder aux ressources.

## Installation

1. **Cloner le projet** :
   ```bash
   git clone https://github.com/votre-repo.git
   cd votre-projet
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Créer un fichier `.env`** avec les variables suivantes :
   ```bash
   MONGODB_USER=votre_utilisateur
   MONGODB_PASSWORD=votre_mot_de_passe
   MONGODB_CLUSTER=votre_cluster
   MONGODB_DATABASE=votre_base_de_donnees
   PORT=5000
   API_KEY=your_api_key
   ```

4. **Démarrer l'application** :
   ```bash
   npm start
   ```

## Utilisation

Toutes les requêtes à l'API doivent inclure un paramètre `key` avec une valeur correspondant à la clé API définie dans le fichier `.env`.

### Exemple de clé API dans l'URL

```http
http://localhost:5000/classrooms?key=your_api_key
```

### Routes disponibles

#### Classes

- **GET /classrooms**
  - Description : Récupère la liste de toutes les classes.
  - Exemple :
    ```http
    GET http://localhost:5000/classrooms?key=your_api_key
    ```

- **POST /classrooms**
  - Description : Crée une nouvelle classe.
  - Corps attendu (JSON) :
    ```json
    {
      "name": "Nom de la classe"
    }
    ```
  - Exemple :
    ```http
    POST http://localhost:5000/classrooms?key=your_api_key
    ```
  
- **PUT /classrooms/:id**
  - Description : Modifie une classe existante.
  - Exemple :
    ```http
    PUT http://localhost:5000/classrooms/671a0d6b5cc8885cfd586a9b?key=your_api_key
    ```
  - Corps attendu (JSON) :
    ```json
    {
      "name": "Nouveau nom de la classe"
    }
    ```

- **DELETE /classrooms/:id**
  - Description : Supprime une classe existante.
  - Exemple :
    ```http
    DELETE http://localhost:5000/classrooms/671a0d6b5cc8885cfd586a9b?key=your_api_key
    ```

#### Étudiants

- **GET /classrooms/:classroom_id/students**
  - Description : Récupère la liste des étudiants d'une classe.
  - Exemple :
    ```http
    GET http://localhost:5000/classrooms/671a0d6b5cc8885cfd586a9b/students?key=your_api_key
    ```

- **POST /classrooms/:classroom_id/students**
  - Description : Ajoute un nouvel étudiant à une classe.
  - Corps attendu (JSON) :
    ```json
    {
      "name": "Nom de l'étudiant"
    }
    ```
  - Exemple :
    ```http
    POST http://localhost:5000/classrooms/671a0d6b5cc8885cfd586a9b/students?key=your_api_key
    ```

- **PUT /classrooms/:classroom_id/students/:student_id**
  - Description : Modifie un étudiant existant dans une classe.
  - Exemple :
    ```http
    PUT http://localhost:5000/classrooms/671a0d6b5cc8885cfd586a9b/students/7c4f0982bb02c8d3dc3d56a2?key=your_api_key
    ```
  - Corps attendu (JSON) :
    ```json
    {
      "name": "Nouveau nom de l'étudiant"
    }
    ```

- **DELETE /classrooms/:classroom_id/students/:student_id**
  - Description : Supprime un étudiant existant d'une classe.
  - Exemple :
    ```http
    DELETE http://localhost:5000/classrooms/671a0d6b5cc8885cfd586a9b/students/7c4f0982bb02c8d3dc3d56a2?key=your_api_key
    ```
