import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class StudentFixture extends E2EComponentFixture {
    async getNameStudent(index: number) {
        const allTitles = await this.getAllNames();
        if (index >= allTitles.length) {
          throw new Error("Wrong Name Index");
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
    getDelButton(index: number){
        return this.page.getByTestId('closeButton').nth(index);
    }
    clickDelButton(index: number){
        return this.getDelButton(index).click();
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
    async selectStudent(name: string){
        /*const selector = `div:has-text("${name}")`;
        const allSelectors = await this.page.$$(selector);
        const indexOfStudent = await this.getIndexOfName(name);

        if(indexOfStudent>=allSelectors.length){
            throw new Error(`Wrong Student Name`);
        }
        await allSelectors[indexOfStudent].click()*/

      const student = this.page.getByText(""+name)
      await student.click()
    }
    /* async selectStudent(studentName: string){
        await this.page.click(`[data-testid="student"]:has-text("${studentName}")`);
    }*/
}
