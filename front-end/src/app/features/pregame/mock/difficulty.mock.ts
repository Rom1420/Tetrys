import { Difficulty } from "src/app/features/pregame/models/difficulty.model";
export const DIFFICULTY_LIST: Difficulty[] = [
    {
        id: 1,
        name: 'Débutant',
        description: 'Le mode pas trop dur',
        details: {
            timePerCharacter: 10,
            maxWordLength: 8,
            allowErrors: true
        }
    },
    {
        id: 2,
        name: 'Intermédiaire',
        description: 'Le mode un peu dur',
        details: {
            timePerCharacter: 10,
            maxWordLength: 8,
            allowErrors: true
        }
    },
    {
        id: 3,
        name: 'Avancé',
        description: 'Le mode dur',
        details: {
            timePerCharacter: 10,
            maxWordLength: 8,
            allowErrors: true
        }
    },
    {
        id: 4,
        name: 'Personnalisé',
        description: 'Le mode Perso',
        details: {
            timePerCharacter: 10,
            maxWordLength: 8,
            allowErrors: true
        }
    }
]