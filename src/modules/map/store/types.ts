import { Position } from 'geojson'
import { DrawOptions } from '../types'

export interface MapState {
  zoom: number
  center: Position
  rotation: number
  mouseCoordinate: Position
  drawOptions: DrawOptions
}
