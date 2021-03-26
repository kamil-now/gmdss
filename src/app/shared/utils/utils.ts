export function cast<T>(obj: any): T {
  return obj as T;
}

export function isDefined<T>(obj: T): boolean {
  return obj !== null && obj !== void 0;
}
