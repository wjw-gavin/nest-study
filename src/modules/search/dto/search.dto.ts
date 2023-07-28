export class SearchItemOption {
  key: string | number
  value: string
}

export class SearchItemConfigDto {
  id?: string
  name?: string
  type?: string
  hint?: string
  options?: SearchItemOption[]
  children?: SearchItemConfigDto[]
  multi_select?: boolean
}
