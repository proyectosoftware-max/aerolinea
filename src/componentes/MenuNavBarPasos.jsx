import { Container, Navbar, Nav } from 'react-bootstrap';
import logo from '../material/logo.png';
import uno from '../material/1.jpg';
import dos from '../material/2.jpg';
import tres from '../material/3.jpg';





/* https://www.avianca.com/es/booking/select/?origin1=BAQ&destination1=MDE&departure1=2024-09-02&adt1=1&tng1=0&chd1=0&inf1=0&currency=COP&posCode=CO */

const MenuNavBar = () => {




  return (
    <>
     
      <Navbar className={'navbarEscritorioPasos'} expand="lg" fixed='top'>
      <Container className='container1'>
          <Navbar.Brand href="" className='navbar-brand'>
            <img src={logo}  className='logo' />
          </Navbar.Brand>
          <Navbar.Collapse id="bascic navbar-nav">
            <Nav className='flex-column'>
              <div className="nav1" >
                <img src={uno}/>
                <label className='label_seleccion'>Selección de vuelos</label>
                <img src={dos}/>
                <label className='label_viaje'>Personaliza tu viaje</label>
                <img src={tres}/>
                <label className='label_pago'>Pagos</label>
              </div>
            
            </Nav>
          </Navbar.Collapse>

        </Container>

        
      </Navbar>

     
   
      
    </>
  );
}

export default MenuNavBar;

