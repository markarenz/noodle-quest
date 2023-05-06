import React from 'react';
import { TextField, Button, Grid, Tabs, Tab, FormControl, Input, InputLabel } from '@material-ui/core';
import Draggable from 'react-draggable';
import { Delete as IconDelete,
  ArrowBack as IconLeft,
  ArrowForward as IconRight,
  ArrowUpward as IconUp,
  ArrowDownward as IconDown
} from "@material-ui/icons";
import { EditorTile, Header, EditorItem } from '../components';
import TabPanel from '../components/TabPanel';
import mapObjTypes from '../../../data/mapObjTypes';
import itemData from '../../../data/itemData';
import areaData from '../../../data/areaData';
import css from '../css/editor.module.scss';

const Editor = () => {
    const [areaState, setAreaState] = React.useState(areaData);
    const gridMaxX = 16; // Math.max.apply(Math, areaState.map(function(o) { return o.x; }));
    const gridMaxY = 16; // Math.max.apply(Math, areaState.map(function(o) { return o.y; }));
    const updateAreaData = (x, y, z, area) => {
        var floor = areaState[z].map(el => ((el.x === x && el.y === y) ? area : el));
        setAreaState({
            ...areaState,
            floor,
        });
    };

    const createBlankFloor = (z, size) => {
        const floor = [];
        for (var y = 0; y < size; y++) {
            for (var x = 0; x < size; x++) {
                const tileType = 'none';
                const wallN = 'none';
                const wallW = 'none';
                const area = {
                    "x": x,
                    "y": y,
                    "objType": tileType,
                    "walls": {
                        "n": {
                            "objType": wallN
                        },
                        "w": {
                            "objType": wallW
                        }
                    }
                };
                floor.push(area);
            }
        }
        console.log('createBlankFloor', z, size);
        console.log(floor);
        setAreaState({
            ...areaState,
            [z]: floor,
        });
    };
    const [selectedTile, setSelectedTile] = React.useState('none');
    const [selectedWall, setSelecedWall] = React.useState('none');
    const [selectedItem, setSelectedItem] = React.useState('coins-small');
    const [items, setItems] = React.useState(itemData);
    const objTypes = mapObjTypes.mapObjTypes;
    const [editorMode, setEditorMode] = React.useState(0);
    const [modalActive, setModalActive] = React.useState(false);
    const [defGridSize, setDefGridSize] = React.useState(10);
    const [currentFloor, setCurrentFloor] = React.useState(0);
    const [itemSpecial, setItemSpecial] = React.useState('');
    const [tmpItem, setTmpItem] = React.useState({});
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const handleChangeItemSpecial = (e) => {
        setItemSpecial(e.target.value);
        const itemModalFocusedItem = getItemById(tmpItem);
        const updatedItem = {
            id: itemModalFocusedItem.id,
            x: itemModalFocusedItem.x,
            y: itemModalFocusedItem.y,
            z: currentFloor,
            special: e.target.value,
            objType: itemModalFocusedItem.objType,
        };
        updateItemsData( updatedItem, tmpItem);

    };
    const handleEditorModeChange = (event, newValue) => {
        setEditorMode(newValue);
    };
    const handleTileSelect = (id) => {
        setSelectedTile(id);
    };
    const handleModalOpen = () => {
        setModalActive(true);
    };
    const handleModalClose = () => {
        setModalActive(false);
    };
    const handleFloorChange = (nextFloor) => {
        console.log('HandleFloorChange', nextFloor);
        if (!areaState[nextFloor]){
            createBlankFloor(nextFloor, defGridSize);
        }
        if (!items[nextFloor]){
            console.log('ITEMS DO NOT EXIST FOR THIS FLOOR');
            const floor = [];
            setItems({
                ...items,
                [nextFloor]: floor,
            });
        }
        setCurrentFloor(nextFloor);
    };

    const handleFloorChangeUp = () => {
        handleFloorChange(currentFloor + 1);
    };

    const handleFloorChangeDown = () => {
        handleFloorChange(currentFloor - 1);
    };

    const handleDefGridSizeChange = (e) => {
        setDefGridSize(parseInt(e.target.value, 10));
    };
    const handleClearFloor = () => {
        setModalActive(false);
        createBlankFloor(currentFloor, defGridSize);
    };

    const getAreaByXYZ = (x, y, z) => {
        return areaState[z].find((area) => area.x === x && area.y === y);
    };

    const setTileType = (x, y) => {
        const area = getAreaByXYZ(x, y, currentFloor);
        area.objType = selectedTile;
        updateAreaData(x, y, currentFloor, area);
    };
    const setWallType = (x, y, d) => {
        const area = getAreaByXYZ(x, y, currentFloor);
        area.walls[d].objType = selectedWall;
        updateAreaData(x, y, currentFloor, area);
    };

    const handleCopyDataAreas = () => {
        // navigator.clipboard.writeText(`const areaData = \n${JSON.stringify(areaState, null, '	')};\nexport default areaData;`);
        navigator.clipboard.writeText(`const areaData = \n${JSON.stringify(areaState)};\nexport default areaData;`);
    };

    // const convertItemsToObjects = () => {
    //     let newItems = {};
    //     console.log('items', items);
    //     Object.keys(items).map((z) => {
    //         newItems[z] = {};
    //         items[z].map((itm) => {
    //             newItems[z][itm.id] = itm;
    //             return null;
    //         });
    //         return null;
    //     });
    //     return (newItems);
    // };

    const handleCopyDataItems = () => {
        // const objItems = convertItemsToObjects();
        // navigator.clipboard.writeText(`const itemData = \n${JSON.stringify(items, null, '\t')}\nexport default itemData;`);
        navigator.clipboard.writeText(`const itemData = \n${JSON.stringify(items)}\nexport default itemData;`);
    };
    const handleWallSelect = (objType) => {
        setSelecedWall(objType);
    }
    const handleItemSelect = (objType) => {
      setSelectedItem(objType);
    };

    const getMaxItemId = () => {
        let maxItemId = 0;
        Object.keys(items).map((floorNum) => {
            Object.keys(items[floorNum]).map((id) => {
                const idNum = parseInt(id, 10);
                if (idNum > maxItemId) {
                    maxItemId = idNum;
                }
                return null;
            });
            return null;
        });
        return maxItemId;
    };
    const placeItem = (x, y) => {
        if (!items[currentFloor]) {
            return;
        }
        const existingItemOnSpot = Object.keys(items[currentFloor]).filter((id) => items[currentFloor][id].x === x && items[currentFloor][id].y === y);
        if (existingItemOnSpot.length > 0) {
            return false;
        }
        const newId = getMaxItemId() + 1;
        const newItem = {
            x,
            y,
            id: newId,
            special: '',
            objType: selectedItem,
        };
        const floor = {
            ...items[currentFloor],
            [newId]: newItem,
        };
        setItems({
            ...items,
            [currentFloor]: floor,
        });
        handleItemClick(newId);
    };

    // const itemModalFocusedItem = (items[currentFloor]) ? items[currentFloor].find((item) => (item.id === tmpItem)) : null;

    const handleItemClick = (item) => {
        console.log(item);
        setTmpItem(item);
        if (!item.special){
            setItemSpecial('');
        } else {
            setItemSpecial(item.special);
        }
    };
    const handleItemDelete = () => {
        let clonedItems = {...items};
        delete clonedItems[currentFloor][tmpItem.id];
        console.log(clonedItems);
        setItems({
            ...clonedItems,
        });
        setTmpItem('');
    };
    const getItemById = (id) => {
        return items[currentFloor][id];
    };
    const updateItemsData = (updatedItem, id) => {
        var floor = {
            ...items[currentFloor],
            [id]: updatedItem,
        };
        setItems({
            ...items,
            [currentFloor]: floor,
        });
    };
    const handleItemMove = (dx, dy) => {
        const itemModalFocusedItem = getItemById(tmpItem.id);
        const updatedItem = {
            id: itemModalFocusedItem.id,
            x: (itemModalFocusedItem.x + dx),
            y: (itemModalFocusedItem.y + dy),
            special: itemModalFocusedItem.special,
            objType: itemModalFocusedItem.objType,
        };
        updateItemsData( updatedItem, tmpItem.id);
    };
    const inspectedItem = getItemById(tmpItem.id);
    return (
        <div>
            <Header
                handleCopyDataAreas={handleCopyDataAreas}
                handleCopyDataItems={handleCopyDataItems}
                currentFloor={currentFloor}
                handleFloorChangeUp={handleFloorChangeUp}
                handleFloorChangeDown={handleFloorChangeDown}
                handleModalOpen={handleModalOpen}
            />
            <div className={css.editorRoot}>
                <div className={css.areaEditor} style={{ height: (gridMaxY + 1) * 50}}>
                    {
                        areaState[currentFloor].map((area, idx) => {
                            return(
                                <EditorTile
                                    key={idx}
                                    x={area.x}
                                    y={area.y}
                                    area={area}
                                    setWallType={setWallType}
                                    setTileType={setTileType}
                                    mapObjTypes={objTypes}
                                    gridMaxX={gridMaxX}
                                    gridMaxY={gridMaxY}
                                    editorMode={editorMode}
                                    placeItem={placeItem}
                                />
                            )
                        })
                    }
                    {
                        Object.keys(items[currentFloor]).map((id, idx) => <EditorItem
                        key={idx}
                        item={items[currentFloor][id]}
                        handleItemClick={handleItemClick}
                        editorMode={editorMode}
                        />)
                    }
                </div>
            </div>
            <Draggable
                handle=".handle"
            >
                <div className={css.floatingModal}>
                    <div className={`handle ${css.dragHandle}`} />
                    <div>
                        <Tabs value={editorMode} className={css.tabs} onChange={handleEditorModeChange} aria-label="editor tabs">
                            <Tab
                                label="Tiles"
                                {...a11yProps(0)}
                            />
                            <Tab
                                label="Walls"
                                {...a11yProps(1)}
                            />
                            <Tab
                                label="Items"
                                {...a11yProps(2)}
                            />
                        </Tabs>
                    </div>
                    <TabPanel value={editorMode} index={0}>
                        <div>
                            {
                                Object.keys(objTypes.tileTypes).map((id, idx) => <Button key={idx} className={`${css.btnTileSelect} ${selectedTile === id && css.active}`} onClick={() => handleTileSelect(id)}><img src={`/images/tiles/editor/${id}.svg`} alt={id} /></Button>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel value={editorMode} index={1}>
                        {
                            Object.keys(objTypes.wallTypes).map((id, idx) => <Button key={idx} variant="outlined" className={`${css.btnWallSelect} ${selectedWall === id && css.active}`} onClick={() => handleWallSelect(id)}>
                                {id}
                            </Button>)
                        }
                    </TabPanel>
                    <TabPanel value={editorMode} index={2}>
                        <div>
                            {
                                Object.keys(objTypes.itemTypes).map((id, idx) => <Button key={idx} className={`${css.btnTileSelect} ${selectedItem === id && css.active}`} onClick={() => handleItemSelect(id)}><img src={`/images/items/${id}.svg`} alt={id} /></Button>)
                            }
                        </div>
                    </TabPanel>
                </div>
            </Draggable>


            {
                (editorMode === 2) &&
                <Draggable
                    handle=".handle"
                >
                    <div className={`${css.itemModal} ${(tmpItem.id !== '') && css.active}`}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} align="center">
                                <div className={`handle ${css.dragHandle}`} />
                            </Grid>
                            <Grid item xs={12} align="center">
                                <h3>Item #: {tmpItem.id}
                                    {
                                        inspectedItem && <span>({inspectedItem.x}, {inspectedItem.y})</span>
                                    }</h3>
                            </Grid>
                            <Grid item xs={12} align="center">
                                <FormControl>
                                    <InputLabel htmlFor="component-simple">Special</InputLabel>
                                    <Input id="component-simple" value={itemSpecial} onChange={handleChangeItemSpecial} />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button variant="outlined" onClick={handleItemDelete}>
                            <IconDelete />
                        </Button>
                        <Button variant="outlined" onClick={() => handleItemMove(-1,0)}>
                            <IconLeft />
                        </Button>
                        <Button variant="outlined" onClick={() => handleItemMove(1,0)}>
                            <IconRight />
                        </Button>
                        <Button variant="outlined" onClick={() => handleItemMove(0,-1)}>
                            <IconUp />
                        </Button>
                        <Button variant="outlined" onClick={() => handleItemMove(0,1)}>
                            <IconDown />
                        </Button>
                    </div>
                </Draggable>
            }
            <div id="clearFloorModal" className={`${css.modal} ${modalActive && css.active}`}>
                <div className={css.modalStage}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} align="center">
                            <TextField
                                id="filled-helperText"
                                onChange={handleDefGridSizeChange}
                                value={defGridSize}
                                label="Grid Size"
                                type="number"
                                // helperText="Some important text"
                                variant="filled"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} align="center">
                            <Button variant="contained" color="secondary" onClick={handleModalClose}>Cancel</Button>
                        </Grid>
                        <Grid item xs={12} sm={6} align="center">
                            <Button variant="contained" color="primary" onClick={handleClearFloor}>OK</Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default Editor;
