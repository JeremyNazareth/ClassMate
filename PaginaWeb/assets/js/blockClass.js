//Block class is created
class Block{
    constructor(id, name, description, grades){
        this.id = id;
        this.name = name;
        this.description = description;
        this.grades = grades;
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

    removeGrade(index){
        console.log(index);
        this.grades.splice(index,1)
        console.log("a");
    }
}