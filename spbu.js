class Station {
  constructor(number, fuelLeft) {
    this.number = number;
    this.fuelLeft = fuelLeft;
  }
}

class EmployeeList {
  constructor(employeeNameList = []) {
    this.employeeNameList = employeeNameList;
  }

  addToNameList(employee) {
    this.employeeNameList.push(`${employee.name}`);
    return `${employee.name} added to Employee List.`;
  }

  removeFromNameList(employee) {
    for(let i = 0; i < this.employeeNameList.length ; i++){
      if(this.employeeNameList[i] === employee.name){
        this.employeeNameList.splice(i, 1);

        return `${employee.name} removed from Employee List.`
      }
    }
  }
}

class Person {
  constructor(name, job) {
    this.name = name;
    this.job = job;
  }
}

class Owner extends Person {
  constructor(name, job = "owner") {
    super(name, job);
  }

  hireEmployee(EL, employee){
    if(employee.workStatus === false){
      console.log(`Hiring ${employee.name}`)
      employee.workStatus = true;
      return EL.addToNameList(employee);
    } else {
      return `${employee.name} already registered as hired employee.`;
    }
  }

  fireEmployee(EL, employee){
    if(employee.workStatus === true){
      console.log(`Firing ${employee.name}`)
      employee.workStatus = false;
      return EL.removeFromNameList(employee);
    } else {
      return `${employee.name} is not registered in employee list.`
    }
  }
}

class Employee extends Person {
  constructor(name, job = "employee", workStatus = false) {
    super(name, job);
    this.workStatus = workStatus;
  }
}

class Rider extends Person {
  constructor(
    name,
    cashOwned,
    maxFuel,
    fuelLeft,
    fuelConsumption,
    job = "customer",
    memberStatus = false,
    totalTransaction = 0
  ) {
    super(name, job);
    this.cashOwned = cashOwned;
    this.memberStatus = memberStatus;
    this.totalTransaction = totalTransaction;
    this.maxFuel = maxFuel; // Litres
    this.fuelLeft = fuelLeft; // Litres
    this.fuelConsumption = fuelConsumption; // Litres/km
  }

  // Ride spend fuel, distance in km
  ride(distance){
    let fuelSpent = this.fuelConsumption * distance
    if(fuelSpent <= this.fuelLeft){
      this.fuelLeft -= fuelSpent;
      return `${this.name} has riding for ${distance} km taking ${fuelSpent} litres.`
    } else {
      return `${this.name} don't have enough fuel to ride ${distance} km`
    }
  }
}

let S1 = new Station(1, 300);
let S2 = new Station(2, 250);

let Taslina = new Owner("Taslina");
let EL = new EmployeeList();
let Akmal = new Employee("Akmal");
let Fauzan = new Employee("Fauzan");
let Tuti = new Employee("Tuti");

let Budi = new Rider("Budi", 7500000, 100, 50, 0.30);
let Anton = new Rider("Anton", 4000000, 80, 20, 0.25);
let Toni = new Rider("Toni", 5000000, 120, 75, 0.40);

console.log(Taslina.hireEmployee(EL, Akmal));
console.log(Taslina.hireEmployee(EL, Tuti));
console.log(Taslina.hireEmployee(EL, Fauzan));
console.log(Taslina.hireEmployee(EL, Fauzan));
console.log(Taslina.fireEmployee(EL, Tuti));
console.log(Budi.ride(100));
console.log(Toni.ride(300));
console.log(Toni.ride(150));
console.log();