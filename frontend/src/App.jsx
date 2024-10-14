import { useState, useCallback, memo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ListItem } from './components/ListItem.jsx';
import { DropArea } from './components/DropArea.jsx';
import { TextEditor } from './components/TextEditor.jsx';
import { ImageEditor } from './components/ImageEditor.jsx';
import { EDIT_STATUS, COMPONENT_LIST } from './constant.js';

const App = () => {
  const [resultItems, setResultItems] = useState([]);
  const [status, setStatus] = useState(EDIT_STATUS.DRAGABLE);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const onClickDrop = useCallback(
    (item) =>
      setResultItems((r) => {
        const existItems = r.find((i) => i.id === item.id);
        if (existItems) {
          // alert('Already Exist');
          return [
            ...r,
            { ...item, id: r.length < 2 ? r.length + 2 : r.length + 1 },
          ];
        }
        return [...r, item];
      }),
    [setResultItems]
  );

  const onClickComponent = useCallback(
    (s, i) => {
      setStatus(s);
      setSelectedIndex(i);
    },
    [setStatus, setSelectedIndex]
  );

  const onUpdate = useCallback(
    (name, value) => {
      if (selectedIndex > -1) {
        setResultItems((r) => {
          let newResultItems = r;
          newResultItems[selectedIndex][name] = value;
          return [...newResultItems];
        });
      }
    },
    [selectedIndex, setResultItems]
  );

  return (
    <div className='flex flex-1 w-screen h-screen overflow-scroll'>
      <DndProvider backend={HTML5Backend}>
        <div className='w-1/2 border-r-2 border-black flex flex-col justify-center items-center'>
          {status === EDIT_STATUS.DRAGABLE &&
            COMPONENT_LIST.map((item) => (
              <ListItem key={item.id} data={item} />
            ))}
          <form>
            {status === EDIT_STATUS.EDIT_TEXT && (
              <TextEditor
                name='content'
                onUpdate={onUpdate}
                data={resultItems[selectedIndex]}
              />
            )}
            {status === EDIT_STATUS.EDIT_IMAGE && (
              <ImageEditor
                data={resultItems[selectedIndex]}
                onUpdate={onUpdate}
              />
            )}
          </form>
          {status !== EDIT_STATUS.DRAGABLE ? (
            <button
              className='mt-4'
              onClick={() => setStatus(EDIT_STATUS.DRAGABLE)}
            >
              Back to add component
            </button>
          ) : null}
        </div>
        <div className='w-1/2 flex flex-col'>
          <FixedHader />
          <DropArea
            data={resultItems}
            onDrop={onClickDrop}
            onClickComponent={onClickComponent}
          />
        </div>
      </DndProvider>
    </div>
  );
};

const FixedHader = memo(() => (
  <div className='absolute top-0 flex justify-center items-center p-4 h-10 w-1/2'>
    Fixed Header
  </div>
));

export default App;
