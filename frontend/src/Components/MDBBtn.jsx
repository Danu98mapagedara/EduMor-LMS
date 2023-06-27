<MDBBtn 
  color='link' 
  rounded 
  size='sm' 
  style={{ 
    backgroundColor: 'transparent', 
    border: '1px solid blue', 
    color: 'blue', 
    transition: 'all 0.3s', 
    fontWeight: 'bold' 
  }} 
  onMouseOver={(e) => {
    e.target.style.backgroundColor = 'blue';
    e.target.style.color = 'white';
    e.target.style.fontSize = '1.2rem';
  }}
  onMouseOut={(e) => {
    e.target.style.backgroundColor = 'transparent';
    e.target.style.color = 'blue';
    e.target.style.fontSize = '1rem';
  }}
>
  Edit
</MDBBtn>





