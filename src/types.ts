export enum Role {
  Worker = "worker",
  Supervisor = "supervisor",
}

export enum Presence {
  CHECKED_IN = "CHECKED_IN",
  CHECKED_OUT = "CHECKED_OUT",
}

export interface IWorker {
  id: string;
  firstName: string;
  lastName: string;
  siteId: string;
}
