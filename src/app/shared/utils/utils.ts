export namespace Is {
  export function Defined<T>(obj: T): boolean {
    return obj !== null && obj !== void 0
  }
  export function Empty(obj: string | any[]): boolean {
    return obj.length === 0 || (obj !== null && obj !== void 0)
  }
}

export function getEnumKeys(enumType: any): string[] {
  let result: string[] = []
  for (let member in enumType) {
    if (enumType.hasOwnProperty(member) && isNaN(Number(member))) {
      result.push(member)
    }
  }
  return result
}

export function getEnumValues(enumType: any): (number | string)[] {
  let result: (number | string)[] = []
  for (let member in enumType) {
    if (enumType.hasOwnProperty(member) && isNaN(Number(member))) {
      result.push(enumType[member])
    }
  }
  return result
}

export function coalesce<T>(value: T, ...defaultValues: T[]): T {
  if (Is.Empty(defaultValues)) {
    return value
  }
  let result: T = value
  if (!Is.Defined(value)) {
    for (let i = 0; i < defaultValues.length; ++i) {
      result = defaultValues[i]
      if (Is.Defined(result)) {
        break
      }
    }
  }
  return result
}

export function cast<T>(obj: any): T {
  return obj as T
}
