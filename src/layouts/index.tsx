import * as React from 'react';

interface ILayoutsProps {
}

const Layouts: React.FunctionComponent<ILayoutsProps> = ({
  children
}) => {
  return (
    <div className='layout'>
      <div className='layout'></div>
    </div>
  );
};

export default Layouts;
