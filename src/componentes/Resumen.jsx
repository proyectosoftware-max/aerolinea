import React, { useState, useEffect, useContext } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuNavBar from './MenuNavBarPasos.jsx';
import PiePagina from './PiePagina.jsx';
import { DataContext } from './Context';
import datos from './vuelos.json';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import imagen_opcion from '../material/opcion.jpg';
import raya_avion from '../material/raya_avion2.jpg';
import equipaje from '../material/equipaje.jpg';
import iconoAvion from '../material/iconoAvion.jpg';
import logoAviancaResumen from '../material/logoAviancaResumen.jpg';
import escudo from '../material/escudo.jpg';
import success from '../material/success.jpg';
import barraVertical from '../material/barraVertical.jpg';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Popover from '@mui/material/Popover';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

const monthMap = {
  'ene': 'Ene',
  'feb': 'Feb',
  'mar': 'Mar',
  'abr': 'Abr',
  'may': 'May',
  'jun': 'Jun',
  'jul': 'Jul',
  'ago': 'Ago',
  'sep': 'Sept',
  'oct': 'Oct',
  'nov': 'Nov',
  'dic': 'Dic'
};

const formatDate = (date) => {
  // Formato corto del día de la semana, número del día y mes
  const formattedDate = dayjs(date).format('ddd D MMM YYYY'); // Ej: "Thu 12 Sep"

  // Separar el formato en partes
  let [weekday, day, monthAbbreviation, year] = formattedDate.split(' ');

  // Eliminar cualquier punto en el día de la semana (si existe)
  weekday = weekday.replace('.', '');

  // Capitalizar la primera letra del día de la semana
  const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);

  // Mapea la abreviación del mes al español usando el mapa personalizado
  const capitalizedMonth = monthMap[monthAbbreviation.toLowerCase()] || monthAbbreviation;

  // Retorna el formato final, por ejemplo "Jue, 12 Sept"
  return `${capitalizedWeekday}, ${capitalizedMonth} ${day}, ${year} `;
};



const Resumen = () => {

  const { selectedDate, origen, destino, setPrecio } = useContext(DataContext);
  const [open, setOpen] = React.useState(false);
  const { corigen, cdestino, ida, vuelta, tiempo, precio, salida, llegada, ao, ad } = useParams();
  const [origenNormal, setOrigenNormal] = useState('');
  const [destinoNormal, setDestinoNormal] = useState('');
  const [nombre, setNombre] = useState('nombre');
  const [apellido, setApelldio] = useState('apellido');
  const [telefono, setTelefono] = useState('telefono');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();



  const handleClose = () => {
    setOpen(false);
  };



  useEffect(() => {
    localStorage.setItem('precio', setPrecio(precio));
  }, [precio]);

  const Paso2 = () => {
    navigate('/paso2');
  }

  const abrirVentana = (event) => {
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const cerrarVentana = () => {
    setAnchorEl(null);
  };

  const abrir = Boolean(anchorEl);
  const id = abrir ? 'simple-popover' : undefined;


  const enviar = () => {
    navigate(`/paso2/${ida}/${vuelta}/${precio}/${salida}/${llegada}/${tiempo}/${nombre}/${apellido}/${telefono}`);
  }

  return (
    <>
      <MenuNavBar />
      <div className='div_contenedorIdaOrigenDestino'>
        <p className='p_idaMovil'>Vuelo de ida <label style={{ marginLeft: '5px' }}>-</label><label style={{ marginLeft: '5px' }}>{formatDate(selectedDate)}</label></p>
        <p className='p_OrigenDestinoMovilResumen'>{corigen} <label style={{ marginLeft: '1px', marginRight: '5px' }}>a</label>{cdestino}</p>

      </div>
      <p className='p_resumen'><label style={{ marginLeft: '5px', marginRight: '5px' }}>Resumen de viaje</label></p>
      <div className='fondoResumen' style={{ marginBottom: '25px' }}>
        <img src={success} className='imagenSuccess' style={{ float: 'right', marginLeft: '20px' }} />

        <p className='p_ida'><img src={iconoAvion} />Vuelo de ida: {corigen} <label style={{ marginLeft: '5px', marginRight: '5px' }}>a</label>{cdestino}<label style={{ marginLeft: '5px' }}>-</label><label style={{ marginLeft: '5px' }}>{formatDate(selectedDate)}</label></p>

        <div className='div_datos'>

          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '30px' }}>
            <tbody>
              <tr>
                <td style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '20px', fontWeight: 'bold' }}>{salida}</label>
                    <p style={{ marginRight: '18px', fontSize: '17px' }}>{ida}</p>
                  </div>
                </td>
                <td style={{ width: '35%', textAlign: 'center' }}>
                  <div style={{ marginTop: '-10px' }}>
                    <p className='p_tiempoResumen' style={{ marginTop: '10px', color: ' gray', fontSize: '15px' }}>{tiempo}</p>
                    <img className='rayaAvionResumen' src={raya_avion} alt="Avion" />
                    <p className='p_directoResumen' style={{ margin: 0, color: ' gray', fontSize: '13px' }}>Directo</p>

                  </div>
                </td>
                <td style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}>
                  <div style={{ marginRight: '10px' }}>
                    <label style={{ display: 'block', fontSize: '20px', fontWeight: 'bold' }}>{llegada}</label>
                    <p style={{ marginLeft: '18px', fontSize: '17px' }}>{vuelta}</p>
                  </div>
                </td>
                <td style={{ width: '11%' }}>
                  <div style={{}}>
                    <label style={{}}><img src={logoAviancaResumen} />AV 8520</label><br />
                    <label style={{}}>
                      <label style={{}} onClick={abrirVentana} >Detalles del vuelo</label>

                    </label>
                  </div>
                </td>
                <td style={{ width: '25%', textAlign: 'center', verticalAlign: 'middle' }}>
                  <div style={{ marginLeft: '-100px' }}>
                    <label style={{ display: 'block', marginLeft: '180px', marginRight: '150px', marginBottom: '5px', textAlign: 'center', backgroundColor: 'red', color: 'white', borderRadius: '5px', fontWeight: 'bold', width: '70px' }}>Basic</label>
                    <label style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', marginTop: '-15px' }}>
                      <label style={{ fontSize: '23px', fontWeight: 'bold', marginRight: '10px' }}>${precio}</label>
                      COP
                    </label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>


        <div className='div_datosMovil'>
          <div className='div_datosContenedorMovil' >
            <div>
              <label className='label_salidaMovilResumen' >{salida}</label>
              <p className='p_codigoOrigenMovilResumen'>{ida}</p>
            </div>

            <div className='div_contenedorDatosVuelosMovilResumen'>
              <label className='label_directoMovilResumen' >Directo
                <label className='label_barraMovilResumen' >|</label>
                {tiempo}</label>
              <label className='label_rayaMovilResumen'></label>
            </div>

            <div className='div_llegadaMovilResumen'>
              <label className='label_llegadaMovilResumen'>{llegada}</label>
              <p className='p_codigoDestinoMovilResumen'>{vuelta}</p>
            </div>


          </div>
          <div className='div_valorPasajeMovilResumen'>
            <label className='detallesMovilResumen'>Detalles del vuelo</label>

            <label className='label_valorPasajeMovilResumen'>
              ${precio} COP </label>
          </div>
        </div>






        <div className='equipaje'>
          <label className='equipajeTarifa'>Esta tarifa no incluye equipaje de mano ni equipaje de bodega.
          </label><img className='imagenEquipaje' src={equipaje} />
          <div className='div_cambiarClassic'>
            <label className='label_classic'>Cambia a classic por solo</label>
            <label className='label_precioEquipaje'>$113.050 COP</label></div>

        </div>

        <div className='equipajeMovil'>
          <label className='label_precioEquipajeMovil'>$113.050 COP</label>
          <img className='imagenEquipajeMovil' src={equipaje} />
        </div>

        <Popover
          id={id}
          open={abrir}
          anchorEl={anchorEl}
          onClose={cerrarVentana}
          className='PopoverAccordion'
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}

          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}

          sx={{ marginTop: '-50px', borderRadius: '30px' }}


        ><button onClick={cerrarVentana} className='botonCerrar_popoverAccordion' style={{ float: 'right', border: 'none', fontSize: '20px', marginTop: '20px', marginRight: '30px' }}>X</button>
          <Typography sx={{ p: 2 }} >
            <p className='p_titulosDetalles' >Detalles del vuelo</p>
            <Typography gutterBottom className='contenedor_popoverAccordion'>

              <label className='label_origen'>{corigen}</label><label className='label_a'>a</label><label className='label_destino'>{cdestino}</label><label className='labelBarra'>|</label><label className='labelFecha'>{formatDate(selectedDate)}</label><br />
              <label className='label_botonDirecto'>DIRECTO</label> <label className='label_duracion' >Duración Total:</label><label className='label_tiempo'>{tiempo}</label>


            </Typography>

            <Typography gutterBottom className='contenedor_popoverAccordion'>

              <table style={{ textAlign: 'center', width: '100%' }}>
                <tr   >
                  <td rowSpan='3' > <img src={barraVertical} /></td>
                  <td ><label>{salida}</label><label>{origenNormal}</label><br />
                    <label>{ao}</label></td>
                  <td > <label>Operado por avianca</label><br />
                    <label>AV9332</label><label> AIRBUS A320</label>
                  </td>
                </tr>
                <tr>

                  <td >{tiempo}</td>
                  <td ></td>
                </tr>

                <tr>

                  <td ><label>{llegada}</label><label>{destinoNormal}</label><br />
                    <label>{ad}</label></td>
                  <td ></td>
                </tr>
              </table>


            </Typography>
            <Typography gutterBottom className='contenedor_popoverAccordion'>
              <button style={{ borderRadius: '30px', backgroundColor: 'black', color: 'white', fontWeight: 'bold', fontSize: '20px', float: 'right', marginBottom: '30px', width: '200px', height: '50px' }} onClick={cerrarVentana}>Cerrar</button>

            </Typography>
          </Typography>
        </Popover>


      </div>

      <div className='div_continua'>
        <div className='contenedor_continua'>
          <label className='label_sorpresas'>
            <p className='p_sorpresas'><img src={escudo} />¡Sin sorpresas!</p>
            <p className='p_todos'>Todos los impuestos están incluidos en el precio total</p>
          </label>

          <label className='label_reserva'>
            <p className='p_total'>Total de tu reserva:</p>
            <p className='p_precio'>${precio}<label className='label_cop'>COP</label></p>
          </label>

          <label className='label_boton'>
            <button className='boton_continua' onClick={enviar} >
              Continua personalizando tu viaje
            </button></label>

        </div>
      </div>

      <div className='div_sinSorpresasMovil'>
        <p className='p_sorpresas'><img src={escudo} style={{marginLeft:'5px'}}/>¡Sin sorpresas!</p>
        <p className='p_todos'>Todos los impuestos están incluidos en el precio total</p>
      </div>

      <div className='div_ContenedorTotalMovil'>
      <div className='div_reservaMovil'>
            <label className='label_totalMovil'>Total de tu reserva:</label>
            <label className='label_precioMovil'>${precio}<label className='label_copMovil'>COP</label></label>
          </div>
        <button className='boton_continuaMovil' onClick={enviar} >
          Continua personalizando tu viaje
        </button>
        </div>

        <div className="div_piePagina">
                <label className="label_piePagina1" >Consulta todas las condiciones de <a className='a_retracto' href="/">retracto y desistimiento </a> aplicables para Colombia.</label >
                <label className="label_piePagina2">© Avianca S.A 2024</label>
            </div>
    </>
  );

}

export default Resumen;
