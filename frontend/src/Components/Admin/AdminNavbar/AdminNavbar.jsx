import React from 'react'
import './AdminNavbar.css'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import { Avatar } from "@mui/material";
import { useSelector } from 'react-redux';
import withAuth from '../../../hoc/withAuth';

function AdminNavbar() {

  const user = useSelector(state => state.auth.token);

  return (
    <div className="adminNavbar">
      <div className="navbaritem">
        <NotificationsActiveOutlinedIcon className='notficationIcon' />
          <Avatar
                src="https://img.freepik.com/premium-vector/user-icon_126283-435.jpg?w=2000"
                alt="Profile Picture"
                sx={{ width: 40, height: 40 }}
              />
            <span>{user && user.firstName}</span>
      </div>
    </div>
  )
}

export default withAuth(AdminNavbar)