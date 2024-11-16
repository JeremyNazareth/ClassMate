//Block class is created
class Block{
    constructor(id, name, description){
        this.id = id;
        this.name = name;
        this.description = description;
        this.grades = [];
    }

    addGrade(gradeName,grade,ponderation) {
        console.log('hola')
        const gradeObject = {
            name: gradeName,
            grade: parseFloat(grade),
            ponderation: parseFloat(ponderation)

        }
        this.grades.push(gradeObject);
    }

    removeGrade(){

    }
}