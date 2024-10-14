import { memo, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { EDIT_STATUS, COMPONENT_TYPE } from '../constant';

export const DropArea = memo(({ data, onDrop, onClickComponent }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: EDIT_STATUS.DRAGABLE,
    drop(_item, monitor) {
      const target = monitor.getItem();
      if (monitor.canDrop()) onDrop(target);
      return undefined;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  let backgroundColor = '#8c5d';
  if (isActive) {
    backgroundColor = '#1c8a5d';
  } else if (canDrop) {
    backgroundColor = '#8c8a5d';
  }

  const containsHTML = useCallback((s) => /<[a-z][\s\S]*>/i.test(s), []);

  return (
    <div
      ref={drop}
      className='relative flex flex-col justify-start items-center mt-10 h-full w-full overflow-scroll space-y-2'
      style={{ backgroundColor }}
    >
      <h3 className='m-20'>
        {isActive ? 'Release to drop' : 'Drag an component here'}
      </h3>
      {data.map((item, index) =>
        item.type === COMPONENT_TYPE.TEXT ? (
          <div
            onClick={() => onClickComponent(EDIT_STATUS.EDIT_TEXT, index)}
            className='cursor-pointer border-2 hover:border-4 hover:border-white hover:shadow-2xl p-2'
            key={item.id}
          >
            {containsHTML(item.content) ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: item.content,
                }}
              />
            ) : (
              item.content
            )}
          </div>
        ) : (
          <div
            onClick={() => onClickComponent(EDIT_STATUS.EDIT_IMAGE, index)}
            className='cursor-pointer hover:border-2 hover:border-white hover:shadow-2xl'
            key={item.id}
          >
            <img
              src={item.url}
              alt={item.name}
              style={{ width: item.width, height: item.height }}
            />
          </div>
        )
      )}
    </div>
  );
});
