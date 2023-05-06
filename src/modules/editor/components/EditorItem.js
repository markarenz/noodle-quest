import React from 'react';
import css from '../css/editor.module.scss';

const EditorItem = ({ item, handleItemClick, editorMode }) => {
    const l = (item.x * 50);
    const t = (item.y * 50);
    return(
        <div className={`${css.editorItem} ${editorMode === 2 && css.active}`} style={{
            left: l,
            top: t,
        }}>
            <img
                src={`/images/items/${item.objType}.svg`}
                alt={item.objType}
                className={css.editorItemImg}
                onClick={() => handleItemClick(item)}
            />
        </div>
    )
}

export default EditorItem;
