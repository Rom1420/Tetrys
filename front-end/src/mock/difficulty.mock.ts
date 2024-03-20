import { Difficulty } from "src/models/difficulty.model";

export const DIFFICULTY_LIST: Difficulty[] = [
    {
        id: 1,
        name: 'Débutant',
        description: 'Le mode pas trop dur',
        color: "Vert",
    },
    {
        id: 2,
        name: 'Intermédiaire',
        description: 'Le mode un peu dur',
        color: "Vert",
    },
    {
        id: 3,
        name: 'Avancé',
        description: 'Le mode dur',
        color: "Rouge",
    }
]