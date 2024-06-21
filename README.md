# Projet Tetris pour Jeunes Atteints de Troubles Dys

## Description

Ce projet Tetris est spécialement conçu pour aider les jeunes atteints de troubles dys (dyslexie, dysorthographie, etc.) dans leur apprentissage, tout en fournissant aux ergothérapeutes des outils pour mieux suivre et accompagner ces jeunes. Le jeu combine les éléments traditionnels de Tetris avec des exercices de reconnaissance de mots.

![Tetris](path/to/your/image.png)

---

## Fonctionnalités

### 1. Jeu de Tetris Adapté

- **Trois mots affichés** : Trois mots sont affichés à l'écran. L'utilisateur doit taper l'un des mots pour choisir le bloc Tetris associé.
- **Jeu Tetris** : Une fois le mot choisi, le bloc correspondant est placé sur le plateau de jeu.
- **Zone de texte** : Une zone de texte permet aux utilisateurs de saisir les mots affichés.

![Exemple de jeu](path/to/your/image.png)

### 2. Partie Statistiques

- **Suivi des progrès** : Permet aux ergothérapeutes de suivre les progrès des jeunes en visualisant les statistiques.
- **Détails des sessions** : Visualisation des statistiques globales et des détails pour chaque session de jeu.

![Statistiques](path/to/your/image.png)

### 3. Configurations Personnalisées

- **Configurations du jeu** : Possibilité de créer des configurations personnalisées pour adapter le jeu aux besoins spécifiques des utilisateurs.
- **Mots personnalisés** : Ajout de listes de mots personnalisés pour des dictées ou exercices spécifiques.

![Configurations](path/to/your/image.png)

### 4. Timer Adaptatif

- **Temps proportionnel** : Le timer pour écrire les mots est proportionnel au nombre de caractères du mot le plus long, ce qui ajuste la difficulté en fonction des mots à taper.

---

## Installation

### Prérequis

- [Node.js](https://nodejs.org/) (version X.X.X ou supérieure)
- [Angular CLI](https://angular.io/cli)

### Étapes

1. Clonez le dépôt :
    ```bash
    git clone https://github.com/votre-nom-utilisateur/tetris-dys.git
    ```
2. Accédez au répertoire du projet :
    ```bash
    cd tetris-dys
    ```
3. Installez les dépendances :
    ```bash
    npm install
    ```
4. Lancez l'application :
    ```bash
    ng serve
    ```
5. Ouvrez votre navigateur à `http://localhost:4200`.

---

## Utilisation

### Lancer une Partie

1. **Sélectionnez un mot** : Choisissez un des trois mots affichés en le tapant dans la zone de texte.
2. **Jeu de Tetris** : Le bloc associé au mot choisi apparaîtra sur le plateau de jeu. Jouez à Tetris comme d'habitude pour positionner les blocs.
3. **Statistiques** : À la fin de chaque partie, vous pouvez consulter les statistiques pour voir vos performances.

![Démo du jeu](path/to/your/image.png)

### Configuration du Jeu

1. **Accéder aux configurations** : Allez dans le menu des configurations.
2. **Créer une nouvelle configuration** : Ajoutez une nouvelle configuration en définissant les paramètres souhaités.
3. **Ajouter des mots personnalisés** : Ajoutez des mots personnalisés à utiliser pendant le jeu ou les dictées.

![Configuration](path/to/your/image.png)

### Consulter les Statistiques

1. **Accéder aux statistiques** : Allez dans le menu des statistiques pour voir les résultats globaux et les détails des sessions.
2. **Analyser les progrès** : Utilisez les statistiques pour analyser les progrès des utilisateurs au fil du temps.

![Statistiques](path/to/your/image.png)

---

## Développement

### Structure du Projet

Le projet est structuré de manière modulaire avec des composants Angular, des services pour la logique métier, et un modèle de données pour gérer les configurations et les résultats du jeu.

---
