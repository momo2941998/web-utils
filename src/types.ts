export enum UserRole {
  SP_ADMIN    = 'SP_ADMIN',
  ADMIN       = 'ADMIN',
  USER    = 'USER',
}

export interface JwtInfo {
  userDisplayName: string,
  userId: string,
  role: UserRole,
}

export interface RouteConfig {
  path: string,
  roles: UserRole[],
  element: JSX.Element
}

export enum PaymentGWType {
  MOMO= 'momo',
  VNPAY= 'vnpay',
}

export enum OptionType {
  DAY = 'day',
  MONTH = 'month'
}