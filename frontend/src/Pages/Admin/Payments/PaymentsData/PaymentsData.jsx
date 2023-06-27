
import React, { useEffect, useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBadge } from 'mdb-react-ui-kit';
import Adminpaymentsdata from '../../../../Data/Adminpaymentsdata';
import defaultUser from '../../../../Assets/defaultUser.png';
import axios from 'axios';

export default function PaymentsData() {
  const [list, setList] = useState([]);
  const [premiumUsers, setPremiumUsers] = useState([]);

  function removeList(index) {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  }

  useEffect(() => {
    const fetchPremiumUsers = async () => {
      try {
        const response = await axios.get('auth/premiumUsers'); // Replace '/api/premiumUsers' with your actual API endpoint
        setPremiumUsers(response.data);
      } catch (error) {
        console.error('Error retrieving premium users:', error);
      }
    };

    fetchPremiumUsers();
  }, []);

  useEffect(() => {
    setList(Adminpaymentsdata);
  }, []);

  return (
    <MDBTable align='middle' style={{ marginLeft: '100px', marginTop: '20px' }}>
      <MDBTableHead>
        <tr style={{ color: '#646a85' }}>
          <th scope='col' style={{ color: 'red' }}>
            Card Holder Name
          </th>
          <th scope='col' style={{ color: 'red',paddingLeft:'60px' }}>
            Email
          </th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {list.map(({ CardholderName,Email }, index) => {
          return (
            <tr key={index}>
              <td>
                <div className='d-flex align-items-center'>
                  <img
                    src={defaultUser}
                    alt=''
                    style={{ width: '45px', height: '45px' }}
                    className='rounded-circle'
                  />
                  <div className='ms-3'>
                    <p className='fw-bold mb-1' style={{ color: '#041083', cursor: 'pointer' }}>
                      {CardholderName}
                    </p>
                  </div>
                </div>
              </td>

              <td>
                <div className='d-flex align-items-center'>
                  <div className='ms-3'>
                    <p className='fw-bold mb-1' style={{ color: '#041083', cursor: 'pointer' }}>
                      {Email}
                    </p>
                  </div>
                </div>
              </td>
              <td>
               
              </td>
            </tr>
          );
        })}
      </MDBTableBody>
    </MDBTable>
  );
}