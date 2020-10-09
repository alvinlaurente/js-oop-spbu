class Station {
  constructor(number, fuelLeft) {
    this.number = number;
    this.fuelLeft = fuelLeft;
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
}

class Employee extends Person {
  constructor(name, job = "employee") {
    super(name, job);
  }
}

class Rider extends Person {
  constructor(
    name,
    job = "customer",
    memberStatus = false,
    totalTransaction = 0,
    maxFuel
  ) {
    super(name, job);
    this.memberStatus = memberStatus;
    this.totalTransaction = totalTransaction;
    this.maxFuel = maxFuel;
  }
}
