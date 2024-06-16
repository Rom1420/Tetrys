# Compte rendu de l'évaluation collaborative

<p align="center">
    <img src="https://wallpapercave.com/wp/wp2675347.jpg" width="60%">
</p>

## Table des matières

1. [Personas et scénarios](#i-personas-et-scénarios)
   - [Personas](#personas)
   - [Scénarios](#scénarios)
2. [Présentation de l’évaluation coopérative](#ii-présentation-de-lévaluation-coopérative)
   - [Procédure de tests](#procédure-de-tests)
   - [Résultats de l'évaluation](#résultats-de-lévaluation)
   - [Analyse des résultats obtenus](#analyse-des-résultats-obtenus)
3. [Conclusion](#iii-conclusion)
4. [Annexe](#iv-annexe)

## I) Personas et scénarios

### Personas

- **Deezortho Thomas**:  
  Thomas a 13 ans, il est dysorthographique. Malgré les défis que cela représente dans son quotidien scolaire et social, Thomas est déterminé à surmonter ces difficultés.

- **Dyslexico Lucas**:  
  Lucas a 16 ans, il est un lycéen intelligent et créatif mais il lutte quotidiennement avec sa dyslexie. Il cherche absolument à améliorer son orthographe et sa lecture tout en s’amusant de manière interactive.

- **Ergotherapo Sophie**:  
  Sophie a 32 ans et est ergothérapeute, elle travaille dans une clinique pédiatrique, elle est passionnée par son travail et a choisi de se spécialiser dans les problèmes dys comme la dyslexie et la dysorthographie.

### Scénarios

#### Scénario 1

- **Situation**: L’ergothérapeute crée un compte pour son nouveau jeune, Thomas qui est dysorthographique, puis lance une partie en mode débutant pour présenter l’appli à Thomas.
- **Consignes**:
  - Créer un compte pour le nouvel étudiant
  - Lancer une partie avec ce nouveau compte
  - Jouer la partie
  - Aller voir les statistiques globales de la partie

#### Scénario 2

- **Situation**: Lucas, dyslexique, a une dictée prévue la semaine prochaine. Pour s'entraîner, l’ergothérapeute crée une partie avec une config personnalisée avec des caractéristiques proches du mode intermédiaire mais avec une liste de mots personnalisée en plus.
- **Consignes**:
  - Sélectionner le profil de Lucas
  - Lire les caractéristiques du mode intermédiaire
  - Créer une config perso avec les mêmes caractéristiques que le mode intermédiaire
  - Ajouter une liste de mots
  - Lancer la partie et vérifier la présence des mots ajoutés

#### Scénario 3

- **Situation**: L’ergothérapeute a besoin d’évaluer la progression de Lucas pour valider sa montée au niveau de jeu supérieur. Pour cela, elle peut aller consulter ses statistiques globales, ses stats globales concernant le mode intermédiaire et aussi aller voir les détails de quelques parties en mode intermédiaire. Si les signes sont au vert, la montée est validée, sinon non.
- **Consignes**:
  - Aller dans l’onglet Statistiques
  - Voir les stats globales de Lucas
  - Voir les stats du mode intermédiaire
  - Consulter les statistiques de quelques parties en mode intermédiaire

## II) Présentation de l’évaluation coopérative

### Procédure de tests

- Notre équipe s’est disposée de la manière suivante: Eliot a été le directeur des évaluations guidant les utilisateurs. Romain, Matice et Mathias ont été les observateurs prenant des notes sur les comportements des utilisateurs.
- Avant chaque scénario, le directeur a décrit les différents Personas ainsi que le contexte du scénario à l’utilisateur.

### Résultats de l'évaluation

- **3 sur 3 évaluateurs** appuient sur entrée pour valider un input que ce soit dans le jeu ou bien pour créer un profil par exemple et sont surpris qu’il ne se passe rien (car pas implémenté).
- **2 sur 3 évaluateurs** n’ont pas instinctivement les commandes du jeu Tetris (notamment ceux qui n’ont pas l’habitude de jouer à des jeux vidéo).
- **1 sur 3 évaluateurs** a eu du mal à comprendre l’affichage de la pop-up du détail du mode.
- **2 sur 3 évaluateurs** dans l’onglet stats n’ont pas trouvé du premier coup comment accéder aux détails d’une partie dans l’historique (ces utilisateurs cliquaient au mauvais endroit en cherchant comment l’ouvrir).
- **1 sur 3 évaluateurs** ne comprenait pas les intitulés des inputs pour créer une configuration.
- **1 sur 3 évaluateurs** ne connaissait pas le jeu Tetris.

### Analyse des résultats obtenus

- On pourrait implémenter la touche entrée pour valider les inputs.
- Créer une pop-up “règles du jeu et commandes” afin de permettre à n’importe quel utilisateur (incluant les non habitués de jeux vidéo) de jouer sans aide car les commandes que l’on avait pensées comme intuitives ne l’étaient uniquement pour des personnes ayant déjà joué sur ordinateur.
- Améliorer le front de l’historique des parties pour rendre cliquable l’ensemble de l’intitulé de la partie pour avoir accès aux détails ou alors rendre mieux visible la petite flèche menant aux détails. Également ajouter un moyen de filtrer l’historique en fonction de la difficulté.
- Modifier les intitulés des inputs dans “créer une config” pour éviter les erreurs.

## III) Conclusion

Pour finaliser le site, il reste à :
- Implémenter la partie back-end manquante concernant les statistiques.
- Effectuer les pistes d’amélioration proposées suite aux résultats de l’évaluation coopérative, comme l'implémentation de la touche entrée pour valider les inputs, la création d'une pop-up pour les règles du jeu et les commandes, et l'amélioration de l'interface pour la gestion de l'historique des parties.
- Travailler sur l'expérience utilisateur pour la rendre plus intuitive et accessible, en particulier pour ceux qui ne sont pas habitués aux jeux vidéo.

L'objectif est de créer une application non seulement fonctionnelle mais également agréable à utiliser par les utilisateurs.

## IV) Annexe

### Répartition des tâches dans l’équipe

- **[Romain](https://github.com/Rom1420)**
    <ul>
        <li><strong>Front-end</strong>:
            <ul>
                <li>Développement du jeu Tetrys, du moteur de jeu, des commandes...</li>
                <li>Amélioration du style, des animations, mise en place de la DA du site</li>
                <li>Conception des composants pour les statistiques et les détails des parties</li>
                <li>Implémentation des boutons de difficulté</li>
                <li>Développemet de la page de pre-game</li>
                <li>Développement de la page de statistiques détaillées et globales</li>
            </ul>
        </li>
        <li><strong>Back-end</strong>:
            <ul>
                <li>Filtrage et gestion des mots</li>
                <li>Lien et gestion entre les configurations et les mots</li>
            </ul>
        </li>
    </ul>

- **[Eliot](https://github.com/eliotmnrt)**


 - **[Matice](https://github.com/MaticeMrll)**


 - **[Mathias](https://github.com/MathiasSantosR)**
	 <ul>
	    <li><strong>Front-end</strong>:
		<ul>
		    <li>Gestion des élèves</li>
		    <li>Création de popups</li>
		</ul>
	    </li>
	    <li><strong>Back-end</strong>:
		<ul>
		    <li>Route gameResume (non terminé actuellement)</li>
		</ul>
	    </li>
	</ul>
