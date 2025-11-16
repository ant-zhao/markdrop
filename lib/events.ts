import Emittery from 'emittery';

export enum EventType {
  PAN = 'pan',
}

export const events = {
  canvasEmitter: new Emittery<{ [type in EventType]: boolean }>(),
}