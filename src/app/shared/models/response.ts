export type Response<T = any> = {
  success: boolean;
  msg: string;
  data?: T;
}
