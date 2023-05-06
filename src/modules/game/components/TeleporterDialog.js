import React from 'react';
import {Dialog, DialogContent, DialogActions, Button, Grid, Slide, DialogTitle, IconButton} from '@material-ui/core';
import PropTypes from 'prop-types';
import {Close as IconClose} from "@material-ui/icons";
import css from '../css/dialogue.module.scss';

const TeleporterDialog = ({ teleporterOpen, teleportSpots, handleTeleportClose, handleTeleportSelect}) => {
    if (!teleporterOpen){
        return null;
    }
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide
            direction="up"
            ref={ref} {...props}
            // style={{ transitionDelay: (dialogueOpenNpc !== '') ? '.3s' : '0s' }}
        />;
    });
    const handleOptionClick = (spot) => {
        handleTeleportClose();
        handleTeleportSelect(spot);
    }
    return (
        <Dialog
            open={teleporterOpen !== ''}
            className={css.dialogueModal}
            TransitionComponent={Transition}
        >
            <DialogTitle className={css.title}>
                <div>Teleport</div>
                <IconButton onClick={handleTeleportClose}>
                    <IconClose />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers className={css.content}>
                <Grid container spacing={3}>
                    <Grid item xs={12} >
                        Using your nifty teleporter, you can go to any of the markers you've visited before. Select a spot from the list below.
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions className={css.options}>
                <Grid container spacing={1}>
                    {
                        teleportSpots.map((spot, idx) =>
                            <Grid key={idx} item xs={12} sm={6}>
                                <Button className={css.teleportOption} variant="outlined" onClick={() => handleOptionClick(spot)} >
                                    <img src="/images/items/marker-found.svg" alt="teleport spot"/>
                                    {spot.label}
                                </Button>
                            </Grid>
                        )
                    }
                </Grid>
            </DialogActions>
        </Dialog>
    )
};

TeleporterDialog.propTypes = {
    teleporterOpen: PropTypes.bool.isRequired,
    teleportSpots: PropTypes.arrayOf(PropTypes.any).isRequired,
    handleTeleportClose: PropTypes.func.isRequired,
    handleTeleportSelect: PropTypes.func.isRequired,
};
export default TeleporterDialog;
