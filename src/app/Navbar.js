import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  fetchNotifications,
  selectAllNotifications 
} from '../features/notifications/notificationSlice';

export const Navbar = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectAllNotifications);
  const numUndreadNotifications = notifications.filter(n => !n.read).length;

  const notificationsBadge = numUndreadNotifications > 0
    ? <span className='badge'>{numUndreadNotifications}</span>
    : null;

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications());
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to='/'>Posts</Link>
            <Link to='/users'>Users</Link>
            <Link to='/notifications'>
              Notifications {notificationsBadge}
            </Link>
          </div>
          <button className='button' onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}
