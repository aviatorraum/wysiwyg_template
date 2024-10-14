export const COMPONENT_TYPE = {
  TEXT: 'text',
  IMAGE: 'image',
};

export const EDIT_STATUS = {
  EDIT_TEXT: COMPONENT_TYPE.TEXT,
  EDIT_IMAGE: COMPONENT_TYPE.IMAGE,
  DRAGABLE: 'dragable',
};

export const COMPONENT_LIST = [
  {
    id: 1,
    name: 'Text Component',
    type: COMPONENT_TYPE.TEXT,
    content: 'Hello World',
  },
  {
    id: 2,
    name: 'Image Component',
    type: COMPONENT_TYPE.IMAGE,
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
    width: '100px',
    height: '100px',
  },
];
