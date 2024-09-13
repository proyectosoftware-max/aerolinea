
import React, { useState, useEffect, useContext } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { Card, CardContent, CardActions, Button, Grid, darken } from '@mui/material';
import precio_bajo_basic from '../material/barranquilla/precio bajo/basic.jpg';
import precio_bajo_classic from '../material/barranquilla/precio bajo/classic.jpg';
import precio_bajo_flex from '../material/barranquilla/precio bajo/flex.jpg';
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
import imagen_opcion from '../material/opcion.jpg';
import { useNavigate } from 'react-router-dom';
import Popover from '@mui/material/Popover';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import icono from '../material/icono.jpg'
import barraVertical from '../material/barraVertical.jpg';
import iconoAvion from '../material/iconoAvion.jpg';
dayjs.locale('es');



const generateDatesWithPrices = (startDate, count) => {
    const datesWithPrices = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < count; i++) {
        const date = new Date(currentDate);
        //const price = Math.floor(Math.random() * 100000 + 123490); // Genera precios aleatorios
        const price = 223490
        datesWithPrices.push({ date, price });
        currentDate.setDate(currentDate.getDate() + 1); // Incrementa la fecha en 1 día
    }

    return datesWithPrices;
};

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
    const datesWithPrices = generateDatesWithPrices(new Date(), 300); // Genera 30 fechas con precios

    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleItems = 7; // Cantidad de fechas visibles a la vez
    const itemWidth = 170; // Ancho de cada elemento del carrusel
    const totalWidth = itemWidth;
    const carouselWidth = totalWidth * visibleItems; // Ancho total del carrusel visible
    const maxIndex = datesWithPrices.length - visibleItems; // Índice máximo permitido
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

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (vuelo) => {
        setVueloOrigen(vuelo.codigo_origen);
        setVueloDestino(vuelo.codigo_destino);
        setVueloTiempo(vuelo.tiempo_vuelo);
        setVueloSalida(vuelo.hora_salida);
        setVueloLlegada(vuelo.hora_llegada);
        setVueloPrecio(vuelo.valor_pasaje);
        setOpen(true);


    };

    const handleClose = () => {
        setOpen(false);
    };



    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - visibleItems, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + visibleItems, maxIndex));
    };



    useEffect(() => {
        setOrigenNormal(origen.replace(/\s?\(.*?\)/, ''))
        setDestinoNormal(destino.replace(/\s?\(.*?\)/, ''))
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

    const handleDateClick = (date) => {
        setSelectedDate(date);
        change(date);

    };


    const isSelectedDate = (date) => {
        return dayjs(date).isSame(selectedDate, 'day'); // Compara si ambas fechas son el mismo día
    };

    const [expanded, setExpanded] = React.useState(false);

    const handleExpansion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    const clickBotonAccordion = () => {

        navigate(`/resumen/${origenNormal}/${destinoNormal}/${vueloOrigen}/${vueloDestino}/${vueloTiempo}/${vueloPrecio}/${vueloSalida}/${vueloLlegada}/${aeropuertoOrigen.aeropuerto}/${aeropuertoDestino.aeropuerto}`);
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
                <p className='p_salida'><img src={iconoAvion}/>Salida de {origenNormal} <label style={{ marginLeft: '2px', marginRight: '5px' }}>a</label>{destinoNormal}<label style={{fontSize:'14px', marginTop:'-100px', marginLeft:'5px', marginRight:'5px', fontWeight:'bold'}}>—</label><label>{formatoCompleto(selectedDate)}</label></p>
              
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
                            {datesWithPrices.map(({ date, price }, index) => (
                                <div className="carousel-item-content"
                                    key={index} onChange={change} onClick={() => handleDateClick(date)}
                                    style={{
                                        border: isSelectedDate(date) ? '1px solid rgb(123, 214, 123)' : 'none',
                                        fontWeight: isSelectedDate(date) ? 'bold' : 'normal',

                                    }}
                                >
                                    <label className='label_fecha'>{formatDate(date)}</label>
                                    <label className='label_copCarrusel'>Desde<label className='label_precioCarrusel' >${`${formatPrice(price)}`}</label> COP </label>
                                </div>
                            ))}
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
                                > <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '15%', textAlign: 'center', verticalAlign: 'middle' }}>
                                                    <div>
                                                        <label style={{ display: 'block', fontSize: '24px', fontWeight: 'bold' }}>{vuelo.hora_salida}</label>
                                                        <p style={{ marginRight: '20px', fontSize: '20px' }}>{vuelo.codigo_origen}</p>
                                                    </div>
                                                </td>
                                                <td style={{ width: '35%', textAlign: 'center'/*, border: '1px solid blue'*/ }}>
                                                    <div style={{ marginTop: '-10px' }}>
                                                        <label className='label_directo' >Directo {vuelo.tiempo_vuelo}</label>
                                                        <label className='codigoAvion'>codigo avión</label>
                                                        <label className='label_barra' >|</label>
                                                        <label className='label_detallesVuelo' aria-describedby={id} onClick={(event) => abrirVentana(event, vuelo.id)}>Detalles del vuelo</label>
                                                        <img src={rayaAvion} alt="Avion" className='img_rayaAvion' />

                                                    </div>
                                                </td>
                                                <td style={{ width: '25%', textAlign: 'center', verticalAlign: 'middle' }}>
                                                    <div style={{ marginRight: '180px', borderRight: ' 1px solid gray', overflow: 'visible', paddingRight: '50px', height: '70px' }}>
                                                        <label style={{ display: 'block', fontSize: '24px', fontWeight: 'bold' }}>{vuelo.hora_llegada}</label>
                                                        <p style={{ marginLeft: '2px', fontSize: '20px' }}>{vuelo.codigo_destino}</p>
                                                    </div>
                                                </td>
                                                <td style={{ width: '25%', textAlign: 'center', verticalAlign: 'middle' }}>
                                                    <div style={{ marginLeft: '-150px' }}>

                                                        <label style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', marginTop: '-15px' }}>
                                                            ${vuelo.valor_pasaje} COP


                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <p style={{ textAlign: 'center', marginBottom: '30px', fontSize: '25px', fontWeight: 'bold' }}>Elige cómo quieres volar</p>
                                    <Typography>
                                        <Grid container spacing={3} >
                                            <Grid item xs={12} sm={6} md={4} style={{ marginTop: '50px' }}>
                                                <Card sx={{
                                                    maxWidth: 345, margin: '0 auto', borderRadius: '15px', height: '100%', paddingBottom: '50px', boxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                                                    WebkitBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                                                    MozBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)'
                                                }}>
                                                    <CardContent>
                                                        <Typography variant="h5" component="div">

                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            <img src={precio_bajo_basic} style={{ marginTop: '15px', marginBottom: '-5px' }} onClick={handleClickOpen} />
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

                                                        }} onClick={() => handleClickOpen(vuelo)}  >${vuelo.valor_pasaje}COP</Button>
                                                    </CardActions>
                                                    <Typography variant="p" color="text.secondary" sx={{ marginLeft: '120px', fontSize: '12px' }}>
                                                        Precio por pasajero
                                                    </Typography>

                                                </Card>

                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4} style={{ paddingTop: '-10px' }}>
                                                <Card sx={{
                                                    maxWidth: 345, margin: '0 auto', border: '2px solid rgb(204, 51, 140)', borderRadius: '15px', height: '100%', paddingBottom: '50px', boxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                                                    WebkitBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                                                    MozBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)'
                                                }}>
                                                    <CardContent>
                                                        <Typography variant="h5" component="div">

                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            <img src={precio_bajo_classic} style={{ marginTop: '30px', marginBottom: '-5px' }} />
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions sx={{ justifyContent: 'center' }}>
                                                        <Button variant="contained" sx={{
                                                            textTransform: 'none',
                                                            backgroundColor: 'rgb(204, 51, 140)',
                                                            borderRadius: '50px',
                                                            fontSize: '14px',
                                                            height: '45px',
                                                            width: '250px',
                                                            '&:hover': { backgroundColor: darken('rgb(204, 51, 140)', 0.2) }

                                                        }} >Seleccionar</Button>
                                                    </CardActions>
                                                    <Typography variant="p" color="text.secondary" sx={{ marginLeft: '120px', fontSize: '12px' }}>
                                                        Precio por pasajero
                                                    </Typography>

                                                </Card>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4} style={{ marginTop: '50px' }}>
                                                <Card sx={{
                                                    maxWidth: 345, margin: '0 auto', border: '15px', height: '100%', paddingBottom: '50px', boxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                                                    WebkitBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                                                    MozBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)'
                                                }}>
                                                    <CardContent>
                                                        <Typography variant="h5" component="div">

                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            <img src={precio_bajo_flex} style={{ marginTop: '-15px', marginBottom: '1px' }} />
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions sx={{ justifyContent: 'center' }}>
                                                        <Button variant="contained" sx={{
                                                            textTransform: 'none',
                                                            backgroundColor: 'rgb(247, 123, 8)',
                                                            borderRadius: '50px',
                                                            fontSize: '14px',
                                                            height: '45px',
                                                            width: '250px',
                                                            '&:hover': { backgroundColor: darken('rgb(247, 123, 8)', 0.2) }

                                                        }} >Seleccionar</Button>
                                                    </CardActions>
                                                    <Typography variant="p" color="text.secondary" sx={{ marginLeft: '120px', fontSize: '12px' }}>
                                                        Precio por pasajero
                                                    </Typography>

                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </Typography>
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
                        { datosPopover? (
                            <table style={{ textAlign: 'center', width: '100%' }}>
                                <tr style={{ border: '1px solid green' }}  >
                                    <td style={{ border: '1px solid green' }} rowSpan='3' > <img src={barraVertical} /></td>
                                    <td style={{ border: '1px solid green' }}><label>{datosPopover.hora_salida}</label><label>{origenNormal}</label><br />
                                        <label>{aeropuertoOrigen.aeropuerto}</label></td>
                                    <td style={{ border: '1px solid green' }}> <label>Operado por avianca</label><br />
                                        <label>AV9332</label><label> AIRBUS A320</label>
                                    </td>
                                </tr>
                                <tr>

                                    <td style={{ border: '1px solid green' }}>{datosPopover.tiempo_vuelo}</td>
                                    <td style={{ border: '1px solid green' }}></td>
                                </tr>

                                <tr>

                                    <td style={{ border: '1px solid green' }}><label>{datosPopover.hora_llegada}</label><label>{destinoNormal}</label><br />
                                        <label>{aeropuertoDestino.aeropuerto}</label></td>
                                    <td style={{ border: '1px solid green' }}></td>
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

                                style={{ width: '97%' }}
                            >
                                <Typography variant="body2" paragraph style={{ marginTop: '10px', marginBottom: '10px', fontSize: '20px', fontWeight: 'bold' }}>Condiciones tarifarias</Typography>
                            </AccordionSummary >
                            <AccordionDetails >
                                <Typography variant="h6" paragraph className='TypographyparrafoNegrita'>Cambios de vuelo</Typography>
                                <Typography variant="body2" paragraph className='TypographyparrafoPrimero'>
                                    Para las tarifas basic, light y classic se permiten cambios antes de la salida del vuelo, pero aplican los siguientes cargos adicionales:
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Cargo por cambio: son los cargos adicionales que se generan al cambiar tu vuelo de manera voluntaria (aplican únicamente para las tarifas basic, light y classic).
                                </Typography>
                                <Typography variant="body2" component="div">
                                    <table border="1" cellPadding="10" cellSpacing="0" className='tabla1' >
                                        <thead>
                                            <tr>
                                                <th className='th'>Destino</th>
                                                <th>Cargo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='th'>Vuelos nacionales en Colombia</td>
                                                <td className='th'>120.000 COP</td>
                                            </tr>
                                            <tr>
                                                <td className='th'>Vuelos nacionales en Ecuador</td>
                                                <td>30 USD</td>
                                            </tr>
                                            <tr>
                                                <td className='th'>Vuelos internacionales al interior de Suramérica</td>
                                                <td>185 USD</td>
                                            </tr>
                                            <tr>
                                                <td className='th'>Otros vuelos internacionales en las Américas y vuelos hacia Europa</td>
                                                <td>USD/CAD 210</td>
                                            </tr>
                                            <tr>
                                                <td className='th'>Desde Reino Unido</td>
                                                <td>GBP 150</td>
                                            </tr>
                                            <tr>
                                                <td className='th'>Desde el resto de Europa</td>
                                                <td>EUR 180</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Diferencia de tarifa: es la diferencia en dinero entre la tarifa del tiquete que compraste inicialmente y la nueva opción de tarifa que estás eligiendo (aplica para todas las tarifas).
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Diferencias generadas por impuestos: aplican según las normativas vigentes de cada país.
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Para las tarifas flex y business se permiten cambios antes de la salida del vuelo sin cargo por cambio, pero podrán aplicar cargos por diferencia de tarifa e impuestos.
                                </Typography>
                                <Typography variant="h6" className='TypographyparrafoNegrita'>Asientos</Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Ten en cuenta que la reclinación máxima de los asientos en business class puede variar según el tipo de avión.
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Asiento business class, business class (Flatbed) o Premium (de acuerdo al tipo de avión que opera la ruta) están incluidos para la tarifa business con todos sus beneficios.
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Asientos Plus: están incluidos y sujetos a disponibilidad comprando la tarifa flex.
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    En algunos de nuestros aviones solo contamos con asientos Economy.
                                </Typography>
                                <Typography variant="h6" className='TypographyparrafoNegrita'>Reembolsos</Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Aplica para las tarifas flex y business, antes del vuelo.
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Los reembolsos después del vuelo no se permiten en ninguna tarifa, excepto ante eventos operacionales.
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    La condición de reembolso aplica sobre el valor pagado por la tarifa. Los impuestos serán reembolsados de acuerdo con las disposiciones legales aplicables.
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Todas nuestras tarifas (basic, light, classic y flex), excepto la business, son tarifas promocionales.
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    A partir del 1 de junio de 2023, los servicios adicionales que compres para tu reserva y decidas no utilizar, serán reembolsables únicamente si tu tarifa es flex o business.
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Los servicios adicionales no prestados por causa imputable a la aerolínea, serán reembolsables para todas las tarifas.
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Consulta más información sobre el derecho de retracto, desistimiento y otras leyes según el país en nuestro Centro de ayuda.
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Estás obligado a utilizar todos los segmentos de tu itinerario según el plan de vuelo que contrataste. No puedes quedarte en la ciudad de conexión sin continuar hacia tu destino final. Si decides no completar tu itinerario, consideraremos que has completado el viaje desde el origen hasta el destino final programado, y no tendrás derecho a reembolso por los segmentos no volados, excepto por los impuestos y tasas no causadas correspondientes a esos segmentos.
                                </Typography>
                                <Typography variant="h6" className='TypographyparrafoNegrita'>Servicio prioritario</Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    La tarifa business incluye fila preferencial para atención en counter (check-in), entrega y recepción de equipaje con prioridad y abordaje prioritario.
                                </Typography>
                                <Typography variant="h6" className='TypographyparrafoNegrita'>Acumulación lifemiles</Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    El precio de la tarifa tomado para el cálculo de las millas no incluye tasas, impuestos o servicios adicionales.
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Los socios elite acumulan millas adicionales, el bono elite aplica según el estatus que tenga cada socio:
                                </Typography>
                                <Typography variant="body2" component="div" >
                                    <table border="1" cellPadding="10" cellSpacing="0" className='tabla2'>
                                        <thead>
                                            <tr>
                                                <th>Diamond</th>
                                                <th>Gold</th>
                                                <th>Silver</th>
                                                <th>Red Plus</th>
                                                <th>lifemiles</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='setenta'>70%</td>
                                                <td>50%</td>
                                                <td>30%</td>
                                                <td>10%</td>
                                                <td>0%</td>
                                            </tr>
                                        </tbody>
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
                        <DialogTitle id="alert-dialog-title">

                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <img src={imagen_opcion} />

                            </DialogContentText>
                            <button style={{
                                textAlign: 'center',
                                marginTop: '20px',
                                backgroundColor: 'black',
                                width: '250px',
                                color: 'white',
                                padding: '10px',
                                borderRadius: '30px',
                                fontSize: '17px',
                                fontWeight: 'bold',
                                marginLeft: '150px'
                            }} onClick={clickBotonAccordion} >¡Quiero basic!</button>
                        </DialogContent>
                    </Dialog>
                </React.Fragment>

            </div>
        </>
    );

}

export default Paso1;
