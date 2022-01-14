type RecordItem = {
  tage: string[]
  type: string
  note: string
  amount: number
  createdAt?: Date
}
type Tag = {
  id: string
  name: string
}
type RecordListModel = {
  data: Tag[]
  create: (name: string) => 'succeed' | 'duplicated'
  fetch: () => Tag[]
  save: () => void
  update: (id: string, name: string) => 'succeed' | 'duplicated' | 'no found'
  remove: (id: string) => boolean
}

interface Window {
  tagList: Tag[];
  createTag: (name: string) => 'succeed' | 'duplicated';
  removeTag: (id: string) => boolean;
  updateTag: (id: string, name: string) => 'succeed' | 'duplicated' | 'no found';
  findTag: (id:string) => Tag
}