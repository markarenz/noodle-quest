import React from 'react';
import PropTypes from "prop-types";
import playerLimbAnims from '../../../data/playerLimbAnims';
import css from '../css/player.module.scss'

const Player = ({x, y, calcXPos, calcYPos, calcZPos, gameScale, playerFacing, playerStep, inTransition, maxZ, playerAnim}) => {
    const l = calcXPos(x, y, true, 20 * gameScale, 20 * gameScale, gameScale);
    const t = calcYPos(x, y, true, 20 * gameScale, 20 * gameScale, gameScale);
    // const z = (inTransition) ? (maxZ-1) : calcZPos(x, y) ;
    const z = calcZPos(x, y);
    const directionClasses = {
        "n": css.faceN,
        "s": css.faceS,
        "e": css.faceE,
        "w": css.faceW,
    };
    const stepClasses = {
        0: css.step0,
        1: css.step1,
    };
    const d_arm_l = `stand_${playerFacing}_a_l_${playerStep}`;
    const d_arm_r = `stand_${playerFacing}_a_r_${playerStep}`;
    const d_leg_l = `stand_e_l_l_${playerStep}`;
    const d_leg_r = `stand_e_l_r_${playerStep}`;
    const getAnimatedLimbVals = (key) => {
        return `${playerLimbAnims.limbs[key].from};${playerLimbAnims.limbs[key].to};${playerLimbAnims.limbs[key].from}`;
    };
    const cx_hand_l = `stand_${playerFacing}_h_l_${playerStep}`;
    const cx_hand_r = `stand_${playerFacing}_h_r_${playerStep}`;
    const getAnimatedHandVals = (key, axis) => {
        return `${playerLimbAnims.hands[key].from[axis]};${playerLimbAnims.hands[key].to[axis]};${playerLimbAnims.hands[key].from[axis]}`;
    };
    const cx_foot_l = `stand_f_l_${playerStep}`;
    const cx_foot_r = `stand_f_r_${playerStep}`;
    const getAnimatedFootVals = (key, axis) => {
        return `${playerLimbAnims.feet[key].from[axis]};${playerLimbAnims.feet[key].to[axis]};${playerLimbAnims.feet[key].from[axis]}`;
    };

    return(
        <div className={`${css.player} ${playerAnim && css.anim} ${(inTransition === 'u') && css.goingUp} ${(inTransition === 'd') && css.goingDown}`} style={{
            left: `${l}vw`,
            top: `${t}vw`,
            zIndex: z,
            width: `${20 * gameScale}vw`,
            height: `${20 * gameScale}vw`,
        }}>
            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className={`${css.playerSvg} ${stepClasses[playerStep]}`} style={{
                width: `${20 * gameScale}vw`,
                height: `${20 * gameScale}vw`,
            }}>
                <radialGradient id = "face" cx = "25%" cy = "25%" r = "50%">
                    <stop stopColor = "#c492ce" offset = "0%"/>
                    <stop stopColor = "#95659e" offset = "100%"/>
                </radialGradient>
                <linearGradient id="torso" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="3%" style={{ stopColor:'#6eb89b', stopOpacity:1 }} />
                    <stop offset="80%" style={{ stopColor:'#448a6f', stopOpacity:1 }} />
                </linearGradient>
                {
                    playerFacing === 'n' && <>
                        <line x1="8.5" x2="8.5" y1="3.5" y2=".5" stroke="#333" strokeWidth=".5" />
                        <circle cx="8.5" cy=".75" r=".75" fill="#333"/>
                        <path className={`${css.armLeft} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} stroke="#333" strokeWidth=".5" fill="transparent">
                            <animate
                                attributeName="d"
                                values={getAnimatedLimbVals(d_arm_l)}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </path>
                        <circle className={`${css.handLeft} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} cx="4" cy="5" r=".75" fill="#333">
                            <animate
                                attributeName="cx"
                                values={getAnimatedHandVals(cx_hand_l, 'cx')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="cy"
                                values={getAnimatedHandVals(cx_hand_l, 'cy')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </circle>
                        <circle className={`${css.footLeft} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} cx="4" cy="5" r=".75" fill="#333">
                            <animate
                                attributeName="cx"
                                values={getAnimatedFootVals(cx_foot_l, 'cx')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="cy"
                                values={getAnimatedFootVals(cx_foot_l, 'cy')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </circle>
                        <path className={`${css.legLeft} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} stroke="#333" strokeWidth=".5" fill="transparent">
                            <animate
                                attributeName="d"
                                values={getAnimatedLimbVals(d_leg_l)}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </path>
                        <circle className={`${css.footRight} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} cx="4" cy="5" r=".75" fill="#333">
                            <animate
                                attributeName="cx"
                                values={getAnimatedFootVals(cx_foot_r, 'cx')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="cy"
                                values={getAnimatedFootVals(cx_foot_r, 'cy')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </circle>
                        <path className={`${css.legRight} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} stroke="#333" strokeWidth=".5" fill="transparent">
                            <animate
                                attributeName="d"
                                values={getAnimatedLimbVals(d_leg_r)}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </path>
                        <path className={css.torso} d="M 5.0 14.0 C 6.5 17.0 13.5 17.0 15.0 14.0 L 13.5 10.0 Q 10.0 3.5 6.5 10.0 Z" fill="url(#torso)" strokeWidth=".25" stroke="#333"/>
                        <circle className={`${css.face} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} cx="10" cy="5.5" r="4.9"  fill="url(#face)" strokeWidth=".25" stroke="#333" />
                        <path className={`${css.armRight} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} stroke="#333" strokeWidth=".5" fill="transparent">
                            <animate
                                attributeName="d"
                                values={getAnimatedLimbVals(d_arm_r)}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </path>
                        <circle className={`${css.handRight} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} cx="4" cy="5" r=".75" fill="#333">
                            <animate
                                attributeName="cx"
                                values={getAnimatedHandVals(cx_hand_r, 'cx')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="cy"
                                values={getAnimatedHandVals(cx_hand_r, 'cy')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </circle>
                        <path className={`${css.antLeft} ${directionClasses[playerFacing]}`} stroke="#333" strokeWidth=".5" fill="transparent"/>
                        <line x1="13.5" x2="13.5" y1="4.5" y2="1.25" stroke="#333" strokeWidth=".5" />
                        <circle cx="13.5" cy="1.25" r=".75" fill="#333"/>
                        <path className={css.wing} d="M 8.0 10.0 Q 3.0 11.0 7.0 15.0 Z" strokeWidth=".25" />
                        <path className={css.wing} d="M 9.0 10.0 Q 14.0 11.5 9.5 15.5 Z" strokeWidth=".25" />
                    </>
                }

                {
                    playerFacing === 'w' && <>
                        <line x1="12" x2="12" y1="3.5" y2=".5" stroke="#333" strokeWidth=".5" />
                        <circle cx="12" cy="0.75" r=".75" fill="#333"/>
                        <path className={`${css.armRight} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} stroke="#333" strokeWidth=".5" fill="transparent">
                            <animate
                                attributeName="d"
                                values={getAnimatedLimbVals(d_arm_r)}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </path>
                        <circle className={`${css.handRight} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} cx="4" cy="5" r=".75" fill="#333">
                            <animate
                                attributeName="cx"
                                values={getAnimatedHandVals(cx_hand_r, 'cx')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="cy"
                                values={getAnimatedHandVals(cx_hand_r, 'cy')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </circle>
                        <circle className={`${css.footLeft} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} cx="4" cy="5" r=".75" fill="#333">
                            <animate
                                attributeName="cx"
                                values={getAnimatedFootVals(cx_foot_l, 'cx')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="cy"
                                values={getAnimatedFootVals(cx_foot_l, 'cy')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </circle>
                        <path className={`${css.legLeft} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} stroke="#333" strokeWidth=".5" fill="transparent">
                            <animate
                                attributeName="d"
                                values={getAnimatedLimbVals(d_leg_l)}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </path>
                        <circle className={`${css.footRight} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} cx="4" cy="5" r=".75" fill="#333">
                            <animate
                                attributeName="cx"
                                values={getAnimatedFootVals(cx_foot_r, 'cx')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="cy"
                                values={getAnimatedFootVals(cx_foot_r, 'cy')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </circle>
                        <path className={`${css.legRight} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} stroke="#333" strokeWidth=".5" fill="transparent">
                            <animate
                                attributeName="d"
                                values={getAnimatedLimbVals(d_leg_r)}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </path>
                        <path className={`${css.torso} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} fill="url(#torso)" d="M 5.0 14.0 C 6.5 17.0 13.5 17.0 15.0 14.0 L 13.5 10.0 Q 10.0 3.5 6.5 10.0 Z" strokeWidth=".25" stroke="#333"/>
                        <circle className={`${css.face} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} cx="10" cy="6" r="4.9" fill="url(#face)" strokeWidth=".25" stroke="#333" />
                        <path className={`${css.armLeft} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} stroke="#333" strokeWidth=".5" fill="transparent">
                            <animate
                                attributeName="d"
                                values={getAnimatedLimbVals(d_arm_l)}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </path>
                        <circle className={`${css.handLeft} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} cx="4" cy="5" r=".75" fill="#333">
                            <animate
                                attributeName="cx"
                                values={getAnimatedHandVals(cx_hand_l, 'cx')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="cy"
                                values={getAnimatedHandVals(cx_hand_l, 'cy')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </circle>
                        <line x1="7" x2="7" y1="4.25" y2="1.25" stroke="#333" strokeWidth=".5" />
                        <circle cx="7" cy="1.25" r=".75" fill="#333"/>
                        <path className={css.wing} d="M 10.0 11.0 Q 5.5 12.0 9.5 16.0 Z" strokeWidth=".25" />
                        <path className={css.wing} d="M 11.0 11.0 Q 16.0 12.0 11.5 16.0 Z" strokeWidth=".25" />
                    </>
                }

                {
                    playerFacing === 'e' && <>
                        <path className={`${css.armLeft} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} stroke="#333" strokeWidth=".5" fill="transparent" d="M 12,10 C 14,10 16,11 16,14">
                            <animate
                                attributeName="d"
                                values={getAnimatedLimbVals(d_arm_l)}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </path>
                        <circle className={`${css.handLeft} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} cx="4" cy="5" r=".75" fill="#333">
                            <animate
                                attributeName="cx"
                                values={getAnimatedHandVals(cx_hand_l, 'cx')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="cy"
                                values={getAnimatedHandVals(cx_hand_l, 'cy')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </circle>
                        <circle className={`${css.footLeft} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} cx="4" cy="5" r=".75" fill="#333">
                            <animate
                                attributeName="cx"
                                values={getAnimatedFootVals(cx_foot_l, 'cx')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="cy"
                                values={getAnimatedFootVals(cx_foot_l, 'cy')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </circle>
                        <path className={`${css.legLeft} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} stroke="#333" strokeWidth=".5" fill="transparent">
                            <animate
                                attributeName="d"
                                values={getAnimatedLimbVals(d_leg_l)}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </path>
                        <circle className={`${css.footRight} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} cx="4" cy="5" r=".75" fill="#333">
                            <animate
                                attributeName="cx"
                                values={getAnimatedFootVals(cx_foot_r, 'cx')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="cy"
                                values={getAnimatedFootVals(cx_foot_r, 'cy')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </circle>
                        <path className={`${css.legRight} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} stroke="#333" strokeWidth=".5" fill="transparent">
                            <animate
                                attributeName="d"
                                values={getAnimatedLimbVals(d_leg_r)}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </path>
                        <path className={`${css.torso} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} fill="url(#torso)" d="M 5.0 14.0 C 6.5 17.0 13.5 17.0 15.0 14.0 L 13.5 10.0 Q 10.0 3.5 6.5 10.0 Z" strokeWidth=".25" stroke="#333"/>
                        <circle className={`${css.face} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} cx="10" cy="5.5" r="4.9" fill="url(#face)" strokeWidth=".25" stroke="#333" />
                        <circle className={`${css.eyeL} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} cx="10" cy="6" r="1" fill="#333"/>
                        <circle className={`${css.eyeR} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} cx="14" cy="6" r="1" fill="#333"/>
                        <path className={`${css.smile} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} d="M 10, 8 C 11, 9 13,9 13.5, 8" stroke="#333" strokeWidth=".5" fill="transparent"/>
                        <path className={`${css.armRight} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} stroke="#333" strokeWidth=".5" fill="transparent">
                            <animate
                                attributeName="d"
                                values={getAnimatedLimbVals(d_arm_r)}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </path>
                        <circle className={`${css.handRight} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} cx="4" cy="5" r=".75" fill="#333">
                            <animate
                                attributeName="cx"
                                values={getAnimatedHandVals(cx_hand_r, 'cx')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="cy"
                                values={getAnimatedHandVals(cx_hand_r, 'cy')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </circle>
                        <line x1="8.5" x2="8.5" y1="3.5" y2=".5" stroke="#333" strokeWidth=".5" />
                        <circle cx="8.5" cy=".75" r=".75" fill="#333"/>
                        <line x1="14.5" x2="14.5" y1="3.5" y2=".5" stroke="#333" strokeWidth=".5" />
                        <circle cx="14.5" cy="0.75" r=".75" fill="#333"/>
                    </>
                }

                {
                    playerFacing === 's' && <>
                        <path className={`${css.armRight} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} stroke="#333" strokeWidth=".5" fill="transparent">
                            <animate
                                attributeName="d"
                                values={getAnimatedLimbVals(d_arm_r)}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </path>
                        <circle className={`${css.handRight} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} cx="4" cy="5" r=".75" fill="#333">
                            <animate
                                attributeName="cx"
                                values={getAnimatedHandVals(cx_hand_r, 'cx')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="cy"
                                values={getAnimatedHandVals(cx_hand_r, 'cy')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </circle>
                        <circle className={`${css.footLeft} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} cx="4" cy="5" r=".75" fill="#333">
                            <animate
                                attributeName="cx"
                                values={getAnimatedFootVals(cx_foot_l, 'cx')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="cy"
                                values={getAnimatedFootVals(cx_foot_l, 'cy')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </circle>
                        <path className={`${css.legLeft} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} stroke="#333" strokeWidth=".5" fill="transparent">
                            <animate
                                attributeName="d"
                                values={getAnimatedLimbVals(d_leg_l)}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </path>
                        <circle className={`${css.footRight} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} cx="4" cy="5" r=".75" fill="#333">
                            <animate
                                attributeName="cx"
                                values={getAnimatedFootVals(cx_foot_r, 'cx')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="cy"
                                values={getAnimatedFootVals(cx_foot_r, 'cy')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </circle>
                        <path className={`${css.legRight} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} stroke="#333" strokeWidth=".5" fill="transparent">
                            <animate
                                attributeName="d"
                                values={getAnimatedLimbVals(d_leg_r)}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </path>
                        <path className={`${css.torso} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} fill="url(#torso)" d="M 5.0 14.0 C 6.5 17.0 13.5 17.0 15.0 14.0 L 13.5 10.0 Q 10.0 3.5 6.5 10.0 Z" strokeWidth=".25" stroke="#333"/>
                        <circle className={`${css.face} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} cx="10" cy="5.5" r="4.9" fill="url(#face)" strokeWidth=".25" stroke="#333" />
                        <circle className={`${css.eyeL} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} cx="6" cy="6" r="1" fill="#333"/>
                        <circle className={`${css.eyeR} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} cx="10" cy="6" r="1" fill="#333"/>
                        <path className={`${css.smile} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} d="M 6.5, 8 C 7,9 9,9 9.5,8" stroke="#333" strokeWidth=".5" fill="transparent"/>
                        <path className={`${css.armLeft} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} stroke="#333" strokeWidth=".5" fill="transparent">
                            <animate
                                attributeName="d"
                                values={getAnimatedLimbVals(d_arm_l)}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </path>
                        <circle className={`${css.handLeft} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} cx="4" cy="5" r=".75" fill="#333">
                            <animate
                                attributeName="cx"
                                values={getAnimatedHandVals(cx_hand_l, 'cx')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="cy"
                                values={getAnimatedHandVals(cx_hand_l, 'cy')}
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </circle>
                        <line x1="5.5" x2="5.5" y1="3.5" y2=".5" stroke="#333" strokeWidth=".5" />
                        <circle cx="5.5" cy=".75" r=".75" fill="#333"/>
                        <line x1="11" x2="11" y1="3.5" y2=".5" stroke="#333" strokeWidth=".5" />
                        <circle cx="11" cy="0.75" r=".75" fill="#333"/>
                    </>
                }

            </svg>
        </div>
    )
};
Player.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    calcXPos: PropTypes.func.isRequired,
    calcYPos: PropTypes.func.isRequired,
    calcZPos: PropTypes.func.isRequired,
    gameScale: PropTypes.number.isRequired,
    playerFacing: PropTypes.string.isRequired,
    playerStep: PropTypes.number.isRequired,
    inTransition: PropTypes.string.isRequired,
    maxZ: PropTypes.number.isRequired,
    playerAnim: PropTypes.bool.isRequired,
};

export default Player;
