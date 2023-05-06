import React from 'react';
import { IconButton, Badge } from '@material-ui/core';
import PropTypes from 'prop-types';
import css from '../css/hud.module.scss';

const Inventory = ({ inventoryItems, handleInventoryClick }) => {
    const invItemsStripped = inventoryItems.map((item) => item.objType);
    // eslint-disable-next-line
    const groupedInvItems = invItemsStripped.reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), Object.create(null));
    return (
        <div className={css.inventory}>
            {
                Object.keys(groupedInvItems).map((item, idx) =>
                    <IconButton
                        key={idx}
                        className={css.invItem}
                        onClick={() => handleInventoryClick(item)}
                        style={{ top: (idx) * 70 + 20 }}
                        tabIndex={-1}
                    >
                        <Badge badgeContent={groupedInvItems[item]} color="primary" className={`${css.badge} ${(groupedInvItems[item] > 1) && css.active}`}>
                            <img src={`/images/items/full/${item}.svg`} alt={item} />
                        </Badge>
                    </IconButton>
                )
            }
        </div>
    )
};

Inventory.propTypes = {
    inventoryItems: PropTypes.arrayOf(PropTypes.any).isRequired,
    handleInventoryClick: PropTypes.func.isRequired,
};

export default Inventory;
