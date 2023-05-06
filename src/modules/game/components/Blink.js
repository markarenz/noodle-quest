import React from 'react';
import css from "../css/blink.module.scss";
import blinkAnims from "../../../data/blinkAnims";
import PropTypes from 'prop-types';

const Blink = ({ x, y, blinkHash, gameScale, calcXPos, calcYPos, calcZPos }) => {
    const [isActive, setIsActive] = React.useState(false);
    React.useEffect(() => {
        // every time value changes, set blink to true, then reset .5s later
        if (blinkHash !== ''){
            setIsActive(true);
            const blinkTimer = setTimeout(() => {
                setIsActive(false);
            }, 600);
            return () => clearTimeout(blinkTimer);
        }
    }, [blinkHash]);
    const l = calcXPos(x, y, true, 20 * gameScale, 20 * gameScale, gameScale);
    const t = calcYPos(x, y, true, 20 * gameScale, 20 * gameScale, gameScale);
    const z = calcZPos(x, y);

    const getPatValues = (key) => {
        return `${blinkAnims[key].from};${blinkAnims[key].mid};${blinkAnims[key].to}`
    };
    const nums = [1,2,3,4,5,6,7,8];
    const blinkClasses = [css.blink1, css.blink2, css.blink3, css.blink4, css.blink5, css.blink6, css.blink7, css.blink8];
    return (
        <div
            className={css.blink}
            style={{
                left: `${l}vw`,
                top: `${t}vw`,
                zIndex: z,
                width: `${20 * gameScale}vw`,
                height: `${20 * gameScale}vw`,
            }}>
            {
                isActive && <div className={css.blink}>
                    <svg version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={css.blinkWrap}>
                        {
                            nums.map((num, idx) =>
                                <path key={idx} className={`${css.blinklet} ${blinkClasses[idx]}`}>
                                    <animate
                                        attributeName="d"
                                        attributeType="XML"
                                        values={getPatValues(`blink${num}`)}
                                        dur="0.2s"
                                        repeatCount="0"
                                    />
                                </path>
                            )

                        }
                    </svg>
                </div>
            }
        </div>
    )
};

Blink.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    blinkHash: PropTypes.string.isRequired,
};

export default Blink;
