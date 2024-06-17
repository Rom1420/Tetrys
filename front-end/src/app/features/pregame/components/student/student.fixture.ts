import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class StudentFixture extends E2EComponentFixture {
    async getNameStudent(index: number) {
        const allTitles = await this.getAllNames();
        if (index >= allTitles.length) {
          throw new Error("Wrong Title Quiz Index");
        }
        return allTitles[index];
    }
    
    async getContentNameStudent(index: number) {
        const name = await this.getNameStudent(index);
        return name.textContent();
    }
    getAllNames(){
        return this.page.$$('student p');
    }
    getDelButton(){
        return this.page.getByTestId('closeButton');
    }
    clickDelButton(){
        return this.getDelButton().click();
    }
    async getIndexOfName(name: string) {
        const names = await this.getAllNames();
        let indexOfCard = -1;
        for (let index = 0; index < names.length; index++) {
          if ((await names[index].textContent()) == name) {
            indexOfCard = index;
          }
        }
        return indexOfCard;
    }

    async selectStudent(studentName: string){
        await this.page.click(`[data-testid="student"]:has-text("${studentName}")`);
    }
}