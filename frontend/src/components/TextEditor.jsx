import { useCallback } from 'react';
import Editor from 'react-simple-wysiwyg';

export const TextEditor = ({ name, data, onUpdate }) => {
  const onChange = useCallback(
    (e) => {
      onUpdate(name, e.target.value);
    },
    [name, onUpdate]
  );

  return (
    <Editor
      containerProps={{
        style: { backgroundColor: 'white', color: 'black', height: '500px' },
      }}
      onChange={onChange}
      value={data[name]}
    />
  );
};
