import { Difficulty } from "src/app/features/pregame/models/difficulty.model";
export const DIFFICULTY_LIST: Difficulty[] = [
    {
        difficultyId: 1,
        name: 'Débutant',
        description: 'Le mode pas trop dur',
        config: {
            name: "débutant",
            time: 1.5,
            length: 6,
            errorAllowed: true,
            userId: 0
        }
    },
    {
        difficultyId: 2,
        name: 'Intermédiaire',
        description: 'Le mode un peu dur',
        config: {
          name: "intermédiaire",
          time: 1,
          length: 10,
          errorAllowed: false,
          userId: 0
        }
    },
    {
        difficultyId: 3,
        name: 'Avancé',
        description: 'Le mode dur',
        config: {
          name: "avancé",
          time: 0.6,
          length: 15,
          errorAllowed: false,
          userId:0
        }
    },
    {
        difficultyId: 4,
        name: 'Personnalisé',
        description: 'Le mode Perso',
        config: {
          name: "perso",
          time: 0,
          length: 100,
          errorAllowed: false,
          userId: 0
        }
    }
]
