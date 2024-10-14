import { useCallback } from 'react';

export const ImageEditor = ({ data, onUpdate }) => {
  return (
    <div className='flex flex-col space-y-2'>
      <InputText
        name='url'
        type='url'
        label='URL'
        value={data.url}
        onUpdate={onUpdate}
      />
      <InputText
        name='width'
        type='text'
        label='Width'
        value={data.width}
        onUpdate={onUpdate}
      />
      <InputText
        name='height'
        type='text'
        label='Height'
        value={data.height}
        onUpdate={onUpdate}
      />
    </div>
  );
};

const InputText = ({ name, label, type, value, onUpdate }) => {
  const onChange = useCallback(
    (e) => {
      onUpdate(name, e.target.value);
    },
    [name, onUpdate]
  );
  return (
    <div className='flex flex-row'>
      <label className='w-full mr-2'>{label}</label>
      <input name={name} type={type} value={value} onChange={onChange} />
    </div>
  );
};
