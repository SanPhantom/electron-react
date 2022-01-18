import * as React from 'react';
import { Link } from 'react-router-dom';

interface IAsideProps {
}

const Aside: React.FunctionComponent<IAsideProps> = (props) => {

  const menu = [
    {id: 'menu-1', to: '/', title: 'About US'},
    {id: 'menu-2', to: '/excel2json', title: 'Excel to Json'}
  ]

  return (
    <div className='aside-content'>
      <ul>
        {
          menu.map((item, index) => (
            <li key={item.id}>
              <Link to={item.to}>{item.title}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default Aside;
