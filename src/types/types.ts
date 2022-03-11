export type CellInputType = 'tel' | 'password'

export type Cell = {
  key: number
  value: string
}

export type CellsInputTypes = {
  [cellIdx: number]: CellInputType
}
