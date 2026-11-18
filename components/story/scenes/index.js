import Surat from './Surat';
import Crossroads from './Crossroads';
import Canteen from './Canteen';
import Grind from './Grind';
import Grid from './Grid';
import Rooftops from './Rooftops';
import Tower from './Tower';

/** Animated scene per chapter. */
export const scenes = { surat: Surat, crossroads: Crossroads, canteen: Canteen, rooftops: Grind, grid: Grid };

/** Still scene per chapter for reduced motion (no 3D, no crossfades). */
export const stillScenes = { surat: Surat, crossroads: Crossroads, canteen: Canteen, rooftops: Rooftops, grid: Tower };
