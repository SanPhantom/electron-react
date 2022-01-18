import * as React from 'react';
import Aside from './Aside';
import './index.scss'

interface ILayoutsProps {
}

const Layouts: React.FunctionComponent<ILayoutsProps> = ({
  children
}) => {
  return (
    <div className='layout'>
      <div className='aside'>
        <Aside></Aside>
      </div>
      <div className='container'>
        {children}
      </div>
    </div>
  );
};

export default Layouts;
