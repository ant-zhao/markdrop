import PointerEraser from './cursors/PointerEraser';
import PointerLasso from './cursors/PointerLasso';

enum Cursor {
  INHERIT = 'inherit',
  DEFAULT = 'default',
  POINTER = 'pointer',
  CROSSHAIR = 'crosshair',
  ROTATE = 'alias',
  MOVE = 'move',
  COL_RESIZE = 'col-resize',
  ROW_RESIZE = 'row-resize',
  EW_RESIZE = 'ew-resize',
  NS_RESIZE = 'ns-resize',
  NESW_RESIZE = 'nesw-resize',
  NWSE_RESIZE = 'nwse-resize',
  ZOOM_IN = 'zoom-in',
  ZOOM_OUT = 'zoom-out',
  ALL_SCROLL = 'all-scroll',
  GRABBING = 'grabbing',
  // custom
  POINTER_LASSO = 'pointer-lasso',
  POINTER_ERASER = 'pointer-eraser',
}

export function getCursor(cursor: Cursor): string {
  switch (cursor) {
    case Cursor.POINTER_LASSO:
      return `url(${PointerLasso}) 21 19, pointer`;
    case Cursor.POINTER_ERASER:
      return `url(${PointerEraser}) 21 19, pointer`;
    default:
      return cursor;
  }
}

export default Cursor;
