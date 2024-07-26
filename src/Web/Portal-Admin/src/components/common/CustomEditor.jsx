import {ContentState, convertFromHTML, convertToRaw, EditorState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {useEffect, useState} from 'react';
import {Editor} from 'react-draft-wysiwyg';

const CustomEditor = ({
  initEditorState = '',
  customWrapperStyle = {},
  customEditorStyle = {},
  callback,
  ...props
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (initEditorState) {
      const blocksFromHTML = convertFromHTML(initEditorState);
      const newContentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setEditorState(EditorState.createWithContent(newContentState));
    }
  }, [initEditorState]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleBlur = (event, editorState) => {
    let content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    if (callback) callback(content);
  };

  return (
    <Editor
      wrapperStyle={{
        // minHeight: 450,
        ...customWrapperStyle,
      }}
      editorStyle={{
        minHeight: 376,
        paddingLeft: 5,
        border: '1px solid #f1f1f1',
        ...customEditorStyle,
      }}
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      onBlur={handleBlur}
      {...props}
    />
  );
};

export default CustomEditor;
