import React from 'react';
import PropTypes from 'prop-types';
import css from 'modules/game/css/hud.module.scss';

const ScoreDisp = ({score}) => {
    return (
        <div className={css.scoreDisp}>
            SCORE: {score}
        </div>
    )

};

ScoreDisp.propTypes = {
    score: PropTypes.number.isRequired,
};

export default ScoreDisp;
