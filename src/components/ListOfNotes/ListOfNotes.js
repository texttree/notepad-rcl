import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Blocks from 'editorjs-blocks-react-renderer';

function ListOfNotes({
  notes,
  removeNote,
  setNoteId,
  classes,
  style,
  delBtnChildren,
  isShowDate,
  isShowText,
  isShowDelBtn,
  dateOptions,
  editNoteTitle,
  isRtl,
}) {
  const [editingTitle, setEditingTitle] = useState(null);

  const handleClick = (id) => {
    setNoteId(id);
  };

  const handleRemoveNote = (e, id) => {
    e.stopPropagation();
    removeNote(id);
  };

  const handleTitleClick = (e, id) => {
    e.stopPropagation();
    if (!editNoteTitle) {
      setNoteId(id);
    }
  };

  const direction = isRtl ? 'rtl' : 'ltr';

  return (
    <div className={classes?.wrapper} style={style?.wrapper}>
      {notes?.map((note) => (
        <div
          key={note.id}
          className={classes?.item}
          style={style?.item}
          onClick={() => handleClick(note.id)}
          dir={direction}
        >
          <div
            className={classes?.titleBlock}
            style={style?.titleBlock}
            onClick={(e) => handleTitleClick(e, note.id)}
          >
            {editNoteTitle && editingTitle === note.id ? (
              <input
                autoFocus
                type="text"
                defaultValue={note.title}
                style={style?.renameInput}
                className={classes?.renameInput}
                onBlur={() => setEditingTitle(null)}
                onFocus={(e) => e.currentTarget.select()}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setEditingTitle(null);
                  if (e.key === 'Enter') {
                    editNoteTitle(note.id, e.target.value);
                    setEditingTitle(null);
                  }
                }}
              />
            ) : (
              <div
                className={classes?.title}
                style={style?.title}
                onDoubleClick={() => setEditingTitle(note.id)}
              >
                {note.title}
              </div>
            )}
          </div>
          {isShowText && (
            <div className={classes?.text} style={style?.text}>
              <Blocks data={note.data} />
            </div>
          )}

          {isShowDelBtn && (
            <button
              className={classes?.delBtn}
              style={style?.delBtn}
              onClick={(e) => handleRemoveNote(e, note.id)}
            >
              {delBtnChildren}
            </button>
          )}

          {isShowDate && note.created_at && (
            <div className={classes?.date} style={style?.date}>
              {new Date(note.created_at).toLocaleString('ru', dateOptions)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

ListOfNotes.defaultProps = {
  editNoteTitle: null,
  notes: [],
  style: {},
  classes: {},
  dateOptions: {},
  isShowDate: false,
  isShowText: false,
  isShowDelBtn: false,
  title: 'untitled',
  delBtnChildren: 'Delete',
  setNoteId: () => {},
  isRtl: false,
};

ListOfNotes.propTypes = {
  /** component styles */
  style: PropTypes.shape({
    /** style for wrapper */
    wrapper: PropTypes.object,
    /** style to preview each note */
    item: PropTypes.object,
    /** style for titleBlock */
    titleBlock: PropTypes.object,
    /** style for title */
    title: PropTypes.object,
    /** style for the input field when renaming */
    renameInput: PropTypes.object,
    /** style for text */
    text: PropTypes.object,
    /** style for delBtn */
    delBtn: PropTypes.object,
    /** style for date */
    date: PropTypes.object,
  }),
  /** function to edit the title of a note */
  editNoteTitle: PropTypes.func,
  classes: PropTypes.shape({
    /** class for wrapper */
    wrapper: PropTypes.string,
    /** class for titleBlock */
    titleBlock: PropTypes.string,
    /** class for title */
    title: PropTypes.string,
    /** class to preview each note */
    item: PropTypes.string,
    /** class for delBtn */
    delBtn: PropTypes.string,
    /** class for date */
    date: PropTypes.string,
    /** class for text */
    text: PropTypes.string,
  }),
  /** you can change the date representation (https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) */
  dateOptions: PropTypes.object,
  /** note title in preview */
  title: PropTypes.string,
  /** an array of existing notes. Required to display a list of notes */
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      data: PropTypes.object,
      created_at: PropTypes.instanceOf(Date),
    })
  ),
  /** function to remove a note */
  removeNote: PropTypes.func,
  /** pass the id of the selected note to the setter */
  setNoteId: PropTypes.func,
  /** if true, display delete button for each note */
  isShowDelBtn: PropTypes.bool,
  /** content of the delete button */
  delBtnChildren: PropTypes.node,
  /** if true, display note creation date during note preview */
  isShowDate: PropTypes.bool,
  /** if true, display note text during note preview */
  isShowText: PropTypes.bool,
  /** if true, display note, title and date in rtl direction */
  isRtl: PropTypes.bool,
};
export default ListOfNotes;
