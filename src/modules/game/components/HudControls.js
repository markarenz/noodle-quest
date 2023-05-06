import React from 'react';
import PropTypes from 'prop-types';
import css from '../css/hud.module.scss';

const HudControls = ({ changePlayerPosition, availableActions, handleAction }) => {
    const btns = [
        {lbl: 'n', x: 0, y: -1, z: 0, posX: 1, posY: 0}, // N
        {lbl: 'w', x: -1, y: 0, z: 0, posX: 0, posY: 1}, // W
        {lbl: 'a', x: 0, y: 0, z: 0, posX: 1, posY: 1}, // ACTION
        {lbl: 'e', x: 1, y: 0, z: 0, posX: 2, posY: 0}, // E
        {lbl: 's', x: 0, y: 1, z: 0, posX: 1, posY: 2}, // S
    ];
    const defaultTileX = 60;
    const defaultTileY = 30;
    const tileScale = 2;
    const calcXPosLocal = (x, y, centered, centerW, centerH, gameScale) => {
        return (x - y) * defaultTileX + (defaultTileX * tileScale / 2); // half x 2
    };
    const calcYPosLocal = (x, y, centered, centerW, centerH, gameScale) => {
        return (x + y) * defaultTileY + (defaultTileY * tileScale / 2); // half x 2
    };
    const handleClick = (btn) => {
        if (btn.lbl === 'a') {
            handleAction();
        } else {
            changePlayerPosition(btn.x, btn.y, btn.z);
        }
    };
    return(
        <div className={css.controlsWrap}>
            {
                btns.map((btn, idx) =>
                    <div
                        key={idx}
                        className={`${css.tileBtn} ${availableActions.includes(btn.lbl) && css.active}`}
                        style={{
                            top: calcYPosLocal(btn.x, btn.y),
                            left: calcXPosLocal(btn.x, btn.y),
                        }}
                    >
                        <svg viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg" className={`${css.tileBtnSvg}`}>
                            <path
                                onClick={() => handleClick(btn)}
                                d="M 0, 10 L 20, 0 L 40, 10 L 20, 20 Z"
                                strokeWidth="1"
                                className={css.btnBg}
                            />
                            {
                                (btn.lbl === 'n') &&
                                <path
                                    d="M 10, 13 L 14, 15 L 24, 10 L 30, 13 L 28, 6 L 14, 5 L 20, 8 Z"
                                    fill="white"
                                    className={`${css.btnIcon} ${availableActions.includes('n') && css.active}`}
                                />
                            }
                            {
                                (btn.lbl === 's') &&
                                <path
                                    d="M 26, 5 L 30, 7 L 20, 12 L 26, 15 L 12, 14 L 10, 7 L 16, 10 Z"
                                    fill="white"
                                    className={`${css.btnIcon} ${availableActions.includes('s') && css.active}`}
                                />
                            }
                            {
                                (btn.lbl === 'w') &&
                                <path
                                    d="M 30, 13 L 26, 15 L 16, 10 L 10, 13 L 12, 6 L 26, 5 L 20, 8 Z"
                                    fill="white"
                                    className={`${css.btnIcon} ${availableActions.includes('w') && css.active}`}
                                />
                            }
                            {
                                (btn.lbl === 'e') &&
                                <path
                                    d="M 10, 7 L 14, 5 L 24, 10 L 30, 7 L 28, 14 L 14, 15 L 20, 12 Z"
                                    fill="white"
                                    className={`${css.btnIcon} ${availableActions.includes('e') && css.active}`}
                                />
                            }
                            {
                                (btn.lbl === 'a') &&
                                <>
                                    <ellipse
                                        cx="20"
                                        cy="10"
                                        rx="8"
                                        ry="4"
                                        fill="white"
                                        // stroke="white"
                                        // strokeWidth="1"
                                        className={`${css.btnIcon} ${availableActions.includes('a') && css.active}`}
                                    />
                                    <line className={css.btnIconDeco} x1="17" y1="8.5" x2="23" y2="11.5" stroke="#888" strokeWidth="0.5" />
                                    <line className={css.btnIconDeco} x1="17" y1="11.5" x2="23" y2="8.5" stroke="#888" strokeWidth="0.5" />
                                </>
                            }
                        </svg>
                    </div>
                )
            }
        </div>
    )
};

HudControls.propTypes = {
    changePlayerPosition: PropTypes.func.isRequired,
    availableActions: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleAction: PropTypes.func.isRequired,
};

export default HudControls;
