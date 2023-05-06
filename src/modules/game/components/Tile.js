import React from 'react';
import css from '../css/tile.module.scss'

export const Tile = ({tileData, calcXPos, calcYPos, calcZPos, gameScale}) => { // unitX, unitY
    const l = calcXPos(tileData.x, tileData.y, false, 0, 0, gameScale);
    const t = calcYPos(tileData.x, tileData.y, false, 0, 0, gameScale);
    const z = calcZPos(tileData.x, tileData.y);
    const getWallType = (dir) => {
        if (!tileData.walls[dir]) return 'none';
        return tileData.walls[dir].objType;
    };
    // const tileType = objTypes.tileTypes[tileData.objType];
    const wallW = getWallType('w');
    const wallN = getWallType('n');
    return (
        <div className={css.tile} style={{
            left: `${l}vw`,
            top: `${t}vw`,
            zIndex: z,
            width: `${40 * gameScale}vw`,
            height: `${20 * gameScale}vw`,
        }}>
            <img src={`/images/tiles/${tileData.objType}.svg`} alt="tile" style={{
                width: `${40 * gameScale}vw`,
                height: `${20 * gameScale}vw`,
                position:'absolute',
                top:0,
                left:0,
            }}/>
            {
                (tileData.objType !== 'none') &&
                <img src={`/images/tiles/border.svg`} alt="tile" style={{
                    width: `${40 * gameScale}vw`,
                    height: `${20 * gameScale}vw`,
                    position:'absolute',
                    top:0,
                    left:0,
                }}/>
            }
            {
                (wallW !== 'none') && <img src={`/images/walls/w-${wallW}.svg`} alt={wallW} className={css.wallNorth} style={{
                    width: `${20 * gameScale}vw`,
                    height: `${25 * gameScale}vw`,
                    top: `${-15 * gameScale}vw`,
                    left: 0,
                }} />
            }
            {
                (wallN !== 'none') && <img src={`/images/walls/n-${wallN}.svg`} alt={wallN} className={css.wallWest} style={{
                    width: `${20 * gameScale}vw`,
                    height: `${25 * gameScale}vw`,
                    top: `${-15 * gameScale}vw`,
                    left: `${20 * gameScale}vw`,
                }} />
            }

        </div>
    )
};

const M_Tile = React.memo(Tile);
export default M_Tile;
