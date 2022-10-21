import React from 'react';

import PropTypes from 'prop-types';
import Blocks from 'editorjs-blocks-react-renderer';

function ListOfNotes({
  notes,
  removeNote,
  delBtnName,
  setNoteId,
  classes,
  delBtnIcon,
  isShowDate,
  isShowText,
  dateOptions,
}) {
  return (
    <div className={classes.wrapper}>
      {notes.map((el) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div key={el.id} className={classes.item} onClick={() => setNoteId(el.id)}>
          <div className={classes.title}>{el.title}</div>
          {isShowText && (
            <div className={classes.text}>
              <Blocks data={el.data} />
            </div>
          )}

          <button
            className={classes.delBtn}
            onClick={(e) => {
              e.stopPropagation();
              removeNote(el.id);
            }}
          >
            {delBtnName && <div className={classes.delBtnText}>{delBtnName}</div>}
            {delBtnIcon && <div className={classes.delBtnIcon}>{delBtnIcon}</div>}
          </button>
          {isShowDate && el.created_at && (
            <div className={classes.date}>
              {new Date(el.created_at).toLocaleString('ru', dateOptions)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

ListOfNotes.defaultProps = {
  notes: [],
  classes: {},
  dateOptions: {},
  isShowDate: false,
  isShowText: false,
  delBtnName: '',
  title: 'untitled',
  setNoteId: () => {},
};

ListOfNotes.propTypes = {
  classes: PropTypes.shape({
    /** class for wrapper */
    wrapper: PropTypes.string,
    /** class for redactor */
    redactor: PropTypes.string,
    /** class for title */
    title: PropTypes.string,
    /** class to preview each note */
    item: PropTypes.string,
    /** class for delBtn */
    delBtn: PropTypes.string,
    /** class for delBtnIcon */
    delBtnIcon: PropTypes.string,
    /** class for date */
    date: PropTypes.string,
    /** class for text */
    text: PropTypes.string,
  }),
  /** you can change the date representation (https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) */
  dateOptions: PropTypes.object,
  /** delete button text */
  delBtnName: PropTypes.string,
  /** note title in preview */
  title: PropTypes.string,
  /** an array of existing notes. Required to display a list of notes */
  notes: PropTypes.array,
  /** pass the id of the selected note to the setter */
  setNoteId: PropTypes.func,
  /** if true, display note creation date during note preview */
  isShowDate: PropTypes.bool,
  /** if true, display note text during note preview */
  isShowText: PropTypes.bool,
};

export default ListOfNotes;
