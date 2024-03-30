export interface Difficulty {
  id: number;
  name: string;
  description: string;
  details: {
    timePerCharacter: number,
    maxWordLength: number,
    allowErrors: boolean
  };
}
