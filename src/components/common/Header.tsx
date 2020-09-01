import React from 'react';
import { useSelector } from 'react-redux';
import { IState } from '../../redux/reducer';
import { Link } from 'react-router-dom';

interface Props {

}

const Header: React.FC<Props> = (props: Props) => {

  const { username } = useSelector((state: IState) => state);

  return (
    <header className="header">
      <div className="nav">
        <Link to="/">
          <div className="nav-left clickable">
            Roommate Finder
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;