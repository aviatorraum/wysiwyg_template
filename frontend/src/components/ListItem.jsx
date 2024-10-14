import { memo } from 'react';
import { useDrag } from 'react-dnd';
import { EDIT_STATUS } from '../constant';

export const ListItem = memo(({ data }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: EDIT_STATUS.DRAGABLE,
    item: data,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <div
      ref={drag}
      className='h-10 border-2 border-black mb-4 flex justify-center items-center p-4'
      style={{ opacity: isDragging ? 0.4 : 1 }}
    >
      {data.name}
    </div>
  );
});
