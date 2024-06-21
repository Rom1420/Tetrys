# Stratégie de Test

## Table des Matières

1. [Introduction](#introduction)
2. [Critères de Priorisation des Tests](#criteres-de-priorisation-des-tests)
3. [Scénarios de Test](#scenarios-de-test)
   - [Scénario 1](#scenario-1)
   - [Scénario 2](#scenario-2)
   - [Scénario 3](#scenario-3)
4. [Justifications et Explications](#justifications-et-explications)
   - [Justification des Tests](#justification-des-tests)
   - [Explication des Tests](#explication-des-tests)
5. [Annexes](#annexes)

---

## Introduction

Ce document présente la stratégie de test pour l'application de gestion de jeux éducatifs pour des utilisateurs ayant des troubles d'apprentissage. Les tests visent à vérifier le bon fonctionnement des fonctionnalités clés en fonction des scénarios définis.

## Critères de Priorisation des Tests

Nous avons défini les critères suivants pour prioriser nos tests :

1. **Jouer au jeu** : Fonctionnalité critique pour l'expérience utilisateur.
2. **Sélectionner/créer une difficulté, prédéfinie ou personnalisée, pour jouer** : Important pour adapter l'expérience de jeu.
3. **Pouvoir sélectionner un (nouvel) utilisateur (créer/supprimer)** : Nécessaire pour la gestion des utilisateurs.
4. **Accéder aux statistiques** : Secondaire pour le suivi de la progression des utilisateurs.

---

## Scénarios de Test

### Scénario 1

- **Situation** : L’ergothérapeute crée un compte pour son nouveau jeune, Thomas qui est dysorthographique, puis lance une partie en mode débutant pour présenter l’appli à Thomas.
- **Consignes** :
  1. Créer un compte pour le nouvel étudiant.
  2. Lancer une partie avec ce nouveau compte.
  3. Jouer la partie.
  4. Aller voir les statistiques globales de la partie.

### Scénario 2

- **Situation** : Lucas, dyslexique, a une dictée prévue la semaine prochaine. Pour s'entraîner, l’ergothérapeute crée une partie avec une config personnalisée avec des caractéristiques proches du mode intermédiaire mais avec une liste de mots personnalisée en plus.
- **Consignes** :
  1. Créer/sélectionner le profil de Lucas.
  2. Lire les caractéristiques du mode intermédiaire.
  3. Créer une config perso avec les mêmes caractéristiques que le mode intermédiaire.
  4. Ajouter une liste de mots.
  5. Lancer la partie et vérifier la présence des mots ajoutés.

### Scénario 3

- **Situation** : L’ergothérapeute a besoin d’évaluer la progression de Lucas pour valider sa montée au niveau de jeu supérieur. Pour cela, elle peut aller consulter ses statistiques globales, ses stats globales concernant le mode intermédiaire et aussi aller voir les détails de quelques parties en mode intermédiaire. Si les signes sont au vert, la montée est validée, sinon non.
- **Consignes** :
  1. Aller dans l’onglet Statistiques.
  2. Voir les stats globales de Lucas.
  3. Voir les stats du mode intermédiaire.
  4. Consulter les statistiques de quelques parties en mode intermédiaire.

---

## Justifications et Explications

### Justification des Tests

1. **Jouer au jeu**
   - **Critique** : Assure le fonctionnement de la fonctionnalité principale. Un jeu non fonctionnel compromet toute l'application.
   - **Scénario 1** : Test de base de l'interaction utilisateur avec le jeu.
   - **Scénario 2** : Vérification de la configuration personnalisée.

2. **Sélectionner/créer une difficulté**
   - **Important** : La personnalisation des niveaux de difficulté est essentielle pour adapter le jeu aux besoins spécifiques de chaque utilisateur.
   - **Scénario 1** : Vérification de la sélection d'un niveau standard.
   - **Scénario 2** : Création et utilisation d'une configuration personnalisée.

3. **Gestion des utilisateurs**
   - **Nécessaire** : La capacité de gérer des utilisateurs est fondamentale pour la personnalisation de l'expérience de chaque utilisateur.
   - **Scénario 1** : Création d'un compte pour un nouvel utilisateur.
   - **Scénario 2** : Sélection et gestion d'un profil existant.

4. **Accéder aux statistiques**
   - **Secondaire** : Bien que moins critique, l'accès aux statistiques est important pour évaluer la progression et adapter les stratégies éducatives.
   - **Scénario 3** : Vérification de la fonctionnalité de statistiques pour un utilisateur existant.

### Explication des Tests

1. **Scénario 1**
   - **Objectif** : Valider le processus complet de création de compte et d'interaction initiale avec le jeu.
   - **Étapes** : De la création du compte à la visualisation des premières statistiques.
   - **Attendu** : Confirmation que les fonctionnalités de base sont opérationnelles.

2. **Scénario 2**
   - **Objectif** : Tester la personnalisation des paramètres de jeu pour s'assurer de leur flexibilité.
   - **Étapes** : Création d'une configuration personnalisée en ajoutant une liste de mots spécifique.
   - **Attendu** : Vérification que les configurations personnalisées sont respectées dans le jeu.

3. **Scénario 3**
   - **Objectif** : Évaluer la précision et l'utilité des statistiques pour suivre la progression de l'utilisateur.
   - **Étapes** : Consultation des statistiques globales et spécifiques.
   - **Attendu** : Assurance que les données de progression sont correctement collectées et affichées.

---

## Annexes

- [Vidéo](#)
- [ReadMe](#)

