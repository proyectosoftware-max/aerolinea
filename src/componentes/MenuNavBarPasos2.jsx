import { Container, Navbar, Nav } from 'react-bootstrap';
import { useState } from 'react';
import logo from '../material/logo.png';
import unoAprobado from '../material/1aprobado.jpg';
import dosResaltado from '../material/2resaltado.jpg';
import tres from '../material/3.jpg';
import icono_idioma from '../material/icono_idioma.jpg';
import logoMovil from '../material/movil/iconoMovil.png';
import SegundoPasoMovil from '../material/movil/SegundoPasoMovil.jpg';




/* https://www.avianca.com/es/booking/select/?origin1=BAQ&destination1=MDE&departure1=2024-09-02&adt1=1&tng1=0&chd1=0&inf1=0&currency=COP&posCode=CO */

const MenuNavBar = () => {

  const [language, setLanguage] = useState('Español');

  const idioma = (event) => {
    setLanguage(event.target.value);
  };



  return (
    <>
     
      <Navbar className={'navbarEscritorioPasos'} expand="lg" fixed='top'>
      <Container className='container1'>
          <Navbar.Brand href="" className='navbar-brand'>
            <img src={logo}  className='logo' />
            <img src={icono_idioma}/>
            <select style={{border:'none', outline:'none', borderRadius:'300px'}} value={language} onChange={idioma}>
           <option style={{border:'none'}}>Español</option>
          </select>
          </Navbar.Brand>
          <Navbar.Collapse id="bascic navbar-nav">
            <Nav className='flex-column'>
              <div className="nav1" >
                <img src={unoAprobado}/>
                <label className='label_seleccion'>Selección de vuelos</label>
                <img src={dosResaltado}/>
                <label className='label_viaje' style={{fontWeight:'bold'}} >Personaliza tu viaje</label>
                <img src={tres}/>
                <label className='label_pago'>Pagos</label>
              </div>
            
            </Nav>
          </Navbar.Collapse>

        </Container>

        
      </Navbar>

      <Navbar className={'navbarMovilPasos'} expand="lg" fixed='top'>
        <Container className='containerNavBar'>
          <Navbar.Brand href="" className='navbarBrandMovilPasos'>
            <img src={logoMovil} className='logo' />
            <div className="navPasoMovil" >
                <img src={SegundoPasoMovil} style={{width:'120px'}}/>
             </div>
           </Navbar.Brand>
        </Container>
      </Navbar>

     
   
      
    </>
  );
}

export default MenuNavBar;

