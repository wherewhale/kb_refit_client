export enum UserRole {
    USER = "ROLE_USER",
    BUSINESS = "ROLE_BUSINESS",
    ADMIN = "ROLE_ADMIN",
}

export enum ProcessState {
  APPROVED = "accepted",
  REJECTED = "rejected",  // 반려
  DEPOSIT = "deposit",
  INPROGRESS = "inProgress",
}