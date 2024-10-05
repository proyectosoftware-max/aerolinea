
import React, { useState, useEffect, useContext } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { Card, CardContent, CardActions, Button, Grid, darken } from '@mui/material';
import img_basic from '../material/barranquilla/precio bajo/basicActual.jpg';
import img_classic from '../material/barranquilla/precio bajo/classicActual.jpg';
import img_flex from '../material/barranquilla/precio bajo/flexActual.jpg';
import img_basicMovil from '../material/movil/basicMovil.png';
import img_classicMovil from '../material/movil/classicMovil.png';
import img_flexMovil from '../material/movil/flexMovil.png';
import rayaAvion from '../material/rayaAvion.jpg';
import PiePagina from './PiePagina.jsx';
import { DataContext } from './Context';
import datos from './vuelos.json';
import datosAeropuertos from './data.json';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ListIcon from '@mui/icons-material/List';
import imagen_opcion from '../material/opcion.jpg';
import imagen_opcion_classic from '../material/opcionClassic.jpg';
import { useNavigate } from 'react-router-dom';
import Popover from '@mui/material/Popover';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import icono from '../material/icono.jpg'
import barraVertical from '../material/barraVertical.jpg';
import iconoAvion from '../material/iconoAvion.jpg';
dayjs.locale('es');





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
    const formattedDate = dayjs(date).format('ddd D MMM'); // Ej: "Thu 12 Sep"

    // Separar el formato en partes
    let [weekday, day, monthAbbreviation] = formattedDate.split(' ');

    // Eliminar cualquier punto en el día de la semana (si existe)
    weekday = weekday.replace('.', '');

    // Capitalizar la primera letra del día de la semana
    const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);

    // Mapea la abreviación del mes al español usando el mapa personalizado
    const capitalizedMonth = monthMap[monthAbbreviation.toLowerCase()] || monthAbbreviation;

    // Retorna el formato final, por ejemplo "Jue, 12 Sept"
    return `${capitalizedWeekday}, ${day} ${capitalizedMonth}`;
};

const formatoFechaMovil = (date) => {
    // Formato corto del día de la semana, número del día y mes
    const formattedDate = dayjs(date).format('ddd D MMM'); // Ej: "Thu 12 Sep"

    // Separar el formato en partes
    let [weekday, day, monthAbbreviation] = formattedDate.split(' ');

    // Eliminar cualquier punto en el día de la semana (si existe)
    weekday = weekday.replace('.', '');

    // Capitalizar la primera letra del día de la semana
    const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);

    // Mapea la abreviación del mes al español usando el mapa personalizado
    const capitalizedMonth = monthMap[monthAbbreviation.toLowerCase()] || monthAbbreviation;

    // Retorna el formato final, por ejemplo "Jue, 12 Sept"
    return `${capitalizedWeekday}, ${capitalizedMonth} ${day} `;
};



const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO').format(price);
};

const formatoCompleto = (date) => {
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



const Paso1 = () => {
   
    
    const { setSharedData, origen, destino, setPrecio, selectedDate, setSelectedDate } = useContext(DataContext);
    const [vuelos, setVuelos] = useState(null);
    const [vueloOrigen, setVueloOrigen] = useState('');
    const [vueloDestino, setVueloDestino] = useState('');
    const [vueloTiempo, setVueloTiempo] = useState('');
    const [vueloSalida, setVueloSalida] = useState('');
    const [vueloLlegada, setVueloLlegada] = useState('');
    const [vueloPrecio, setVueloPrecio] = useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [clickDirecto, setClickDirecto] = useState(false);
    const [clickPrecio, setClickPrecio] = useState(false);
    const [origenNormal, setOrigenNormal] = useState('');
    const [destinoNormal, setDestinoNormal] = useState('');
    const [datosPopover, setDatosPopover] = useState('');
    const [aeropuertoOrigen, setAeropuertoOrigen] = useState('');
    const [aeropuertoDestino, setAeropuertoDestino] = useState('');
    const navigate = useNavigate();





    const [open, setOpen] = useState(false);
    const [openClassic, setOpenClassic] = useState(false);

    const handleClickOpen = (vuelo) => {
        setVueloOrigen(vuelo.codigo_origen);
        setVueloDestino(vuelo.codigo_destino);
        setVueloTiempo(vuelo.tiempo_vuelo);
        setVueloSalida(vuelo.hora_salida);
        setVueloLlegada(vuelo.hora_llegada);
        setVueloPrecio(vuelo.valor_pasaje);
        setOpen(true);
    };

    const handleClickOpenClassic = (vuelo) => {
        setVueloOrigen(vuelo.codigo_origen);
        setVueloDestino(vuelo.codigo_destino);
        setVueloTiempo(vuelo.tiempo_vuelo);
        setVueloSalida(vuelo.hora_salida);
        setVueloLlegada(vuelo.hora_llegada);
        setVueloPrecio(vuelo.valor_pasaje);
        setOpenClassic(true);
    };

    const handleClickVueloPrecioClassic = (vuelo) => {
        setVueloOrigen(vuelo.codigo_origen);
        setVueloDestino(vuelo.codigo_destino);
        setVueloTiempo(vuelo.tiempo_vuelo);
        setVueloSalida(vuelo.hora_salida);
        setVueloLlegada(vuelo.hora_llegada);
        setVueloPrecio((parseFloat(selectedPrice) + 119000).toLocaleString('es-CO'));
        setOpen(true);
    }

    const handleClickVueloPrecioFlex = (vuelo) => {
        setVueloOrigen(vuelo.codigo_origen);
        setVueloDestino(vuelo.codigo_destino);
        setVueloTiempo(vuelo.tiempo_vuelo);
        setVueloSalida(vuelo.hora_salida);
        setVueloLlegada(vuelo.hora_llegada);
        setVueloPrecio((parseFloat(selectedPrice) + 120000).toLocaleString('es-CO'));
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseClassic = () => {
        setOpenClassic(false);
    };



    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - visibleItems, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + visibleItems, maxIndex));
    };

    const [datesWithPrices, setDatesWithPrices] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState(null); // Estado para almacenar el precio seleccionado

    // Función para generar fechas y precios
    const generateDatesWithPrices = (startDate, count) => {
      const datesWithPrices = [];
      const currentDate = new Date(startDate);
  
      for (let i = 0; i < count; i++) {
        const date = new Date(currentDate);
        const price = Math.floor(Math.random() * 10000 + 70000); // Genera precios aleatorios
        datesWithPrices.push({ date, price });
        currentDate.setDate(currentDate.getDate() + 1);
      }
  
      return datesWithPrices;
    };
  
    // Guardar y obtener precios en el localStorage
    const getStoredPrices = () => {
      const today = new Date().toLocaleDateString(); // Obtenemos la fecha actual en formato de string
      const storedPrices = JSON.parse(localStorage.getItem('prices'));
  
      if (storedPrices && storedPrices.date === today) {
        // Si ya hay precios guardados para hoy, los utilizamos
        // return storedPrices.prices;

        // Si no hay precios para hoy, los generamos y los guardamos
        const startDate = new Date();
        const itemCount = 300; // Número de elementos en el carrusel
        const newPrices = generateDatesWithPrices(startDate, itemCount);
  
        // Guardar los precios con la fecha actual en el localStorage
        localStorage.setItem('prices', JSON.stringify({ date: today, prices: newPrices }));
  
        return newPrices;

      } else {
        // Si no hay precios para hoy, los generamos y los guardamos
        const startDate = new Date();
        const itemCount = 300; // Número de elementos en el carrusel
        const newPrices = generateDatesWithPrices(startDate, itemCount);
  
        // Guardar los precios con la fecha actual en el localStorage
        localStorage.setItem('prices', JSON.stringify({ date: today, prices: newPrices }));
  
        return newPrices;
      }
    };
  
    // Al cargar el componente, obtenemos o generamos los precios
    useEffect(() => {
      const prices = getStoredPrices();
      setDatesWithPrices(prices);

       // Selecciona el precio del primer elemento al cargar el componente
    if (prices.length > 0) {
        setSelectedPrice(prices[0].price);
      }
    }, []);
  
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleItems = 7; // Cantidad de fechas visibles a la vez
    const itemWidth = 170; // Ancho de cada elemento del carrusel
    const totalWidth = itemWidth;
    const carouselWidth = totalWidth * visibleItems; // Ancho total del carrusel visible
    const maxIndex = datesWithPrices.length - visibleItems; // Índice máximo permitido

    useEffect(() => {
        setOrigenNormal(origen.replace(/\s?\(.*?\)/, ''));
        setDestinoNormal(destino.replace(/\s?\(.*?\)/, ''));
        const vuelosFiltrado = datos.vuelos.find(vuelo => vuelo.origen === origen && vuelo.destino === destino);
        const obtenerOrigen = datosAeropuertos.find(nombre => nombre.name === origen);
        const obtenerDestino = datosAeropuertos.find(nombre => nombre.name === destino);
        setAeropuertoOrigen(obtenerOrigen);
        setAeropuertoDestino(obtenerDestino);
        setVuelos(vuelosFiltrado);
        console.log(origen);
        console.log(destino);
        console.log(datos.vuelos.find(vuelo => vuelo.origen === origen && vuelo.destino === destino));
    }, [origen, destino, vuelos]);

    useEffect(() => {
        localStorage.setItem('sharedData', setSharedData(selectedDate));
    }, [selectedDate]);

    useEffect(() => {
        localStorage.setItem('precio', setPrecio(vueloPrecio));
    }, [vueloPrecio]);

    useEffect(() => {
        localStorage.setItem('selectedDate', setSelectedDate(selectedDate));
    }, [selectedDate]);

    const change = (date) => {

        setSelectedDate(date);
    }

    const handleDatePriceClick = (date, price) => {
        setSelectedDate(date);
        setSelectedPrice(price);
        change(date);

    };


    const isSelectedDate = (date) => {
        return dayjs(date).isSame(selectedDate, 'day'); // Compara si ambas fechas son el mismo día
    };

    const [expanded, setExpanded] = React.useState(false);

    const handleExpansion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const enviarDatosMovilPrecioBasic = (vuelo) => {
        const origenMovil = vuelo.codigo_origen.replace(/\s?\(.*?\)/, '');
        const destinoMovil = vuelo.codigo_destino.replace(/\s?\(.*?\)/, '');
        const precioBasic = selectedPrice.toLocaleString('es-CO');
        navigate(`/resumen/${origenMovil}/${destinoMovil}/${vuelo.codigo_origen}/${vuelo.codigo_destino}/${vuelo.tiempo_vuelo}/${precioBasic}/${vuelo.hora_salida}/${vuelo.hora_llegada}/${aeropuertoOrigen.aeropuerto}/${aeropuertoDestino.aeropuerto}`);

    };

    const enviarDatosMovilPrecioClassic = (vuelo) => {
        const origenMovil = vuelo.codigo_origen.replace(/\s?\(.*?\)/, '');
        const destinoMovil = vuelo.codigo_destino.replace(/\s?\(.*?\)/, '');
        const precioClassic = (parseFloat(selectedPrice) + 119000).toLocaleString('es-CO');
        navigate(`/resumen/${origenMovil}/${destinoMovil}/${vuelo.codigo_origen}/${vuelo.codigo_destino}/${vuelo.tiempo_vuelo}/${precioClassic}/${vuelo.hora_salida}/${vuelo.hora_llegada}/${aeropuertoOrigen.aeropuerto}/${aeropuertoDestino.aeropuerto}`);

    };

    const enviarDatosMovilPrecioFlex = (vuelo) => {
        const origenMovil = vuelo.codigo_origen.replace(/\s?\(.*?\)/, '');
        const destinoMovil = vuelo.codigo_destino.replace(/\s?\(.*?\)/, '');
       const precioFlex = (parseFloat(selectedPrice) + 160650).toLocaleString('es-CO');
        navigate(`/resumen/${origenMovil}/${destinoMovil}/${vuelo.codigo_origen}/${vuelo.codigo_destino}/${vuelo.tiempo_vuelo}/${precioFlex}/${vuelo.hora_salida}/${vuelo.hora_llegada}/${aeropuertoOrigen.aeropuerto}/${aeropuertoDestino.aeropuerto}`);

    };

    const clickBasic = () => {
        const precioBasic = selectedPrice.toLocaleString('es-CO')
        navigate(`/resumen/${origenNormal}/${destinoNormal}/${vueloOrigen}/${vueloDestino}/${vueloTiempo}/${precioBasic}/${vueloSalida}/${vueloLlegada}/${aeropuertoOrigen.aeropuerto}/${aeropuertoDestino.aeropuerto}`);
    }

    const clickClassic = () => {
        const precioClassic = (parseFloat(selectedPrice) + 119000).toLocaleString('es-CO')
        navigate(`/resumen/${origenNormal}/${destinoNormal}/${vueloOrigen}/${vueloDestino}/${vueloTiempo}/${precioClassic}/${vueloSalida}/${vueloLlegada}/${aeropuertoOrigen.aeropuerto}/${aeropuertoDestino.aeropuerto}`);
    }

    const clickFlex = () => {
        const precioFlex = (parseFloat(selectedPrice) + 160650).toLocaleString('es-CO')
        navigate(`/resumen/${origenNormal}/${destinoNormal}/${vueloOrigen}/${vueloDestino}/${vueloTiempo}/${precioFlex}/${vueloSalida}/${vueloLlegada}/${aeropuertoOrigen.aeropuerto}/${aeropuertoDestino.aeropuerto}`);
    }

    const abrirVentana = (event, id) => {

        const datosVuelos = datos.vuelos.find(vuelo => vuelo.origen === origen && vuelo.destino === destino);
        const horarisoVuelos = datosVuelos.horarios.find((item) => item.id === id); // Buscar el elemento seleccionado en el .json
        setDatosPopover(horarisoVuelos); // Establecer el elemento seleccionado
        console.log(horarisoVuelos);
        event.stopPropagation();
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const cerrarVentana = () => {
        setAnchorEl(null);
    };

    const abrir = Boolean(anchorEl);
    const id = abrir ? 'simple-popover' : undefined;

    const vuelosDirectos = () => {
        setClickDirecto(!clickDirecto);
    }

    const mejorPrecio = () => {
        setClickPrecio(!clickPrecio);
    }




    return (
        <>

            <div className='fondoPaso1'>
                <p className='p_salida'><img src={iconoAvion} />Salida de {origenNormal} <label style={{ marginLeft: '2px', marginRight: '5px' }}>a</label>{destinoNormal}<label style={{ fontSize: '14px', marginTop: '-100px', marginLeft: '5px', marginRight: '5px', fontWeight: 'bold' }}>—</label><label>{formatoCompleto(selectedDate)}</label></p>
                <p className='p_salidaMovil'>Selecciona tu vuelo de salida -{formatoFechaMovil(selectedDate)}</p>
                <p className='p_origenDestinoMovil'>{origenNormal}<label className='label_a_movil'>a</label>{destinoNormal}</p>
                <div className="carousel-wrapper">
                    <button className="carousel-control prev" onClick={handlePrev}>&#10094;</button>
                    <div className="carousel-container">
                        <div
                            className="carousel-content"
                            style={{
                                transform: `translateX(-${currentIndex * totalWidth}px)`,
                                width: `${carouselWidth}px` // Ancho total del carrusel para visualizar 7 elementos
                            }}
                        >
                            {datesWithPrices.map(({ date, price }, index) => {
            // Almacenar el precio en el estado al renderizar el carrusel
            if (index === 0 && selectedPrice === null) {
              setSelectedPrice(price); // Guardar el precio del primer elemento al cargarse
            }

            return ( 
                                <div className="carousel-item-content"
                                    key={index} onChange={change} onClick={() => handleDatePriceClick(date, price)}
                                    style={{
                                        border: isSelectedDate(date) ? '1px solid rgb(123, 214, 123)' : 'none',
                                        fontWeight: isSelectedDate(date) ? 'bold' : 'normal',

                                    }}
                                >
                                    <label className='label_fecha'>{formatDate(date)}</label>
                                    <label className='label_copCarrusel'>Desde<label className='label_precioCarrusel' >${`${formatPrice(price)}`}</label> COP </label>
                                </div>);
                            })}
                        </div>
                    </div>
                    <button className="carousel-control next" onClick={handleNext}>&#10095;</button>
                </div>

                <div className='div_ordenar_por'>
                    <img className='img_icono' src={icono}></img>
                    <label className='label_recomendado'>Recomendado:</label>
                    <button className='boton_vuelos_directos' onClick={vuelosDirectos} style={{ backgroundColor: clickDirecto ? 'black' : 'white', color: clickDirecto ? 'white' : 'black' }} >Vuelos directos</button>
                    <button className='boton_mejor_precio' onClick={mejorPrecio} style={{ backgroundColor: clickPrecio ? 'black' : 'white', color: clickPrecio ? 'white' : 'black' }} >Mejor precio</button>
                </div>

                {vuelos ? (
                    vuelos.horarios.map((vuelo, index) => (
                        <div className='div_accordion'>
                            <Accordion className='accordion' expanded={expanded === index}
                                key={index}
                                onChange={handleExpansion(index)}
                            >
                                <AccordionSummary
                                    aria-controls={`panel${index}-content`}
                                    id={`panel${index}-header`}
                                > <table className='tabla_accordion' >
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '15%', textAlign: 'center', verticalAlign: 'middle' }}>
                                                    <div>
                                                        <label className='label_salida' >{vuelo.hora_salida}</label>
                                                        <p className='p_codigoOrigen'>{vuelo.codigo_origen}</p>
                                                    </div>
                                                </td>
                                                <td style={{ width: '35%', textAlign: 'center'/*, border: '1px solid blue'*/ }}>
                                                    <div className='div_contenedorDatosVuelos'>
                                                        <label className='label_directo' >Directo {vuelo.tiempo_vuelo}</label>
                                                        <label className='codigoAvion'>codigo avión</label>
                                                        <label className='label_barra' >|</label>
                                                        <label className='label_detallesVuelo' aria-describedby={id} onClick={(event) => abrirVentana(event, vuelo.id)}>Detalles del vuelo</label>
                                                        <img src={rayaAvion} alt="Avion" className='img_rayaAvion' />

                                                    </div>
                                                </td>
                                                <td style={{ width: '25%', textAlign: 'center', verticalAlign: 'middle' }}>
                                                    <div className='div_llegada'>
                                                        <label className='label_llegada'>{vuelo.hora_llegada}</label>
                                                        <p className='p_codigoDestino'>{vuelo.codigo_destino}</p>
                                                    </div>
                                                </td>
                                                <td style={{ width: '25%', textAlign: 'center', verticalAlign: 'middle' }}>
                                                    <div className='div_valorPasaje'>

                                                        <label className='label_valorPasaje'>
                                                        ${`${formatPrice(selectedPrice)}`} COP


                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className='div_contendedorMovil' >
                                        <div className='div_subContenedorMovil'>

                                            <div className='div_origenMovil'>
                                                <label className='label_salidaMovil' >{vuelo.hora_salida}</label>
                                                <p className='p_codigoOrigenMovil'>{vuelo.codigo_origen}</p>
                                            </div>
                                            <div className='div_trayecto'>
                                                <label className='label_trayecto'>
                                                    Incluye trayecto operado por Avianca
                                                </label>
                                            </div>

                                            <div className='div_contenedorDatosVuelosMovil'>
                                                <label className='label_directoMovil' >Directo {vuelo.tiempo_vuelo}</label>
                                                <label className='codigoAvionMovil'>Av 8401</label>
                                                <label className='label_barraMovil' >|</label>
                                                <label className='label_rayaMovil'></label>

                                            </div>

                                            <div className='div_destinoMovil'>
                                                <label className='label_llegadaMovil'>{vuelo.hora_llegada}</label>
                                                <p className='p_codigoDestinoMovil'>{vuelo.codigo_destino}</p>
                                            </div>

                                            <div className='div_valorPasajeMovil'>
                                                <label className='label_valorPasajeMovil'>
                                                ${`${formatPrice(selectedPrice)}`} COP
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className='CardEscritorio'>
                                    <p className='tituloCard' style={{textAlign:'center', fontWeight:'bold'}} >ECONOMICA</p>
                                        <p className='tituloCardMovil' style={{textAlign:'center'}} >ECONOMICA</p>
                                        <Typography>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} sm={6} md={4} sx={{ marginTop: '-10px' }}>
                                                    <Card sx={{
                                                        maxWidth: 345, margin: '0 auto', borderRadius: '15px', height: '100%', paddingBottom: '10px', boxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                                                        WebkitBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                                                        MozBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)'
                                                    }}
                                                        className='basic'
                                                    >
                                                        <CardContent>
                                                            <Typography variant="h5" component="div">

                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                <img src={img_basic} style={{ marginTop: '-10px', marginBottom: '-5px' }} onClick={handleClickOpen} />
                                                            </Typography>
                                                        </CardContent>
                                                        <CardActions sx={{ justifyContent: 'center' }}>

                                                            <Button variant="contained" sx={{
                                                                textTransform: 'none',
                                                                backgroundColor: 'rgb(226, 17, 17)',
                                                                borderRadius: '50px',
                                                                fontSize: '14px',
                                                                height: '45px',
                                                                width: '250px',
                                                                '&:hover': { backgroundColor: darken('rgb(226, 17, 17)', 0.2) }

                                                            }} onClick={() => handleClickOpen(vuelo)}  >${`${formatPrice(selectedPrice)}`} COP</Button>
                                                        </CardActions>
                                                        <Typography variant="p" color="text.secondary" sx={{ marginLeft: '120px', fontSize: '12px' }}>
                                                         Precio por pasajero
                                                        </Typography>

                                                    </Card>

                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4} style={{ paddingTop: '-10px' }}>
                                                    <Card sx={{
                                                        maxWidth: 345, margin: '0 auto', border: '2px solid rgb(204, 51, 140)', borderRadius: '15px', height: '100%', paddingBottom: '10px', boxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                                                        WebkitBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                                                        MozBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)'
                                                    }}
                                                        className='classic'
                                                    >
                                                        <CardContent>
                                                            <Typography variant="h5" component="div">

                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                <img src={img_classic} style={{ marginTop: '-17px', marginBottom: '-5px' }} />
                                                            </Typography>
                                                        </CardContent>
                                                        <CardActions sx={{ justifyContent: 'center', marginTop: '2px' }}>
                                                            <Button variant="contained" sx={{
                                                                textTransform: 'none',
                                                                backgroundColor: 'rgb(204, 51, 140)',
                                                                borderRadius: '50px',
                                                                fontSize: '14px',
                                                                height: '45px',
                                                                width: '250px',
                                                                '&:hover': { backgroundColor: darken('rgb(204, 51, 140)', 0.2) }

                                                            }}
                                                            
                                                            onClick={() => handleClickOpenClassic(vuelo)} 
                                                            
                                                            >${(parseFloat(selectedPrice) + 119000).toLocaleString('es-CO')} COP</Button>
                                                        </CardActions>
                                                        <Typography variant="p" color="text.secondary" sx={{ marginLeft: '120px', fontSize: '12px' }}>
                                                            Precio por pasajero
                                                        </Typography>

                                                    </Card>


                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4} style={{ marginTop: '-10px' }}>
                                                    <Card sx={{
                                                        maxWidth: 345, margin: '0 auto', border: '15px', height: '100%', paddingBottom: '50px', boxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                                                        WebkitBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                                                        MozBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)'
                                                    }}
                                                        className='flex'
                                                    >
                                                        <CardContent >
                                                            <Typography variant="h5" component="div">

                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                <img src={img_flex} style={{ marginTop: '-9px', marginBottom: '1px' }} />
                                                            </Typography>
                                                        </CardContent>
                                                        <CardActions sx={{ justifyContent: 'center', marginTop: '-5px' }}>
                                                            <Button variant="contained" sx={{
                                                                textTransform: 'none',
                                                                backgroundColor: 'rgb(247, 123, 8)',
                                                                borderRadius: '50px',
                                                                fontSize: '14px',
                                                                height: '45px',
                                                                width: '250px',
                                                                '&:hover': { backgroundColor: darken('rgb(247, 123, 8)', 0.2) }

                                                            }}
                                                            
                                                            onClick={() => clickFlex(vuelo)}
                                                            
                                                            >${(parseFloat(selectedPrice) + 160650).toLocaleString('es-CO')} COP</Button>
                                                        </CardActions>
                                                        <Typography variant="p" color="text.secondary" sx={{ marginLeft: '120px', fontSize: '12px' }}>
                                                            Precio por pasajero
                                                        </Typography>

                                                    </Card>


                                                </Grid>
                                            </Grid>
                                        </Typography>
                                    </div>

                                    {/** Movil */}

                                    <div className='CardMovil'>
                                        <p className='tituloCardMovil' >ECONOMICA</p>
                                        <Card sx={{
                                            maxWidth: '100%', margin: '0 auto', marginTop: '30px', borderRadius: '15px', height: '100%', boxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                                            WebkitBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                                            MozBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                                            width: '100%',
                                        }}
                                            className='basicMovil'
                                        >
                                            <CardContent>
                                                <Typography variant="h5" component="div">

                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    <img src={img_basicMovil} style={{ marginTop: '-10px', marginBottom: '-5px', width: '100%' }} />
                                                </Typography>
                                            </CardContent>
                                            <CardActions sx={{ justifyContent: 'center', marginTop: '30px' }}>


                                            </CardActions>
                                            <Typography variant="body2" color="text.secondary" onClick={() => enviarDatosMovilPrecioBasic(vuelo)} sx={{ backgroundColor: 'rgb(226, 17, 17)', width: '100%', height: '50px', cursor: 'pointer', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px', fontSize: '12px' }}>
                                                <p style={{ textAlign: ' center', fontSize: '15px', fontWeight: 'bold', color: ' white', paddingTop: '10px' }}>${`${formatPrice(selectedPrice)}`} COP</p>
                                                <p style={{ textAlign: ' center', fontSize: '13px', color: ' white', marginTop: '-20px' }}>Precio por pasajero</p>
                                            </Typography>

                                        </Card>




                                        <Card sx={{
                                            maxWidth: '100%', margin: '0 auto', marginTop: '30px', border: '2px solid rgb(204, 51, 140)', borderRadius: '15px', height: '100%', boxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                                            WebkitBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                                            MozBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                                            width: '100%'
                                        }}
                                            className='classicMovil'
                                        >
                                            <CardContent>
                                                <Typography variant="h5" component="div">

                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    <img src={img_classicMovil} style={{ marginTop: '-20px', marginBottom: '-5px', width: '100%' }} />
                                                </Typography>
                                            </CardContent>
                                            <CardActions sx={{ justifyContent: 'center', marginTop: '-10px' }}>
                                            </CardActions>
                                            <Typography variant="body2" color="text.secondary" onClick={() => enviarDatosMovilPrecioClassic(vuelo)} sx={{ backgroundColor: 'rgb(204, 51, 140)', width: '100%', height: '50px', cursor: 'pointer', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px', fontSize: '12px' }}>
                                                <p style={{ textAlign: ' center', fontSize: '15px', fontWeight: 'bold', color: ' white', paddingTop: '10px' }}>${(parseFloat(selectedPrice) + 119000).toLocaleString('es-CO')} COP</p>
                                                <p style={{ textAlign: ' center', fontSize: '13px', color: ' white', marginTop: '-20px' }}>Precio por pasajero</p>
                                            </Typography>

                                        </Card>


                                        <Card sx={{
                                            maxWidth: '100%', margin: '0 auto', marginTop: '30px', border: '15px', height: '100%', boxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                                            WebkitBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                                            MozBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                                            width: '100%',
                                        }}
                                            className='flexMovil'
                                        >
                                            <CardContent>
                                                <Typography variant="h5" component="div">

                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    <img src={img_flexMovil} style={{ marginTop: '-15px', marginBottom: '1px', width: '100%' }} />
                                                </Typography>
                                            </CardContent>
                                            <CardActions sx={{ justifyContent: 'center', marginTop: '25px' }}>
                                            </CardActions>
                                            <Typography variant="body2" color="text.secondary" onClick={() => enviarDatosMovilPrecioFlex(vuelo)} sx={{ backgroundColor: 'rgb(247, 123, 8)', width: '100%', height: '50px', cursor: 'pointer', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px', fontSize: '12px' }}>
                                                <p style={{ textAlign: ' center', fontSize: '15px', fontWeight: 'bold', color: ' white', paddingTop: '10px' }}>${(parseFloat(selectedPrice) + 160650).toLocaleString('es-CO')} COP</p>
                                                <p style={{ textAlign: ' center', fontSize: '13px', color: ' white', marginTop: '-20px' }}>Precio por pasajero</p>
                                            </Typography>

                                        </Card>

                                    </div>
                                </AccordionDetails>
                            </Accordion>

                        </div>
                    ))
                ) : (
                    <p>No se encontraron vuelos</p>
                )}

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

                            <label className='label_origen'>{origenNormal}</label><label className='label_a'>a</label><label className='label_destino'>{destinoNormal}</label><label className='labelBarra'>|</label><label className='labelFecha'>{formatDate(selectedDate)}</label><br />
                            <label className='label_botonDirecto'>DIRECTO</label> <label className='label_duracion' >Duración Total:</label><label className='label_tiempo'>{datosPopover.tiempo_vuelo}</label>


                        </Typography>

                        <Typography gutterBottom className='contenedor_popoverAccordion'>
                            {datosPopover ? (
                                <table style={{ textAlign: 'center', width: '100%' }}>
                                    <tr   >
                                        <td rowSpan='3' > <img src={barraVertical} /></td>
                                        <td ><label>{datosPopover.hora_salida}</label><label>{origenNormal}</label><br />
                                            <label>{aeropuertoOrigen.aeropuerto}</label></td>
                                        <td > <label>Operado por avianca</label><br />
                                            <label>AV9332</label><label> AIRBUS A320</label>
                                        </td>
                                    </tr>
                                    <tr>

                                        <td >{datosPopover.tiempo_vuelo}</td>
                                        <td ></td>
                                    </tr>

                                    <tr>

                                        <td ><label>{datosPopover.hora_llegada}</label><label>{destinoNormal}</label><br />
                                            <label>{aeropuertoDestino.aeropuerto}</label></td>
                                        <td ></td>
                                    </tr>
                                </table>
                            ) : (
                                <p>No hay datos disponibles</p>
                            )}


                        </Typography>
                        <Typography gutterBottom className='contenedor_popoverAccordion'>
                            <button style={{ borderRadius: '30px', backgroundColor: 'black', color: 'white', fontWeight: 'bold', fontSize: '20px', float: 'right', marginBottom: '30px', width: '200px', height: '50px' }} onClick={cerrarVentana}>Cerrar</button>

                        </Typography>
                    </Typography>
                </Popover>


                <div className='div_accordion'>
                    <div>
                        <Accordion className='accordionTarifas'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"

                                style={{ width: '100%' }}
                            >
                                <Typography variant="body2" paragraph className='tituloTarifas' ><ListIcon style={{ verticalAlign: 'middle', marginRight: '8px' }} />Condiciones tarifarias</Typography>
                            </AccordionSummary >
                            <AccordionDetails className='accordionDetails'>
                                <Typography variant="h6" paragraph className='TypographyparrafoNegrita'><label className='flechaTarifas'>»</label>Cambios de vuelo:</Typography>
                                <Typography variant="body2" paragraph className='TypographyparrafoPrimero'>
                                    Para las tarifas basic, light y classic se permiten cambios antes de la salida del vuelo, pero aplican los siguientes cargos adicionales:
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    i) Cargo por cambio: son los cargos adicionales que se generan al cambiar tu vuelo de manera voluntaria (aplican únicamente para las tarifas basic, light y classic).
                                </Typography>
                                <Typography variant="body2" component="div">

                                    <table border="1" cellPadding="10" className='tabla1' >
                                        <thead>
                                            <tr>
                                                <th className='th'>Vuelos nacionales en Colombia</th>
                                                <th className='th'>Vuelos nacionales en Ecuador</th>
                                                <th className='th'>Vuelos internacionales al interior de Suramérica</th>
                                                <th className='th'>Otros vuelos internacionales*</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='tr'>COP 110.000</td>
                                                <td className='tr'>USD 28</td>
                                                <td className='tr'>USD 170</td>
                                                <td className='tr'>USD 200</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <table cellPadding="10" className='tabla1Movil' >
                                        <thead>
                                            <tr>
                                                <th className='thMovil'>Vuelos nacionales en Colombia</th>
                                                <td className='trMovil'>COP 110.000</td>

                                            </tr>
                                            <tr>
                                                <th className='thMovil'>Vuelos nacionales en Ecuador</th>
                                                <td className='trMovil'>USD 28</td>
                                            </tr>
                                            <tr>
                                                <th className='thMovil'>Vuelos internacionales al interior de Suramérica</th>
                                                <td className='trMovil'>USD 170</td>
                                            </tr>
                                            <tr>
                                                <th className='thMovil'>Otros vuelos internacionales*</th>
                                                <td className='trMovil'>USD 200</td>

                                            </tr>

                                        </thead>
                                    </table>
                                </Typography><br />
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    ii) Diferencia de tarifa: es la diferencia en dinero entre la tarifa del tiquete que compraste inicialmente y la nueva opción de tarifa que estás eligiendo (aplica para todas las tarifas).
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    iii) Diferencias generadas por impuestos (aplican según las normativas vigentes de cada país).
                                    Para las tarifas flex y business se permiten cambios antes de la salida del vuelo sin cargo por cambio, pero podrán aplicar cargos por diferencia de tarifa e impuestos.
                                </Typography>

                                <Typography variant="h6" className='TypographyparrafoNegrita'><label className='flechaTarifas'>»</label>Asientos:</Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Los asientos en business class tienen una reclinación de hasta 140° y de hasta 180° en aviones B787, y de hasta 165° en aviones A330(operados por wamos).<br />
                                    Asientos business class: aplica solamente para tarifa businesscon todos sus beneficios.<br />
                                    Asientos plus: están incluidos y sujetos a disponibilidad comprando la tarifa flex.<br />
                                    En algunos de nuestros aviones solo contamos con asientos Economy.
                                </Typography>
                                <Typography variant="h6" className='TypographyparrafoNegrita'><label className='flechaTarifas'>»</label>Reembolsos</Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Aplica para las tarifas flex y business, antes del vuelo. <br />
                                    Los reembolsos después del vuelo no se permiten en ninguna tarifa, excepto ante eventos operacionales. <br />
                                    La condición de reembolso aplica sobre el valor pagado por la tarifa. Los impuestos serán reembolsados de acuerdo con las disposiciones legales aplicables.<br />
                                    Todas nuestras tarifas (basic, light, classic y flex), excepto la business, son tarifas promocionales.<br />
                                    A partir del 1 de junio de 2023, los servicios adicionales que compres para tu reserva y decidas no utilizar, serán reembolsables únicamente si tu tarifa es flex o business. <br />
                                    Los servicios adicionales no prestados por causa imputable a la aerolínea, serán reembolsables para todas las tarifas. <br />
                                    Consulta más información sobre el derecho de retracto, desistimiento y otras leyes según el país en nuestro Centro de ayuda.<br />
                                    Estás obligado a utilizar todos los segmentos de tu itinerario según el plan de vuelo que contrataste. No puedes quedarte en la ciudad de conexión sin continuar hacia tu destino final. Si decides no completar tu itinerario, consideraremos que has completado el viaje desde el origen hasta el destino final programado, y no tendrás derecho a reembolso por los segmentos no volados, excepto por los impuestos y tasas no causadas correspondientes a esos segmentos.<br />

                                </Typography>



                                <Typography variant="h6" className='TypographyparrafoNegrita'><label className='flechaTarifas'>»</label>Servicio prioritario</Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    La tarifa business incluye fila preferencial para atención en counter (check-in), entrega y recepción de equipaje con prioridad y abordaje prioritario.
                                </Typography>
                                <Typography variant="h6" className='TypographyparrafoNegrita'><label className='flechaTarifas'>»</label>Acumulación lifemiles</Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    El precio de la tarifa tomado para el cálculo de las millas no incluye tasas, impuestos o servicios adicionales.<br />
                                    Los socios elite acumulan millas adicionales, el bono elite aplica según el estatus que tenga cada socio:
                                    <table border="1" cellPadding="10" className='tabla2'>
                                        <thead>
                                            <tr>
                                                <th className='th'>Estatus</th>
                                                <th className='th'>Diamond</th>
                                                <th className='th'>Gold</th>
                                                <th className='th'>Silver</th>
                                                <th className='th'>Red Plus</th>
                                                <th className='th'>lifemiles</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='th'>Bono Elite</td>
                                                <td className='tr'>70%</td>
                                                <td className='tr'>50%</td>
                                                <td className='tr'>30%</td>
                                                <td className='tr'>10%</td>
                                                <td className='tr'>0%</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <table cellPadding="10" className='tabla1Movil' >
                                        <thead>
                                            <tr>
                                                <th className='thMovil'>Estatus</th>
                                                <th className='thMovil'>Bono Elite</th>

                                            </tr>
                                            <tr>
                                                <td className='thMovil'>Diamond</td>
                                                <td className='trMovil'>70%</td>
                                            </tr>
                                            <tr>
                                                <td className='thMovil'>Gold</td>
                                                <td className='trMovil'>50%</td>
                                            </tr>
                                            <tr>
                                                <td className='thMovil'>Silver</td>
                                                <td className='trMovil'>30%</td>

                                            </tr>

                                            <tr>
                                                <td className='thMovil'>Red Plus</td>
                                                <td className='trMovil'>10%</td>
                                            </tr>
                                            <tr>
                                                <td className='thMovil'>lifemiles</td>
                                                <td className='trMovil'>0%</td>

                                            </tr>

                                        </thead>
                                    </table>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>



                <React.Fragment>

                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        
                        <DialogContent
                        >
                            <DialogContentText id="alert-dialog-description">
                                <img src={imagen_opcion} />

                            </DialogContentText>
                            <label style={{textDecoration:'underline',
                                 color: '#558bff ',
                                 marginTop:'10px', 
                                 marginLeft:'70px',
                                 fontSize:'15px',
                                 cursor:'pointer'
                                 
                                 }} onClick={clickBasic} >Continuar con basic</label>
                            <button style={{
                                textAlign: 'center',
                                backgroundColor: 'black',
                                width: '250px',
                                color: 'white',
                                padding: '10px',
                                borderRadius: '30px',
                                fontSize: '17px',
                                fontWeight: 'bold',
                                float:'right'
                            }} onClick={clickClassic} >¡Quiero classic!</button>
                        </DialogContent>
                    </Dialog>
                </React.Fragment>

                <React.Fragment>

                    <Dialog
                        open={openClassic}
                        onClose={handleCloseClassic}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        
                        <DialogContent
                        >
                            <DialogContentText id="alert-dialog-description">
                                <img src={imagen_opcion_classic}  style={{ marginTop:'-30px'}}/>

                            </DialogContentText>
                            <label style={{textDecoration:'underline',
                                 color: 'black ',
                                 marginTop:'10px', 
                                 marginLeft:'70px',
                                 fontSize:'15px',
                                 cursor: 'pointer'
                                 
                                 }} onClick={clickClassic} >Continuar con classic</label>
                            <button style={{
                                textAlign: 'center',
                                backgroundColor: 'orange',
                                width: '250px',
                                color: 'white',
                                padding: '10px',
                                border:'none',
                                borderRadius: '30px',
                                fontSize: '17px',
                                fontWeight: 'bold',
                                float:'right'
                            }} onClick={clickFlex} >¡Quiero flex!</button>
                        </DialogContent>
                    </Dialog>
                </React.Fragment>

            </div>
            <div className="div_piePagina">
                <label className="label_piePagina1" >Consulta todas las condiciones de <a className='a_retracto' href="/">retracto y desistimiento </a> aplicables para Colombia.</label >
                <label className="label_piePagina2">© Avianca S.A 2024</label>
            </div>
        </>
    );

}

export default Paso1;
