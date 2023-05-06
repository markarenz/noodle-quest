import React from 'react';
import css from '../css/home.module.scss';
import PropTypes from 'prop-types';

const Noodle = ({ delay}) => {
    const [initialized, setInitialized] = React.useState(false);
    const [x, setX] = React.useState( Math.random()*80);
    const [y, setY] = React.useState( Math.random()*80);
    const [s, setS] = React.useState( Math.random()*16 + 8);
    const l = `${x}%`;
    const t = `${y}%`;
    const w = `${s}vw`;
    React.useEffect(() => {
        const initInterval = setInterval(() => {
            setInitialized(true);
            clearInterval(initInterval);
        }, delay * 1000);
        return () => clearInterval(initInterval);
    }, [delay]);
    React.useEffect(() => {
        const interval = setInterval(() => {
            setX(Math.random()*80);
            setY(Math.random()*80);
            setS(Math.random()*16 + 8);
        }, 8000);
        return () => clearInterval(interval);
    }, [initialized]);
    if (!initialized){
        return null;
    }
    return(
        <img
            src="/images/home/noodle.svg"
            alt="noodle"
            className={`${css.noodle} ${css.noodle1}`}
            style={{
                top: t,
                left: l,
                width: w,
            }}
        />
    )
};

Noodle.propTypes = {
    delay: PropTypes.number.isRequired,
};

export default Noodle;
