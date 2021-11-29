import { GeometryTypeNames } from '../enums'

export type GeometryType = GeometryTypeNames.POINT
  | GeometryTypeNames.POLYGON
  | GeometryTypeNames.MULTI_POINT
  | GeometryTypeNames.LINE_STRING
  | GeometryTypeNames.MULTI_LINE_STRING
  | GeometryTypeNames.MULTI_POLYGON
  | GeometryTypeNames.CIRCLE
  | GeometryTypeNames.SQUARE
  | GeometryTypeNames.BOX

export type DrawOptions = {
  isActive: boolean
  type?: GeometryTypeNames
  multiple?: boolean
}
