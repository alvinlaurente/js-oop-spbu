class Station {
  constructor(number, fuelLeft, employeeAssigned = null) {
    this.number = number;
    this.fuelLeft = parseFloat(fuelLeft);
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
  constructor(name, job = "owner", moneyGained = 0) {
    super(name, job);
    this.moneyGained = parseFloat(moneyGained);
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

  refill(station, customer, ammountMoney) {
    let fuelPrice = 10000; // Per Litre
    let fuelWillBeRefilled = ammountMoney/fuelPrice;
    let maxFuelCanBeRefilled = customer.maxFuel - customer.fuelLeft;
    let discount = 1; // Default = no discount

    

    if(fuelWillBeRefilled <= station.fuelLeft){
      // Isi penuh tangki belum full
      if(fuelWillBeRefilled <= maxFuelCanBeRefilled){
        station.fuelLeft -= fuelWillBeRefilled;
        customer.fuelLeft += fuelWillBeRefilled;

        if(ammountMoney >= 100000 && customer.memberStatus === true){
          discount = 0.9; // 10% off
        } else if(ammountMoney >= 20000 && customer.memberStatus === true){
          discount = 0.975; // 2.5% off
        } else {
          discount = 1; // Default - no discount
        }
        customer.cashOwned -= ammountMoney * discount;
        customer.totalTransaction++;
        if(customer.totalTransaction === 3){
          customer.memberStatus = true;
        }

        return `Station ${station.number} - Employee : ${this.name} : ${customer.name} refilled ${fuelWillBeRefilled} litres and pay Rp${ammountMoney * discount},00.`;
      } // Isi full tank, masih ada uang tersisa
      else {
        station.fuelLeft -= maxFuelCanBeRefilled;
        customer.fuelLeft += maxFuelCanBeRefilled;
        let pay = maxFuelCanBeRefilled * fuelPrice;

        if(pay >= 100000 && customer.memberStatus === true){
          discount = 0.9; // 10% off
        } else if(pay >= 20000 && customer.memberStatus === true){
          discount = 0.975; // 2.5% off
        } else {
          discount = 1; // Default - no discount
        }
        customer.cashOwned -= pay * discount;
        customer.totalTransaction++;
        if(customer.totalTransaction === 3){
          customer.memberStatus = true;
        }

        return `Station ${station.number} - Employee : ${this.name} : ${customer.name} refilled ${fuelWillBeRefilled} litres and pay Rp${pay * discount},00.`;
      }
    } else {
      return `Station ${station.number} doesn't have any enough fuel left.`
    }
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
    this.cashOwned = parseFloat(cashOwned);
    this.memberStatus = memberStatus;
    this.totalTransaction = totalTransaction;
    this.maxFuel = parseFloat(maxFuel); // Litres
    this.fuelLeft = parseFloat(fuelLeft); // Litres
    this.fuelConsumption = parseFloat(fuelConsumption); // Litres/km
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
          return `${employee.name} is not assigned to Station ${station.number}.`;
        }
      } else {
        return `Station ${station.number} doesn't have any employee assigned.`;
      }
    } else {
      return `${this.name} doesn't have enough money.`;
    }
  }
}

let S1 = new Station(1, 2);
let S2 = new Station(2, 100);

let Taslina = new Owner("Taslina");
let EL = new EmployeeList();
let Akmal = new Employee("Akmal");
let Fauzan = new Employee("Fauzan");
let Tuti = new Employee("Tuti");
let Dodi = new Employee("Dodi");

let Budi = new Rider("Budi", 1000000, 50, 50, 0.15);
let Anton = new Rider("Anton", 500000, 30, 20, 0.10);
let Toni = new Rider("Toni", 100000, 40, 35, 0.125);

// Hire, fire and check Employee List
console.log(Taslina.hireEmployee(EL, Akmal)); // Hiring Akmal
// Akmal added to Employee List.
console.log(Taslina.hireEmployee(EL, Tuti)); // Hiring Tuti
// Tuti added to Employee List.
console.log(Taslina.hireEmployee(EL, Fauzan)); // Hiring Fauzan
// Fauzan added to Employee List.
console.log(Taslina.hireEmployee(EL, Fauzan)); // Fauzan already registered as hired employee.
console.log(Taslina.fireEmployee(EL, Tuti)); // Firing Tuti
// Tuti removed from Employee List.
console.log(Taslina.fireEmployee(EL, Tuti)); // Tuti is not registered in employee list.
console.log(Taslina.hireEmployee(EL, Tuti)); // Hiring Tuti
// Tuti added to Employee List.

// Assign hired employee and unassign hired employee
console.log(Akmal.assignToStation(S1)); // Akmal is assigned to Station 1.
console.log(Akmal.assignToStation(S1)); // Station 1 already has assigned employee.
console.log(Dodi.assignToStation(S2)); // Dodi is not a hired employee.
console.log(Fauzan.assignToStation(S2)); // Fauzan is assigned to Station 2.
console.log(Akmal.unassignFromStation(S2)); // Wrong unassign condition. Akmal is not assigned to Station 2.
console.log(Fauzan.unassignFromStation(S2)); // Fauzan is unassigned from Station 2.
console.log(Tuti.assignToStation(S2)); // Tuti is assigned to Station 2.

// Ride and spend fuel
console.log(Budi.ride(100)); // Budi has riding for 100 km taking 15 litres.
console.log(Toni.ride(300)); // Toni doesn't have enough fuel to ride 300 km
console.log(Toni.ride(150)); // Toni has riding for 150 km taking 18.75 litres.

// Refill Fuel Process
console.log(Budi.refillFuel(S1, Fauzan, 5000000)); // Budi doesn't have enough money.
console.log(Budi.refillFuel(S1, Fauzan, 50000)); // Fauzan is not assigned to Station 1.
console.log(Budi.refillFuel(S2, Fauzan, 50000)); // Fauzan is not assigned to Station 2.
console.log(Budi.refillFuel(S1, Akmal, 50000)); // Budi will refill fuel in Station 1.
// Station 1 doesn't have any enough fuel left.
console.log(Budi.refillFuel(S2, Tuti, 50000)); // Budi will refill fuel in Station 2.
// Station 2 - Employee : Tuti : Budi refilled 5 litres and pay Rp50000,00.

console.log(Budi.ride(200)); // Budi has riding for 200 km taking 30 litres.
console.log(Budi.refillFuel(S2, Tuti, 50000)); // Station 2 - Employee : Tuti : Budi refilled 5 litres and pay Rp50000,00.
console.log(Budi.ride(200)); // Budi has riding for 200 km taking 30 litres.
console.log(Budi.refillFuel(S2, Tuti, 200000)); // Station 2 - Employee : Tuti : Budi refilled 5 litres and pay Rp50000,00.

// Member status true - next transaction will get discount
console.log(Budi); 

console.log(Budi.ride(200)); // Budi has riding for 200 km taking 30 litres.

// Check discount
console.log(Budi.refillFuel(S2, Tuti, 200000)); // Station 2 - Employee : Tuti : Budi refilled 20 litres and pay Rp180000,00. (10% off)

console.log(Budi.refillFuel(S2, Tuti, 50000)); // Station 2 - Employee : Tuti : Budi refilled 5 litres and pay Rp48750,00. (2.5% off)
console.log(Budi.refillFuel(S2, Tuti, 10000)); // Station 2 - Employee : Tuti : Budi refilled 1 litres and pay Rp10000,00. (No discount)