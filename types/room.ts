export interface SceneObject {
  id: string
  type: string
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  color: string
}

export interface Room {
  id: string
  name: string
  description: string
  objects: SceneObject[]
  createdAt: string
  creatorAddress: string
  nftTokenId?: string
}
