import { Position } from 'geojson'

export interface MapState {
  zoom: number
  center: Position
  rotation: number
  mouseCoordinate: Position
}
