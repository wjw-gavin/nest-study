export class SearchItemOption {
  key: string
  value: string
}

export class SearchItemConfigDto {
  id?: string
  name?: string
  type?: string
  hint?: string
  options?: SearchItemOption[]
  multi_select?: boolean
  children?: SearchItemConfigDto[]
}
