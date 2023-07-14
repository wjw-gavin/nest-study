import { allClasses } from '.'

export class itemsUtil {
  private className: string

  constructor(className: string) {
    this.className = className
  }

  instantiateDynamicClass(id: string, userId: number) {
    const DynamicClass = allClasses[this.className]

    if (!DynamicClass) {
      throw new Error(`${this.className} is not a valid search item id.`)
    }

    return new DynamicClass(id, userId)
  }
}
