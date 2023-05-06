import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, Grid, Slide } from '@material-ui/core';
import PropTypes from 'prop-types';
import css from '../css/dialogue.module.scss';

const Dialogue = ({ text, handleSignClose }) => {
    if (text === ''){
        return null;
    }

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide
            direction="up"
            ref={ref} {...props}
        />;
    });

    return (
        <Dialog
            open={text !== ''}
            className={css.dialogueModal}
            TransitionComponent={Transition}
        >
            <DialogContent dividers className={css.quoteWrap}>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={9} className={css.vCenter}>
                        <div className={css.quoteCol}>
                            <div className={css.quote}>
                                <span>&ldquo;</span>
                                {text}
                                <span>&rdquo;</span>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={3} className={css.vCenter}>
                        <img src={`/images/items/sign.svg`} alt="sign" className={css.portrait}/>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions className={css.options}>
                <Button variant="outlined" onClick={handleSignClose} className={css.optionButton}>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    )
};

Dialogue.propTypes = {
    text: PropTypes.string.isRequired,
    handleSignClose: PropTypes.func.isRequired,
};

export default Dialogue;
