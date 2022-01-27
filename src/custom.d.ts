type RecordItem = {
  tage: string[]
  type: string
  note: string
  amount: number
  createdAt?: string
}
type Tag = {
  id: string
  name: string
}

type RootStore = {
  recordList: RecordItem[],
  tagsError: 'empty' | 'duplicated' | 'succeed' | 'overlong'|null,
  tagList: Tag[],
  currentTag?: Tag
}
