import React from 'react';
import css from '../css/editor.module.scss';

const Tile = ({ x, y, area, mapObjTypes, setWallType, setTileType, editorMode, placeItem }) => { // gridMaxX, gridMaxY
    const l = (x * 50);
    const t = (y * 50);
    const handleTileClick = () => {
        if (editorMode === 0){
            setTileType(x, y);
        } else {
            placeItem(x,y);
        }
    };
    const handleWallClickN = () => {
        setWallType(x, y, 'n');
    };
    const handleWallClickW = () => {
        setWallType(x, y, 'w');
    };
    const getWallColor = (dir) => {
        if (area.walls[dir] && area.walls[dir].objType){
            return mapObjTypes.wallTypes[area.walls[dir].objType].editorColor;
        }
        return 'transparent';
    };
    return (
        <div className={css.editorTile}
             style={{
                 left: l,
                 top: t,
             }}
        >
            <div onClick={handleTileClick} className={`${css.tileMain} ${editorMode !== 1 && css.active}`}>
                {
                    (area.objType !== 'none') &&
                    <img src={`/images/tiles/editor/${area.objType}.svg`} alt={area.objType} style={{ width: 50, height: 50 }} />
                }
            </div>

            <div onClick={handleWallClickN} className={css.btnWallNorth} style={{backgroundColor: getWallColor('n')}}>
                {
                    (area.walls.n.objType.substring(0,4) === 'door') && <div className={`${css.door} ${(area.walls.n.objType.substring(5)=== 'open') && css.open} `} />
                }
            </div>
            <div onClick={handleWallClickW} className={css.btnWallWest} style={{backgroundColor: getWallColor('w')}}>
                {
                    (area.walls.w.objType.substring(0,4) === 'door') && <div className={`${css.door} ${(area.walls.w.objType.substring(5) === 'open') && css.open} `} />
                }
            </div>
        </div>
    )
};

export default Tile;
