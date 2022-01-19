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
  tagList: Tag[],
  currentTag?: Tag
}
