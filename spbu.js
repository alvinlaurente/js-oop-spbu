class Station {
  constructor(number, fuelLeft, employeeAssigned = null) {
    this.number = number;
    this.fuelLeft = fuelLeft;
    this.employeeAssigned = employeeAssigned;
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
    for (let i = 0; i < this.employeeNameList.length; i++) {
      if (this.employeeNameList[i] === employee.name) {
        this.employeeNameList.splice(i, 1);

        return `${employee.name} removed from Employee List.`;
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

  hireEmployee(EL, employee) {
    if (employee.workStatus === false) {
      console.log(`Hiring ${employee.name}`);
      employee.workStatus = true;
      return EL.addToNameList(employee);
    } else {
      return `${employee.name} already registered as hired employee.`;
    }
  }

  fireEmployee(EL, employee) {
    if (employee.workStatus === true) {
      console.log(`Firing ${employee.name}`);
      employee.workStatus = false;
      return EL.removeFromNameList(employee);
    } else {
      return `${employee.name} is not registered in employee list.`;
    }
  }
}

class Employee extends Person {
  constructor(
    name,
    job = "employee",
    workStatus = false,
    assignStatus = false
  ) {
    super(name, job);
    this.workStatus = workStatus;
    this.assignStatus = assignStatus;
  }

  assignToStation(station) {
    if (this.workStatus === true) {
      if (station.employeeAssigned === null) {
        if (this.assignStatus === false) {
          station.employeeAssigned = this.name;
          this.assignStatus = true;
          return `${this.name} is assigned to Station ${station.number}.`;
        } else {
          return `${this.name} has already assigned to any station.`;
        }
      } else {
        return `Station ${station.number} already has assigned employee.`;
      }
    } else {
      return `${this.name} is not a hired employee.`;
    }
  }

  unassignFromStation(station) {
    if (this.assignStatus === true) {
      if (station.employeeAssigned === this.name) {
        station.employeeAssigned = null;
        this.assignStatus = false;
        return `${this.name} is unassigned from Station ${station.number}.`;
      } else {
        return `Wrong unassign condition. ${this.name} is not assigned to Station ${station.number}.`;
      }
    } else {
      return `${this.name} is not assigned to any station.`;
    }
  }

  refill(station, customer, ammountMoney) {}
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
  ride(distance) {
    let fuelSpent = this.fuelConsumption * distance;
    if (fuelSpent <= this.fuelLeft) {
      this.fuelLeft -= fuelSpent;
      return `${this.name} has riding for ${distance} km taking ${fuelSpent} litres.`;
    } else {
      return `${this.name} doesn't have enough fuel to ride ${distance} km`;
    }
  }

  refillFuel(station, employee, ammountMoney) {
    if (ammountMoney <= this.cashOwned) {
      if (station.employeeAssigned !== null) {
        if (station.employeeAssigned === employee.name) {
          console.log(
            `${this.name} will refill fuel in Station ${station.number}.`
          );
          return employee.refill(station, this, ammountMoney);
        } else {
          return `${employee.name} is not assigned to Station ${station.number}`;
        }
      } else {
        return `Station ${station.number} doesn't have any employee assigned.`;
      }
    } else {
      return `${this.name} doesn't have enough money`;
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

let Budi = new Rider("Budi", 1000000, 100, 50, 0.3);
let Anton = new Rider("Anton", 500000, 80, 20, 0.25);
let Toni = new Rider("Toni", 100000, 120, 75, 0.4);

// Hire, fire and check Employee List
console.log(Taslina.hireEmployee(EL, Akmal));
console.log(Taslina.hireEmployee(EL, Tuti));
console.log(Taslina.hireEmployee(EL, Fauzan));
console.log(Taslina.hireEmployee(EL, Fauzan));
console.log(Taslina.fireEmployee(EL, Tuti));
console.log(Taslina.fireEmployee(EL, Tuti));

// Assign hired employee and unassign hired employee
console.log(Akmal.assignToStation(S1));
console.log(Akmal.assignToStation(S1));
console.log(Tuti.assignToStation(S2));
console.log(Fauzan.assignToStation(S2));
console.log(Akmal.unassignFromStation(S2));
console.log(Fauzan.unassignFromStation(S2));

// Ride and spend fuel
console.log(Budi.ride(100));
console.log(Toni.ride(300));
console.log(Toni.ride(150));

// Refill Fuel Process
console.log(Budi.refillFuel(S1, Fauzan, 5000000));
console.log(Budi.refillFuel(S1, Fauzan, 50000));
console.log(Budi.refillFuel(S2, Fauzan, 50000));
console.log(Budi.refillFuel(S1, Akmal, 50000));
