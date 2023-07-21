import searchItemsClasses from '.'

export class ItemsUtil {
  private className: string

  constructor(className: string) {
    this.className = className
  }

  instantiateDynamicClass(id: string, userId: number) {
    const DynamicClass = searchItemsClasses[this.className]

    if (!DynamicClass) {
      throw new Error(`${this.className} is not a valid search item id.`)
    }

    return new DynamicClass(id, userId)
  }
}
