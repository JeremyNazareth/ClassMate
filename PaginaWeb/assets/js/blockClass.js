//Block class is created
class Block{
    constructor(id, name, description, grades = [], tasks = []){
        this.id = id;
        this.name = name;
        this.description = description;
        this.grades = grades;
        this.tasks = tasks;
    }

    addGrade(gradeName,grade,ponderation) {
        const gradeObject = {
            name: gradeName,
            grade: parseFloat(grade),
            ponderation: parseFloat(ponderation)
        }
        this.grades.push(gradeObject);
    }

    removeGrade(index){
        console.log(index);
        this.grades.splice(index,1);
    }
    
    addTask(nameDate, startDate, endDate) {
        const task = {
            name : nameDate,
            startTask : startDate,
            endTask : endDate
        }
        this.tasks.push(task);
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
        console.log("Tarea eliminada.");
    }

}