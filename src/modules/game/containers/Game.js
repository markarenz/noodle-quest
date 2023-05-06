import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {
    Tile,
    Player,
    HudControls,
    Item,
    ScoreDisp,
    Inventory,
    Dialogue,
    Quit,
    Blink,
    GameOver,
    GameOverConfetti,
    Sign,
    TeleporterDialog,
} from '../components';
import mapObjTypes from '../../../data/mapObjTypes';
import itemData from '../../../data/itemData';
import areaData from '../../../data/areaData';

import 'react-toastify/dist/ReactToastify.css';
import css from '../css/game.module.scss';

const Game = ({ setUiMode }) => {
    const [areaState, setAreaState] = React.useState(areaData);
    const [itemsState, setItemsState] = React.useState(itemData);
    // const invCheat = [
    //     {id: 5555, objType: 'key1', x: 1, y: 1},
    //     {id: 5556, objType: 'fishing-pole', x: 1, y: 1},
    //     {id: 5558, objType: 'teleporter', x: 1, y:1}
    // ];
    const [inventory, setInventory] = React.useState([]);
    const gridMaxX = 16;
    const maxNoodles = 10;
    const [numNoodles, setNumNoodles] = React.useState(0);
    const [playerAnim, setPlayerAnim] = React.useState(true);
    const [blinkNum, setBlinkNum] = React.useState(1);
    const [blink1, setBlink1] = React.useState({ x: 0, y: 0, hash: '' });
    const [blink2, setBlink2] = React.useState({ x: 0, y: 0, hash: '' });
    const [blink3, setBlink3] = React.useState({ x: 0, y: 0, hash: '' });
    const [inTransition, setInTransition] = React.useState('');
    const [dialogueOpenNpc, setDialogueOpenNpc] = React.useState('');
    const [dialogueOpenSign, setDialogueOpenSign] = React.useState('');
    const [teleporterOpen, setTeleporterOpen] = React.useState(false);
    const [score, setScore] = React.useState(0);
    const startingPos = {x: 7, y: 6, z: 0, f: 'e', s: 0};
    const [playerPos, setPlayerPos] = React.useState(startingPos);
    const initTeleportSpots = [
        {
            label: 'Start',
            x: startingPos.x,
            y: startingPos.y,
            z: startingPos.z,
            f: 'e',
            s: 0,
        },
        // {x: 3, y: 8, z: 2, label: 'Bluebell Island', f: 'e', s: 0}

    ];
    const [teleportSpots, setTeleportSpots] = React.useState(initTeleportSpots);
    const objTypes = mapObjTypes.mapObjTypes;
    const gameScale = (window.innerWidth > 960) ? .5 : 1;

    const resetGame = () => {
        setAreaState(areaData);
        setItemsState(itemData);
        setNumNoodles(0);
        setPlayerAnim(true);
        setInTransition('');
        setDialogueOpenNpc('');
        setScore(0);
        setPlayerPos(startingPos);
        setInventory([]);
        setTeleportSpots(initTeleportSpots);
    };
    const checkMovement = (spot, dir) => {
        if (!spot.walls[dir]){
            return true;
        }
        const wallType = spot.walls[dir].objType;
        return objTypes.wallTypes[wallType].passable;
    };
    const calcXPos = (x, y, centered, centerW, centerH, gameScale) => {
        const tileWidth=40 * gameScale;
        const centeredOffset = (centered) ? tileWidth / 2 : 0;
        return x * tileWidth / 2 - y * tileWidth / 2 + (gridMaxX * tileWidth / 2) + centeredOffset - centerW / 2;
    };
    const calcYPos = (x, y, centered, centerW, centerH, gameScale) => {
        const tileHeight=20 * gameScale;
        const centeredOffset = (centered) ? tileHeight / 2 : 0;
        return x * tileHeight / 2 + y * tileHeight / 2 + (tileHeight * 2) + centeredOffset - centerH;
    };
    const calcZPos = (x, y) => {
        return x * 1 + y * 1;
    };
    const handleTeleportClose = () => {
        setTeleporterOpen(false);
    }
    const handleDialogClose = () => {
        setDialogueOpenNpc('');
    };
    const handleSignClose = () => {
        setDialogueOpenSign('');
    };
    const maxZ = calcZPos(gridMaxX, gridMaxX) + 5;
    const vwUnit = window.innerWidth / 100;
    const playerPostRealX = vwUnit * (calcXPos(playerPos.x, playerPos.y, false, 0, 0, gameScale) + 20 * gameScale);
    const playerPostRealY = vwUnit * (calcYPos(playerPos.x, playerPos.y, false, 0, 0, gameScale) + 10 * gameScale);

    const globalOffsetX = (window.innerWidth / 2 - playerPostRealX);
    const globalOffsetY = (window.innerHeight / 2- playerPostRealY);

    const getItem = (x, y, z) => {
        const ids = Object.keys(itemsState[z]);
        const foundId = ids.find((id) => itemsState[z][id].x === x && itemsState[z][id].y === y );
        if (foundId){
            return itemsState[z][foundId];
        }
        return null;
    };
    const getSpot = (x, y, z) => {
        return areaState[z].find((spot) => spot.x === x && spot.y === y);
    };
    const itemOnSpot = getItem(playerPos.x, playerPos.y, playerPos.z);
    const changePlayerPosition = (dx, dy, dz) => {
        if ((numNoodles === maxNoodles) || inTransition !== '' || dialogueOpenNpc !== '' || dialogueOpenSign !== ''){
            return;
        }
        let validMove = true;
        if (!playerAnim) {
            setPlayerAnim(true);
        }
        if (dz === 0) {
            const currentSpot =  getSpot(playerPos.x, playerPos.y, playerPos.z);
            const nextSpot = getSpot(playerPos.x + dx, playerPos.y + dy, playerPos.z + dz);
            const nextItem = getItem(playerPos.x + dx, playerPos.y + dy, playerPos.z + dz);
            const nextX = playerPos.x + dx;
            const nextY = playerPos.y + dy;
            // const nextZ = playerPos.z + dz;
            if (nextItem && !objTypes.itemTypes[nextItem.objType].passable){
                validMove = false;
            }
            if ((nextX < 0 || nextY < 0)){
                validMove = false;
            }
            if (!nextSpot){
                validMove = false;
            } else {
                if (!objTypes.tileTypes[nextSpot.objType].walkable){
                    validMove = false;
                }
                if ((dy < 0) && ((currentSpot.walls && !checkMovement(currentSpot, 'n')))){
                    validMove = false;
                }
                if ((dy > 0) && ((nextSpot.walls && !checkMovement(nextSpot, 'n')))){
                    validMove = false;
                }
                if ((dx < 0) && ((currentSpot.walls && !checkMovement(currentSpot, 'w')))){
                    validMove = false;
                }
                if ((dx > 0) && ((nextSpot.walls && !checkMovement(nextSpot, 'w')))){
                    validMove = false;
                }
                if ((dz > 0) && currentSpot.objType !== 'stairs-up') {
                    validMove = false;
                }
                if ((dz < 0) && currentSpot.objType !== 'stairs-down') {
                    validMove = false;
                }

            }
        }
        const f = (dz === 0) ? calcPlayerFacing(dx, dy) : playerPos.f;
        const s = (playerPos.s === 0) ? 1 : 0;
        if (validMove){
            const x = playerPos.x + dx;
            const y = playerPos.y + dy;
            const z = playerPos.z + dz;
            // look for NPC "items"
            const itemOnSpot = getItem(x,y,z);
            if (itemOnSpot && objTypes.itemTypes[itemOnSpot.objType].action === 'talk'){
                setDialogueOpenNpc(itemOnSpot.objType);
            }
            if (itemOnSpot && objTypes.itemTypes[itemOnSpot.objType].action === 'sign'){
                if (itemOnSpot.special){
                    setDialogueOpenSign(itemOnSpot.special);
                }
            }
            if (itemOnSpot && objTypes.itemTypes[itemOnSpot.objType].action === 'marker') {
                const newSpot = {
                    label: itemOnSpot.special,
                    x,
                    y,
                    z,
                    f: playerPos.f,
                    s: playerPos.s,
                };
                setTeleportSpots([
                    ...teleportSpots,
                    newSpot,
                ]);
                startBlink(x, y, `blink-marker-found-${itemOnSpot.special}`);
                const updatedItem = {
                    ...itemOnSpot,
                };
                updatedItem.objType = 'marker-found';
                var floor = {
                    ...itemsState[z],
                    updatedItem,
                };
                setItemsState({
                    ...itemsState,
                    [z]: floor,
                })
            }
            setPlayerPos({
                x,
                y,
                z,
                f,
                s,
            })
        }
    };
    if (itemOnSpot && (objTypes.itemTypes[itemOnSpot.objType].action === 'teleport')){
        const bits = itemOnSpot.special.split(',');
        if (bits.length === 3) {
            setPlayerAnim(false);
            const x = parseInt(bits[0], 10);
            const y = parseInt(bits[1], 10);
            const z = parseInt(bits[2], 10);
            const s = (playerPos.s === 0) ? 1 : 0;
            setPlayerPos({
                x,
                y,
                z,
                f: playerPos.f,
                s,
            });
        }
    }
    const calcPlayerFacing = (dx, dy) => {
        if (dx > 0) {
            return 'e';
        }
        if (dx < 0) {
            return 'w';
        }
        if (dy > 0) {
            return 's';
        }
        if (dy < 0) {
            return 'n'
        }
    };
    React.useEffect(() => {
        const keyPressHandler = (e) => {
            if (inTransition !== '' || dialogueOpenNpc !== '' || dialogueOpenSign !== ''){
                return;
            }
            switch(e.keyCode){
                case 87:
                    changePlayerPosition(0,-1, 0);
                    break;
                case 65:
                    changePlayerPosition(0,1, 0);
                    break;
                case 81:
                    changePlayerPosition(-1,0, 0);
                    break;
                case 83:
                    changePlayerPosition(1,0, 0);
                    break;
                case 32:
                case 9:
                    handleAction();
                    break;
                default:
                    break;
            }
        };
        document.addEventListener('keydown', keyPressHandler);
        return () => {
            document.removeEventListener('keydown', keyPressHandler);
        };
    });
    // AVAILABLE ACTIONS
    const dirs = [
        {lbl: 'n', dx: 0, dy: 0, idx: 0, idy: -1},
        {lbl: 'w', dx: 0, dy: 0, idx: -1, idy: 0},
        {lbl: 's', dx: 0, dy: 1, idx: 0, idy: 1},
        {lbl: 'e', dx: 1, dy: 0, idx: 1, idy: 0},
    ];
    let availableActions = dirs.map(dir => {
        const tmpSpot = getSpot(playerPos.x + dir.dx, playerPos.y + dir.dy, playerPos.z);

        const nextItem = getItem(playerPos.x + dir.idx, playerPos.y + dir.idy, playerPos.z);
        const validByItems = (!nextItem || (nextItem && objTypes.itemTypes[nextItem.objType].passable));

        if (tmpSpot) {
            if (validByItems && (dir.lbl === 'n' || dir.lbl === 's') && tmpSpot.walls.n.objType === 'none' && objTypes.tileTypes[tmpSpot.objType].walkable){
                return dir.lbl;
            }
            if (validByItems && (dir.lbl === 'e' || dir.lbl === 'w') && tmpSpot.walls.w.objType === 'none' && objTypes.tileTypes[tmpSpot.objType].walkable){
                return dir.lbl;
            }
        }
        return null;
    });
    if (itemOnSpot && objTypes.itemTypes[itemOnSpot.objType].action) {
        availableActions.push('a');
    }
    const incrementScore = (n) => {
        setScore(score + parseInt(n, 10));
    };
    const floorTransition = (dz) => {
        const dir = (dz > 0) ? 'u' : 'd';
        setInTransition(dir);
        let timer = setTimeout(() => {
            changePlayerPosition(0,0,dz);
            timer = setTimeout(() => {
                setInTransition('');
            }, 600);
        }, 600);
        return () => clearTimeout(timer);
    };
    const removeItemFromInventoryAndFromItems = (invObjId, itemObjId) => {
        removeItemFromInventory(invObjId);
        removeItemFromItems(itemObjId);
    };
    const removeItemFromInventory = (objId) => {
        setInventory(inventory.filter(item => item.id !== objId));
    };
    const addItemToInventory = (item) => {
        setInventory( inv => [...inv, item]);
    };
    const removeItemFromItems = (objId) => {
        const floor = {
            ...itemsState[playerPos.z],
        };
        delete floor[objId];
        setItemsState({
            ...itemsState,
            [playerPos.z]: floor,
        });
    };
    const startBlink = (x, y, hash) => {
        switch (blinkNum) {
            case 1:
                setBlink1({
                    x,
                    y,
                    hash
                });
                break;
            case 2:
                setBlink2({
                    x,
                    y,
                    hash
                });
                break;
            case 3:
                setBlink3({
                    x,
                    y,
                    hash
                });
                break;
            default:
                break;
        }
        const nextBlinkNum = (blinkNum === 3) ? 1 : blinkNum + 1;
        setBlinkNum(nextBlinkNum);
    };
    const handleAction = () => {
        if (!itemOnSpot || inTransition !== '' || dialogueOpenNpc !== '' || dialogueOpenSign !== ''){
            return;
        }
        const itemType = objTypes.itemTypes[itemOnSpot.objType];
        const action = itemType.action;
        const objId = itemOnSpot.id;
        switch (action) {
            case 'take':
                takeItem(itemOnSpot);
                toast('You took the item. It is now available in your inventory.');
                startBlink(playerPos.x, playerPos.y, `blink-${objId}`);
                break;
            case 'consume':
                if (itemOnSpot.objType.includes('coins')){
                    incrementScore(itemType.value);
                    toast('More stars = more points!');
                    startBlink(playerPos.x, playerPos.y, `blink-consume-${objId}`);
                    removeItemFromItems(objId);
                }
                break;
            case 'moveUp':
                floorTransition(1);
                toast('Going up!');
                break;
            case 'moveDown':
                floorTransition(-1);
                toast('Going down!');
                break;
            default:
                break;
        }
    };

    const changeWallType = (x, y, z, dir, objType) => {
        const floor = areaState[z].map(area => {
            if (area.x === x && area.y === y){
                if (dir === 'n'){
                    return {
                        ...area,
                        "walls": {
                            "n": {
                                "objType": objType,
                            },
                            "w": {
                                "objType": area.walls.w.objType,
                            },
                        },
                    };
                } else {
                    return {
                        ...area,
                        "walls": {
                            "n": {
                                "objType": area.walls.n.objType,
                            },
                            "w": {
                                "objType": objType,
                            },
                        },
                    };
                }
            } else {
                return area;
            }
        });
        setAreaState({
            ...areaState,
            [z]: floor,
        });
    };
    const getAdjacentItemOfType = (objType) => {
        const dirs = [
            { dx: 0, dy: 0},
            { dx: 0, dy: 1},
            { dx: 1, dy: 0},
            { dx: 0, dy: -1},
            { dx: -1, dy: 0},
        ];
        let itemFound = null;
        dirs.map((dir) => {
            const item = getItem(playerPos.x + dir.dx, playerPos.y + dir.dy, playerPos.z);
            if (item && item.objType === objType) {
                itemFound = item;
            }
            return null;
        });
        return itemFound;
    };
    const takeItem = (item) => {
        addItemToInventory(item);
        removeItemFromItems(item.id);
    };
    const handleTeleportSelect = (spot) => {
        setPlayerPos({
            x: spot.x,
            y: spot.y,
            z: spot.z,
            f: playerPos.f,
            s: playerPos.s,
        });
        startBlink(spot.x, spot.y, `blink-teleport-${spot.label}`);
    };

    const dummyBtn = React.useRef();

    const handleInventoryClick = (objType) => {
        dummyBtn.current.focus(); // programmatically force inventory buttons to not receive focus
        if (numNoodles === maxNoodles){
            return;
        }
        const usedItem = inventory.find((item) => item.objType === objType);
        if (objTypes.itemTypes[objType] && objTypes.itemTypes[objType].invAction){
            const invAction = objTypes.itemTypes[objType].invAction;
            const invObj = objTypes.itemTypes[objType];
            const objId = usedItem.id;
            const currentSpot =  getSpot(playerPos.x, playerPos.y, playerPos.z);
            switch(invAction.actionType){
                case "fill-bowl":
                    const bowl = getAdjacentItemOfType('bowl');
                    if (bowl) {
                        startBlink(bowl.x, bowl.y, `blink-bowl-${objId}`);
                        removeItemFromInventory(objId);
                        setNumNoodles(numNoodles + 1);
                        const numLeft = maxNoodles - (numNoodles + 1);
                        incrementScore(invAction.value);
                        if (numLeft > 0){
                            toast(`Put the noodles in the bowl. Nearly lunch time. Just ${numLeft} more to go!`);
                        } else {
                            toast('You did it! Time for noodles!');
                        }
                    }
                    break;
                case "clear":
                    const itemToClear = getAdjacentItemOfType(invAction.objectToClear);
                    if (itemToClear) {
                        if (invAction.actionConsumable){
                            removeItemFromInventoryAndFromItems(objId, itemToClear.id);
                        } else {
                            removeItemFromItems(itemToClear.id);
                        }
                        incrementScore(invAction.value);
                        toast(invAction.successText);
                        startBlink(itemToClear.x, itemToClear.y, `blink-clear-${objId}`);
                    }
                    break;
                case "teleport-home":
                    setTeleporterOpen(true);
                    break;
                case "fish":
                    const salmon = getAdjacentItemOfType('salmon');
                    if (salmon) {
                        startBlink(salmon.x, salmon.y, `blink-fish-${objId}`);
                        removeItemFromItems(salmon.id);
                        const inv = inventory.filter(item => item.id !== objId);
                        const itemCopy = {
                            ...salmon,
                            x:-1,
                            y:-1,
                        }
                        inv.push(itemCopy);
                        setInventory(inv);
                        incrementScore(invObj.value);
                        toast('You hooked a big one! I wonder who likes fish.');
                    }
                    break;
                case 'door':
                    // Find a door near the player
                    const currentSpotS =  getSpot(playerPos.x, playerPos.y + 1, playerPos.z);
                    const currentSpotE =  getSpot(playerPos.x + 1, playerPos.y, playerPos.z);
                    const newObjType = `door${invAction.special}open`;

                    if (currentSpot.walls.n.objType === `door${invAction.special}`){
                        changeWallType(playerPos.x, playerPos.y, playerPos.z, 'n', newObjType);
                        incrementScore(invObj.value);
                        if (invAction.actionConsumable){
                            removeItemFromInventory(objId);
                        }
                    } else if (currentSpot.walls.w.objType === `door${invAction.special}`) {
                        changeWallType(playerPos.x, playerPos.y, playerPos.z, 'w', newObjType);
                        incrementScore(invObj.value);
                        if (invAction.actionConsumable){
                            removeItemFromInventory(objId);
                        }
                    } else if (currentSpotS && currentSpotS.walls.n.objType === `door${invAction.special}`) {
                        changeWallType(playerPos.x, playerPos.y + 1, playerPos.z, 'n', newObjType);
                        incrementScore(invObj.value);
                        if (invAction.actionConsumable){
                            removeItemFromInventory(objId);
                        }
                    } else if (currentSpotE && currentSpotE.walls.w.objType === `door${invAction.special}`) {
                        changeWallType((playerPos.x + 1), playerPos.y, playerPos.z, 'w', newObjType);
                        incrementScore(invObj.value);
                        if (invAction.actionConsumable){
                            removeItemFromInventory(objId);
                        }
                    }
                    // if no door, do nothing
                    break;
                default:
                    break;
            }
        }
    };


    const itemIds = Object.keys(itemsState[playerPos.z]);
    const itemIdsLayer0 = itemIds.filter(id => (objTypes.itemTypes[itemsState[playerPos.z][id].objType].layer === 0));
    const itemIdsLayer1 = itemIds.filter(id => (objTypes.itemTypes[itemsState[playerPos.z][id].objType].layer === 1));

    const display_items0 = React.useMemo(() => itemIdsLayer0.map((id, idx) => <Item
        key={idx}
        item={itemsState[playerPos.z][id]}
        calcXPos={calcXPos}
        calcYPos={calcYPos}
        calcZPos={calcZPos}
        gameScale={gameScale}
        numNoodles={numNoodles}
        maxNoodles={maxNoodles}
    />), [itemIdsLayer0, gameScale, itemsState, numNoodles, playerPos.z]);

    const display_items1 = React.useMemo(() => itemIdsLayer1.map((id, idx) => <Item
        key={idx}
        item={itemsState[playerPos.z][id]}
        calcXPos={calcXPos}
        calcYPos={calcYPos}
        calcZPos={calcZPos}
        gameScale={gameScale}
        numNoodles={numNoodles}
        maxNoodles={maxNoodles}
    />), [itemIdsLayer1, gameScale, itemsState, numNoodles, playerPos.z]);

    const display_tiles = React.useMemo(() =>
            areaState[playerPos.z].map((item, idx) => <Tile
                tileData={item}
                key={idx}
                calcXPos={calcXPos}
                calcYPos={calcYPos}
                calcZPos={calcZPos}
                objTypes={objTypes}
                gameScale={gameScale}
            />)
        , [areaState, gameScale, objTypes, playerPos.z]);

    return (
        <div className={css.game}>
            <div className={css.boardWrap}>
                <div className={`${css.board} ${playerAnim && css.anim}`} style={{
                    left: globalOffsetX,
                    top: globalOffsetY,
                }}>
                    { display_tiles }
                    { display_items0 }
                    <Player
                        x={playerPos.x}
                        y={playerPos.y}
                        playerFacing={playerPos.f}
                        playerStep={playerPos.s}
                        calcXPos={calcXPos}
                        calcYPos={calcYPos}
                        calcZPos={calcZPos}
                        gameScale={gameScale}
                        inTransition={inTransition}
                        maxZ={maxZ}
                        playerAnim={playerAnim}
                    />
                    { display_items1 }
                    <Blink
                        x={blink1.x}
                        y={blink1.y}
                        calcXPos={calcXPos}
                        calcYPos={calcYPos}
                        calcZPos={calcZPos}
                        gameScale={gameScale}
                        blinkHash={blink1.hash}
                    />
                    <Blink
                        x={blink2.x}
                        y={blink2.y}
                        calcXPos={calcXPos}
                        calcYPos={calcYPos}
                        calcZPos={calcZPos}
                        gameScale={gameScale}
                        blinkHash={blink2.hash}
                    />
                    <Blink
                        x={blink3.x}
                        y={blink3.y}
                        calcXPos={calcXPos}
                        calcYPos={calcYPos}
                        calcZPos={calcZPos}
                        gameScale={gameScale}
                        blinkHash={blink3.hash}
                    />
                    <div className={`${css.fader} ${inTransition !== '' && css.active}`} style={{
                        zIndex: (maxZ-2),
                    }}/>
                </div>
            </div>
            <div className={css.hud} style={{zIndex: maxZ}}>
                <HudControls
                    changePlayerPosition={changePlayerPosition}
                    availableActions={availableActions}
                    handleAction={handleAction}
                />
                <ScoreDisp
                    score={score}
                />
                <Quit
                    resetGame={resetGame}
                />
                <Inventory
                    inventoryItems = {inventory.sort((a, b) => {
                        if (a.objType > b.objType) {return 1;}
                        if (a.objType < b.objType) {return -1;}
                        return 0;
                    })}
                    handleInventoryClick={handleInventoryClick}
                />
                <div className={css.instrux}>
                    <div className={css.inner}>
                        Keyboard controls: ↗ = W,  ↙ = A, ↖ = Q, ↘ = S, Action = [SPACEBAR]
                    </div>
                </div>
            </div>
            <Dialogue
                dialogueOpenNpc={dialogueOpenNpc}
                handleDialogClose={handleDialogClose}
            />
            <Sign
                text={dialogueOpenSign}
                handleSignClose={handleSignClose}
            />
            <TeleporterDialog
                teleporterOpen={teleporterOpen}
                teleportSpots={teleportSpots}
                handleTeleportClose={handleTeleportClose}
                handleTeleportSelect={handleTeleportSelect}
            />
            {
                (numNoodles === maxNoodles) &&
                <GameOver
                    setUiMode={setUiMode}
                    resetGame={resetGame}
                />
            }
            {
                (window.innerWidth > 768) &&
                <ToastContainer
                    position={toast.POSITION.BOTTOM_RIGHT}
                    className='toastContainer'
                    bodyClassName='toastItem'
                    progressClassName='toastItem'
                />
            }
            <div className={css.dummyBtn}>
                <button ref={dummyBtn}>dummy</button>
            </div>
            {
                (numNoodles === maxNoodles) &&
                <GameOverConfetti />
            }
            {/*<Button onClick={testCheat} variant="contained" style={{position:'absolute', bottom: 0, left: 0, zIndex: 300}}>TEST</Button>*/}
        </div>
    )
};

export default Game;
