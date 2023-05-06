import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, IconButton, Grid } from '@material-ui/core';
import { Close as IconClose } from '@material-ui/icons';
import dialogueData from "../../../data/dialogueData";
import css from '../css/dialogue.module.scss';

const Dialogue = ({ dialogueOpenNpc, handleDialogClose }) => {
    const [cursor, setCursor] = React.useState('intro');
    React.useEffect(() => {
        setCursor('intro');
    }, [dialogueOpenNpc]);
    if (dialogueOpenNpc === ''){
        return null;
    }
    const convo = (dialogueOpenNpc !== '' && cursor !== 'exit') ? dialogueData[dialogueOpenNpc] : {};
    const handleDialogueClick = (slug) => {
        if (slug === 'exit') {
            setCursor('intro');
            handleDialogClose();
        } else {
            setCursor(slug);
        }
    };

    return (
        <Dialog
            open={dialogueOpenNpc !== ''}
            className={css.dialogueModal}
        >
            <DialogTitle className={css.title}>
                <div>Talking with {convo.name}</div>
                <IconButton onClick={handleDialogClose}>
                    <IconClose />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers className={css.quoteWrap}>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={9} className={css.vCenter}>
                        <div className={css.quoteCol}>
                            <div className={css.quote}>
                                <span>&ldquo;</span>
                                {convo.paths[cursor].label}
                                <span>&rdquo;</span>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={3} className={css.vCenter}>
                        <img src={`/images/items/${dialogueOpenNpc}.svg`} alt={dialogueOpenNpc} className={css.portrait}/>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions className={css.options}>
                <Grid container spacing={2}>
                    {
                        convo.paths[cursor].options.map((option, idx) => <Grid item xs={12} key={idx}><Button className={css.optionButton} variant="outlined" onClick={() => handleDialogueClick(option.slug)}>
                            {option.label}
                        </Button></Grid>)
                    }
                </Grid>
            </DialogActions>
        </Dialog>
    )
};

Dialogue.propTypes = {
    dialogueOpenNpc: PropTypes.string.isRequired,
    handleDialogClose: PropTypes.func.isRequired,
};

export default Dialogue;
