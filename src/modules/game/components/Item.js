import React from 'react';
import PropTypes from 'prop-types';
import css from '../css/item.module.scss'

export const Item = ({item, calcXPos, calcYPos, calcZPos, gameScale, numNoodles, maxNoodles}) => {
    const x = item.x;
    const y = item.y;
    const l = calcXPos(x, y, true, 20 * gameScale, 20 * gameScale, gameScale);
    const t = calcYPos(x, y, true, 20 * gameScale, 20 * gameScale, gameScale) + 1.5;
    const z = calcZPos(x, y);
    if (x === 12 && y === 13) {
        console.log('rendering', item.objType);
    }
    let guageColor = '#c92828';
    const percComplete = numNoodles / maxNoodles * 100;
    if (percComplete > 40) {
        guageColor = '#d49522';
    }
    if (percComplete > 85) {
        guageColor = '#3da641';
    }
    const guageBits = [1,2,3,4,5,6,7,8,9,10];
    return(
        <div className={`${css.item} ${css[item.objType]}`} style={{
            left: `${l}vw`,
            top: `${t}vw`,
            zIndex: z,
            width: `${20 * gameScale}vw`,
            height: `${20 * gameScale}vw`,
        }}>
            <img src={`/images/items/${item.objType}.svg`} alt={item.objType} />
            {
                (item.objType === 'bowl') && <div className={css.bowlGuage} >
                    <div className={css.guage}>
                        {
                            guageBits.map((item, idx) =>
                                <div
                                    key={idx}
                                    className={`${css.guageBit} ${(percComplete > item * 10 || percComplete === item * 10) && css.active}`}
                                    style={{
                                        backgroundColor: guageColor,
                                        left: `${(item - 1) * 10}%`
                                    }}
                                />
                            )
                        }
                    </div>
                    <div className={css.guageE}>E</div>
                    <div className={css.guageF}>F</div>
                </div>
            }
        </div>
    )
};
Item.propTypes = {
    item: PropTypes.objectOf(PropTypes.any).isRequired,
    calcXPos: PropTypes.func.isRequired,
    calcYPos: PropTypes.func.isRequired,
    calcZPos: PropTypes.func.isRequired,
    gameScale: PropTypes.number.isRequired,
    maxNoodles: PropTypes.number.isRequired,
};

const M_Item = React.memo(Item);
export default M_Item;
