import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { ArrowForward as IconUp, ArrowBack as IconDown} from '@material-ui/icons';

import css from '../css/header.module.scss';

const Header = ({
                    handleCopyDataAreas,
                    handleCopyDataItems,
                    currentFloor,
                    handleFloorChangeUp,
                    handleFloorChangeDown,
                    handleModalOpen,
}) => {
    return (
        <AppBar className={css.header}>
            <Toolbar className={css.headerToolbar}>
                <div className={css.floorNum}>
                    <IconDown onClick={handleFloorChangeDown} className={css.floorIcon}/>
                    <div>
                        <span className={css.numLabel}>
                            Floor
                        </span>
                        <span className={css.numDisp}>
                            {currentFloor}
                        </span>
                    </div>
                    <IconUp onClick={handleFloorChangeUp} className={css.floorIcon}/>
                </div>

                <Button variant="contained" onClick={handleModalOpen}>Clear Floor</Button>

                <Button variant="contained" onClick={handleCopyDataAreas}>Copy Areas</Button>

                <Button variant="contained" onClick={handleCopyDataItems}>Copy Items</Button>

            </Toolbar>
        </AppBar>
    )
};
export default Header;
