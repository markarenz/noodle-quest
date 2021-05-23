import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import css from 'modules/game/css/gameover.module.scss';
import PropTypes from 'prop-types';

const GameOver = ({ resetGame, history }) => {
    const handleReturnClick = () => {
        history.push('/');
        resetGame();
    }
    return (
        <Dialog open className={css.gameOver}>
            <DialogTitle className={css.title}>
                YOU DID IT!
            </DialogTitle>
            <DialogContent className={css.content}>
                You found all the noodles. Now it's time to sit down and have lunch! You live to adventure another day!
            </DialogContent>
            <DialogActions className={css.actions}>
                <Button onClick={handleReturnClick} variant="outlined" className={css.btn}>RETURN</Button>
            </DialogActions>
        </Dialog>
    );
};

GameOver.propTypes = {
  resetGame: PropTypes.func.isRequired,
};

export default withRouter(GameOver);
