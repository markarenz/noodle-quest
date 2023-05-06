import React from 'react';
import { IconButton, Fab } from '@material-ui/core';
import { ExitToApp as IconQuit } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from '../css/hud.module.scss';

const Quit = ({ resetGame }) => <div className={css.btnQuit}>
        <Fab>
            <IconButton component={Link} to="/" onClick={resetGame}>
                <IconQuit />
            </IconButton>
        </Fab>
    </div>
;

    Quit.propTypes = {
    resetGame: PropTypes.func.isRequired,
};

export default Quit;
