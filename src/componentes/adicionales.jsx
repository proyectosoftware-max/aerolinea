import React from "react";
import { useState, useEffect, useContext } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuNavBar from './MenuNavBarPasos2.jsx';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Adulto from '@mui/icons-material/PersonOutline';
import Contacto from '@mui/icons-material/SettingsPhone';
import PiePagina from './PiePagina.jsx';
import { useParams, useNavigate } from "react-router-dom";
import { DataContext } from './Context';
import avionReserva from '../material/avionReserva.jpg';
import codigosPaises from './codigosPaises.jsx';
import flechaAccordion from '../material/flechaAccordion.jpg';
import asiento from '../material/adicionales/asiento.jpg';
import equipaje from '../material/adicionales/equipaje.jpg';
import asistencia from '../material/adicionales/asistencia.jpg';
import equipajeDeportivo from '../material/adicionales/equipajeDeportivo.jpg';
import lounges from '../material/adicionales/lounges.jpg';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

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

const Adicionales = () => {
    const { ida, vuelta, precio, salida, llegada, tiempo, nombre, apellido, telefono } = useParams();
    const { selectedDate } = useContext(DataContext);
    const [value, setValue] = useState(0);
    const [age, setAge] = useState('');
    const [open, setOpen] = useState(false);
    const [showDiv1, setShowDiv1] = useState(true);
    const navigate = useNavigate();

    const enviar = () => {
        navigate(`/paso2/${ida}/${vuelta}/${precio}/${salida}/${llegada}/${tiempo}/${nombre}/${apellido}/${telefono}`);
    }

    const enviarPagos = () => {
        navigate(`/paso3/${ida}/${vuelta}/${precio}/${salida}/${llegada}/${tiempo}/${nombre}/${apellido}/${telefono}`);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    const change = (event) => {
        setAge(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const [expanded, setExpanded] = useState(false);

    const expandir = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleIconClick = (event) => {
        event.stopPropagation(); // Evita que el click expanda el Accordion
        console.log("Icono presionado");
    };

    useEffect(() => {
        let lastScrollTop = 0;

        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop) {
                // Scrolling down - hide div1, show div2
                setShowDiv1(false);
            } else {
                // Scrolling up - show div1, hide div2
                setShowDiv1(true);
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative scrolling
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div className="Adicionales"  >
                <MenuNavBar />
                <div className='div_accordionAdicionales'>

                    <div className="accordionDesativado">
                        <p className="p_datosPersonalesAdicionales">Datos Personales</p>
                        <label className="label_verEditar" onClick={enviar} >ver/Editar</label>
                        <img onClick={enviar} src={flechaAccordion} className='img_fechaAccordion' />
                    </div>



                    <div className='accordionAdicionales'>
                        <label className="label_ServiciosAdicionales" >Servicios adicionales</label>
                        <div className="contendorAdicionales">
                            <div className="div_adicionales">
                                <div className='contenedorImagen'>
                                    <img className="img_adicionales" src={asiento} />
                                </div>

                                <div className="div_contendio">
                                    <p className="p_elije"> Elige tu asiento</p>
                                    <p className="p_texto">Vuela en tu asiento favorito y con mejor precio que en el aeropuerto.</p>
                                    <div>
                                        <p className="p_desde" >Desde</p>
                                        <label className="p_precioAdicionalesCard">$20.000</label><label className="p_copAdicionales">COP</label>
                                    </div>
                                </div>
                            </div>
                            <div className="div_adicionales">
                                <div className='contenedorImagen'>
                                    <img className="img_adicionales" src={equipaje} />
                                </div>
                                <div className="div_contendio">
                                    <p className="p_elije">Equipaje adicional</p>
                                    <p className="p_texto">¡No esperes al aeropuerto! Ahorra tiempo y dinero añadiéndolo ahora.</p>
                                    <div>
                                        <p className="p_desde">Desde</p>
                                        <label className="p_precioAdicionalesCard">$65.000</label><label className="p_copAdicionales">COP</label>
                                    </div>
                                </div>
                            </div>
                            <div className="div_adicionales">
                                <div className='contenedorImagen'>
                                    <img className="img_adicionales" src={asistencia} />
                                </div>
                                <div className="div_contendio">
                                    <p className="p_elije"> Asistencia en viajes</p>
                                    <p className="p_texto">Cobertura médica, legal y de imprevistos, en tu próximo destino.</p>
                                    <div>
                                        <p className="p_desde">Desde</p>
                                        <label className="p_precioAdicionalesCard">$34.000</label><label className="p_copAdicionales">COP</label>
                                    </div>
                                </div>
                            </div>
                            <div className="div_adicionales" >
                                <div className='contenedorImagen'>
                                    <img className="img_adicionales" src={lounges} />
                                </div>
                                <div className="div_contendio">
                                    <p className="p_elije">Avianca Louges</p>
                                    <p className="p_texto">Espera tu vuelo con todas las comodidades</p>
                                    <div>
                                        <p className="p_desde">Desde</p>
                                        <label className="p_precioAdicionalesCard">$126.000</label><label className="p_copAdicionales">COP</label>
                                        <img />
                                    </div>
                                </div>
                            </div>
                            <div className="div_adicionales" >
                                <div className='contenedorImagen'>
                                    <img className="img_adicionales" src={equipajeDeportivo} />
                                </div>
                                <div className="div_contendio">
                                    <p className="p_elije">Equipaje deportivo</p>
                                    <p className="p_texto">Con nosotros puedes volar y llevar tu pasión a todas partes!</p>
                                    <div>
                                        <p className="p_desde">Desde</p>
                                        <label className="p_precioAdicionalesCard">$85.000</label><label className="p_copAdicionales">COP</label>
                                        <img />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <div className={`div_datosAdicionalesScroll ${showDiv1 ? 'show' : 'hide'}`} >
                    <div className='contenedor_datosAdicionales'>

                        <div className="div_fechaAdicionales" >
                            <p className="p_fechaAdicionales">{formatDate(selectedDate)}</p>
                            <label className="label_idasalidaAdicionales">
                                <p className='p_idaAdicionales'>{ida}</p>
                                <p className='p_salidaAdicionales'>{salida}</p>
                            </label>
                            <img src={avionReserva} className="img_avion" />
                            <label className="label_vueltallegadaAdicionales">
                                <p className='p_vueltaAdicionales'>{vuelta}</p>
                                <p className='p_llegadaAdicionales'>{llegada}</p>
                            </label>
                        </div>
                        <div className="div_adultoAdicionales">
                            <p className='p_pasajerosAdicionales'>Pasajeros</p>
                            <p className='p_adultoAdicionales'>1 Adulto</p>
                        </div>
                        <div className="div_totalPasajeroAdicionales">
                            <p className='p_totalPasajerosAdicionales'>Total para 1 pasajero</p>
                            <p className='p_precioAdicionales'>${precio}<label className='label_copAdicionales'>COP</label></p>
                            <p className='p_totalReservaAdicionales'>Total de tu reserva</p>
                        </div>
                        <div className='div_boton_continuaAdicionales'>

                            <button className='boton_continuaAdicionales' onClick={enviarPagos} >
                                Continuar y pagar
                            </button>
                        </div>

                    </div>

                    <button className='boton_continuaAdicionalesMovil' onClick={enviarPagos} >
                        Continuar y pagar
                    </button>

                    <div className="contenedor_datosAdicionalesMovil">
                        <label className="TextorResumenAdicionalesViajeMovil">Resumen del viaje</label>
                        <label className='label_precioAdicionalesMovil'>
                            ${precio}<label className='label_copAdicionalesMovil'>COP
                            </label>
                            <p className="TotalReservaMovil">Total de tu reserva</p>
                        </label>
                    </div>


                </div>

                <div className={`div_datosAdicionales ${!showDiv1 ? 'show' : 'hide'}`} >
                    <div className='contenedor_datosAdicionales'>

                        <div className="div_fechaAdicionales" >
                            <p className="p_fechaAdicionales">{formatDate(selectedDate)}</p>
                            <label className="label_idasalidaAdicionales">
                                <p className='p_idaAdicionales'>{ida}</p>
                                <p className='p_salidaAdicionales'>{salida}</p>
                            </label>
                            <img src={avionReserva} className="img_avion" />
                            <label className="label_vueltallegadaAdicionales">
                                <p className='p_vueltaAdicionales'>{vuelta}</p>
                                <p className='p_llegadaAdicionales'>{llegada}</p>
                            </label>
                        </div>
                        <div className="div_adultoAdicionales">
                            <p className='p_pasajerosAdicionales'>Pasajeros</p>
                            <p className='p_adultoAdicionales'>1 Adulto</p>
                        </div>
                        <div className="div_totalPasajeroAdicionales">
                            <p className='p_totalPasajerosAdicionales'>Total para 1 pasajero</p>
                            <p className='p_precioAdicionales'>${precio}<label className='label_copAdicionales'>COP</label></p>
                            <p className='p_totalReservaAdicionales'>Total de tu reserva</p>
                        </div>
                        <div className='div_boton_continuaAdicionales'>

                            <button className='boton_continuaAdicionales' onClick={enviarPagos} >
                                Continuar y pagar
                            </button>
                        </div>

                    </div>

                    <button className='boton_continuaAdicionalesMovil' onClick={enviarPagos} >
                        Continuar y pagar
                    </button>

                    <div className="contenedor_datosAdicionalesMovil">
                        <label className="TextorResumenAdicionalesViajeMovil">Resumen del viaje</label>
                        <label className='label_precioAdicionalesMovil'>
                            ${precio}<label className='label_copAdicionalesMovil'>COP
                            </label>
                            <p className="TotalReservaMovil">Total de tu reserva</p>
                        </label>
                    </div>

                </div>
                <div className="div_piePagina">
                <label className="label_piePagina1" >Consulta todas las condiciones de <a className='a_retracto' href="/">retracto y desistimiento </a> aplicables para Colombia.</label >
                <label className="label_piePagina2">© Avianca S.A 2024</label>
            </div>
            </div>

        </>


    );
}

export default Adicionales;

