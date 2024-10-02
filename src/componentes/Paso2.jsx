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
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from './Context';
import avionReserva from '../material/avionReserva.jpg';
import codigosPaises from './codigosPaises.jsx';
import lifesMiles from './lifesMiles.jsx';
import signoMas from '../material/signoMas.jpg';
import signoEquis from '../material/signoEquis.jpg';
import { Container, Navbar, Nav } from 'react-bootstrap';
import FormControlLabel from '@mui/material/FormControlLabel';
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

const Paso2 = () => {

    const { ida, vuelta, precio, salida, llegada, tiempo, nombre, apellido } = useParams();
    const { selectedDate } = useContext(DataContext);
    const [nombrePasajero, setNombrePasajero] = useState('Pasajero');
    const [apellidoPasajero, setApellidoPasajero] = useState('');
    const [nombreInicial, setNombreInicial] = useState('');
    const [apellidoInicial, setApellidoInicial] = useState('');
    const [correo, setCorreo] = useState('');
    const [value, setValue] = useState(0);
    const [paisIndicativo, setPaisIndicativo] = useState('Colombia (+57)');
    const [telefono, setTelefono] = useState('');
    const [nombreAdulto, setNombreAdulto] = useState('Adulto');
    const [activar, setActivar] = useState(false);
    const [activarTodo, setActivarTodo] = useState(false);
    const [lifes, setLifes] = useState('lifemiles');
    const [checklifes, setChecklifes] = useState(false);
    const [checkservicios, setCheckservicios] = useState(false);
    const [checkAceptar, setCheckAceptar] = useState(false);
    const [checkRecibir, setCheckRecibir] = useState(false);
    const [errorNombre, setErrorNombre] = useState(false);
    const [errorApellido, setErrorApellido] = useState(false);
    const [errorCorreo, setErrorCorreo] = useState(false);
    const [errorTelefono, setErrorTelefono] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (nombre == 'nombre' && apellido == 'apellido' && telefono == 'telefono') {
            setNombreAdulto('Adulto');
            setNombrePasajero('Pasajero');


        } else if (nombre != 'nombre' && apellido != 'apellido' && telefono != 'telefono') {
            setNombreAdulto(nombre);
            setNombrePasajero(nombre);
            setApellidoPasajero(apellido);
            setTelefono(telefono);
        }



    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {

        if (nombreInicial.trim() === 'Pasajero' || nombreInicial.trim() === '' || apellidoInicial.trim() === '') {
            setActivar(false);


        } else {
            setActivar(true);
        }
        console.log('Activar: ' + activar);
    }, [nombreInicial, apellidoInicial]);

    useEffect(() => {

        if (correo.trim() === '' || telefono.trim() === '') {
            setActivarTodo(false);


        } else {
            setActivarTodo(true);
        }

    }, [correo, telefono]);

    const changeNombre = (e) => {
        setNombrePasajero(e.target.value);
        setNombreAdulto(e.target.value);
        setNombreInicial(e.target.value);

        if (e.target.value.trim() === '') {
            setErrorNombre(true);
        } else {
            setErrorNombre(false);
        }
    }

    const changeApellido = (e) => {
        setApellidoPasajero(e.target.value);
        setApellidoInicial(e.target.value);

        if (e.target.value.trim() === '') {
            setErrorApellido(true);
        } else {
            setErrorApellido(false);
        }
    }

    const changePaisIndicativo = (event) => {
        setPaisIndicativo(event.target.value);
        console.log('Valor: ' + paisIndicativo);
    };

    const changeCorreo = (event) => {
        setCorreo(event.target.value);

        if (e.target.value.trim() === '') {
            setErrorCorreo(true);
        } else {
            setErrorCorreo(false);
        }
    };

    const changeTelefono = (event) => {
        setTelefono(event.target.value);
        console.log('Valor: ' + paisIndicativo);

        if (e.target.value.trim() === '') {
            setErrorTelefono(true);
        } else {
            setErrorTelefono(false);
        }
    };

    const changelifes = (event) => {
        setLifes(event.target.value);
        console.log('Valor: ' + lifes);
    };

    const changeCheckLifes = () => {
        setChecklifes(!checklifes);
    }

    const changeCheckAceptar = (event) => {
        setCheckAceptar(!checkAceptar);
        console.log('Valor: ' + lifes);
    };

    const changeCheckRecibir = () => {
        setCheckRecibir(!checkRecibir);
    }


    const changeCheckServicios = () => {
        setCheckservicios(!checkservicios);
    }


    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const enviar = () => {
        navigate(`/adicionales/${ida}/${vuelta}/${precio}/${salida}/${llegada}/${tiempo}/${nombrePasajero}/${apellidoPasajero}/${telefono}`);
    }

    const [showDiv1, setShowDiv1] = useState(true);

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

    // Función para cambiar de tab sin importar si hay validaciones
    const cambiarTab = () => {
        // Validar ambos campos
        let valid = true;

        if (nombrePasajero.trim() === 'Pasajero' || nombrePasajero.trim() === '') {
            setErrorNombre(true);
            valid = false;
        } else {
            setErrorNombre(false);
        }

        if (apellidoPasajero.trim() === '') {
            setErrorApellido(true);
            valid = false;
        } else {
            setErrorApellido(false);
        }

        console.log('Hola');
        // Si ambos campos son válidos, pasar al Tab 2
        if (valid) {
            setValue(1);
        }
    }



    return (
        <>
            <div className="paso2"  >
                <MenuNavBar />

                <div className='div_accordion_paso2'>

                    <Accordion className='accordionPaso2' defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"

                            style={{ width: '97%' }}
                        >
                            <Typography variant="p" paragraph className='textoDatosPersonales'>Datos Personales</Typography>
                        </AccordionSummary >
                        <AccordionDetails >
                            <Box className='BoxPaso2' sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1 }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
                                        TabIndicatorProps={{
                                            sx: {
                                                display: 'none',  // Esconde el indicador de selección (línea)
                                            },
                                        }}
                                        sx={{
                                            minHeight: '15px', // Reduce la altura mínima de los Tabs
                                        }}

                                    >
                                        <Tab icon={<Adulto />} label={nombreAdulto}


                                            {...a11yProps(0)}
                                            onChange={changeNombre}
                                            iconPosition="start"

                                            sx={{
                                                minHeight: '15px',
                                                color: "black", // Color de texto negro siempre
                                                '&.Mui-selected': {
                                                    color: "black", // Asegurar que también sea negro cuando esté seleccionado

                                                }, '&:focus': {
                                                    outline: 'none', // Eliminar borde azul en enfoque
                                                },
                                            }}

                                        />
                                        <Tab icon={<Contacto />} label="Contacto" {...a11yProps(1)}

                                            iconPosition="start"
                                            sx={{
                                                minHeight: '15px',
                                                color: "black", // Color de texto negro siempre
                                                '&.Mui-selected': {
                                                    color: "black", // Asegurar que también sea negro cuando esté seleccionado
                                                },
                                            }}

                                        />

                                    </Tabs>
                                </Box>
                                <CustomTabPanel value={value} index={0}>
                                    <div>
                                        <label className='label_pasajero' >{`${nombrePasajero} ${apellidoPasajero}`}</label><label>-</label><label className="label_adulto">Adulto1</label><br />
                                        <label>Ingresa el nombre y primer apellido (de cada pasajero) tal y como aparecen en el pasaporte o documento de identidad.</label>
                                        <div>
                                            <TextField id="outlined-basic" label="Nombre" variant="standard"
                                                error={errorNombre}
                                                helperText={errorNombre ? 'Por favor, ingresa tu primer nombre.' : ''}
                                                onChange={changeNombre}
                                                value={nombreInicial}
                                                InputLabelProps={{
                                                    style: {
                                                        fontSize: '24px', // Tamaño inicial del label
                                                        transition: 'font-size 0.8s ease', // Transición lenta
                                                        color: 'black',

                                                    },
                                                }}
                                                InputProps={{
                                                    style: { fontSize: '20px' }, // Tamaño del texto dentro del campo
                                                }}
                                                // Utiliza el estilo para el estado enfocado
                                                sx={{
                                                    '& .MuiInputLabel-root.Mui-focused': {
                                                        fontSize: '100px', // Tamaño del label al estar enfocado
                                                    },
                                                }}

                                            />
                                            <TextField id="outlined-basic" label="Apellido" variant="standard"
                                                error={errorApellido}
                                                helperText={errorApellido ? 'Por favor, ingresa tu primer apellido.' : ''}
                                                onChange={changeApellido}
                                                value={apellidoInicial}
                                                InputLabelProps={{
                                                    style: {
                                                        fontSize: '24px', // Tamaño inicial del label
                                                        transition: 'font-size 0.8s ease', // Transición lenta
                                                        color: 'black',

                                                    },
                                                }}
                                                InputProps={{
                                                    style: { fontSize: '20px' }, // Tamaño del texto dentro del campo
                                                }}
                                                // Utiliza el estilo para el estado enfocado
                                                sx={{
                                                    '& .MuiInputLabel-root.Mui-focused': {
                                                        fontSize: '100px', // Tamaño del label al estar enfocado
                                                    },
                                                }}

                                            />
                                            <div className="div_check" >
                                                <FormControlLabel control={<Checkbox
                                                    checked={checklifes}
                                                    onChange={changeCheckLifes}

                                                    sx={{
                                                        color: 'green',
                                                        '&.Mui-checked': {
                                                            color: 'green',
                                                        },
                                                    }}
                                                />} label="Tengo un número de viajero frecuente lifemiles o de otra aerolínea aliada (opcional)." />

                                                {checklifes && (
                                                    <div className="div_lifeMiles">
                                                        <FormControl >

                                                            <InputLabel id="demo-simple-select-label"

                                                                sx={{
                                                                    '&.Mui-focused': {
                                                                        color: "black",
                                                                        fontWeight: 'bold'

                                                                    }
                                                                }}

                                                            >Programa de viajero frecuente*</InputLabel>
                                                            <Select

                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                defaultValue={lifes}
                                                                label="Contacto"
                                                                onChange={changelifes}
                                                                variant="standard"

                                                                MenuProps={{
                                                                    PaperProps: {
                                                                        style: {
                                                                            // Ajusta el ancho y la posición según tus necesidades
                                                                            width: '200px',
                                                                            height: '200px',
                                                                            // Usa Popper.placements para definir la posición
                                                                            position: 'absolute',
                                                                            top: '100%',
                                                                        },
                                                                    },
                                                                }}


                                                                sx={{
                                                                    width: '300px',
                                                                    fontSize: '25px',
                                                                    color: 'black',

                                                                }}

                                                            >

                                                                {lifesMiles.map((lista, index) => (
                                                                    <MenuItem key={index} value={`${lista.nombre}`}

                                                                        sx={{
                                                                            '&:hover': {
                                                                                color: 'black', // Cambiar el color de la letra al pasar el cursor
                                                                            }
                                                                        }}

                                                                    >
                                                                        {`${lista.nombre}`}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>

                                                        <TextField id="outlined-basic" label="Programa de viajero frecuente*" variant="standard"

                                                            InputLabelProps={{
                                                                style: {
                                                                    fontSize: '24px', // Tamaño inicial del label
                                                                    transition: 'font-size 0.8s ease', // Transición lenta
                                                                    color: 'black',

                                                                },
                                                            }}
                                                            InputProps={{
                                                                style: { fontSize: '20px' }, // Tamaño del texto dentro del campo
                                                            }}
                                                            // Utiliza el estilo para el estado enfocado
                                                            sx={{
                                                                '& .MuiInputLabel-root.Mui-focused': {
                                                                    fontSize: '100px', // Tamaño del label al estar enfocado
                                                                },
                                                            }}

                                                        />
                                                    </div>)}<br />
                                                <FormControlLabel control={<Checkbox

                                                    checked={checkservicios}
                                                    onChange={changeCheckServicios}
                                                    sx={{
                                                        color: 'green',
                                                        '&.Mui-checked': {
                                                            color: 'green',
                                                        },
                                                    }}
                                                />} label="Necesito asistencia especial (opcional)." />

                                                {checkservicios && (
                                                    <div className="div_asisteciaEspecial">
                                                        <label className="label_servicios">Si alguno de los servicios que requieres no se encuentra en la lista, comunícate directamente con nuestro Contact Center y con gusto te ayudaremos.</label>
                                                        <button className="boton_aisitenciaEspecial">Pasajero con discapcidad visual
                                                            <img src={signoMas} className='signoMas' /> </button>

                                                        <button className="boton_aisitenciaEspecial">Pasajero con discapcidad visual  <img src={signoMas} className='signoMas' /></button>
                                                        <button className="boton_aisitenciaEspecial">Animal de servicio  <img src={signoMas} className='signoMas' /></button>
                                                        <button className="boton_aisitenciaEspecial">Animal de soporte emocional  <img src={signoMas} className='signoMas' /></button>
                                                        <button className="boton_aisitenciaEspecial">Silla de ruedas hasta asiento  <img src={signoMas} className='signoMas' /></button>
                                                        <button className="boton_aisitenciaEspecial">Silla de ruedas hasta rampa  <img src={signoMas} className='signoMas' /></button>
                                                        <button className="boton_aisitenciaEspecial">Silla de ruedas para subir y bajar escaleras  <img src={signoMas} className='signoMas' /></button>
                                                        <button className="boton_aisitenciaEspecial">Silla de ruedas a bordo  <img src={signoMas} className='signoMas' /></button>
                                                        <button className="boton_aisitenciaEspecial">Silla de rudas manual  <img src={signoMas} className='signoMas' /></button>
                                                        <label className='label_sinCosto'>Los servicios de asistencia especial no tienen un costo adicional.  <img src={signoMas} className='signoMas' /></label>
                                                    </div>)}

                                            </div>
                                        </div>
                                    </div>
                                    <button className="boton_infoContacto" onClick={cambiarTab} disabled={!activar} style={{ backgroundColor: activar ? 'black' : 'gray' }}>Información de contacto</button>
                                </CustomTabPanel>

                                <CustomTabPanel value={value} index={1}>

                                    <div>
                                        <label>Información de contacto {paisIndicativo}</label><br />
                                        <label>Utilizaremos este correo para informarte sobre tu reserva, administrar cambios y reembolsos. Al continuar aceptas nuestra política de privacidad.</label>
                                        <div>
                                            <TextField id="outlined-basic" label="Correo" variant="standard"
                                                error={errorCorreo}
                                                helperText={errorCorreo ? 'Por favor, ingresa tu correo electrónico.' : ''}
                                                value={correo}
                                                onChange={changeCorreo}
                                                InputLabelProps={{
                                                    style: {
                                                        fontSize: '24px', // Tamaño inicial del label
                                                        transition: 'font-size 0.8s ease', // Transición lenta
                                                        color: 'black',

                                                    },
                                                }}
                                                InputProps={{
                                                    style: { fontSize: '20px' }, // Tamaño del texto dentro del campo
                                                }}
                                                // Utiliza el estilo para el estado enfocado
                                                sx={{
                                                    '& .MuiInputLabel-root.Mui-focused': {
                                                        fontSize: '100px', // Tamaño del label al estar enfocado
                                                    },
                                                }}

                                            />

                                            <FormControl >

                                                <InputLabel id="demo-simple-select-label"

                                                    sx={{
                                                        '&.Mui-focused': {
                                                            color: "black",
                                                            fontWeight: 'bold'

                                                        }
                                                    }}

                                                >Codigo de área</InputLabel>
                                                <Select

                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    defaultValue={paisIndicativo}
                                                    label="Contacto"
                                                    onChange={changePaisIndicativo}
                                                    variant="standard"

                                                    MenuProps={{
                                                        PaperProps: {
                                                            style: {
                                                                // Ajusta el ancho y la posición según tus necesidades
                                                                width: '200px',
                                                                height: '200px',
                                                                // Usa Popper.placements para definir la posición
                                                                position: 'absolute',
                                                                top: '100%',
                                                            },
                                                        },
                                                    }}

                                                    sx={{
                                                        width: '300px',
                                                        fontSize: '25px',
                                                        color: 'black',

                                                    }}

                                                >

                                                    {codigosPaises.map((pais, index) => (
                                                        <MenuItem key={index} value={`${pais.nombre} (${pais.código})`}

                                                            sx={{
                                                                '&:hover': {
                                                                    color: 'black', // Cambiar el color de la letra al pasar el cursor
                                                                }
                                                            }}

                                                        >
                                                            {`${pais.nombre} (${pais.código})`}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>

                                            <TextField id="outlined-basic" label="Número de teléfono" variant="standard"
                                                error={errorTelefono}
                                                helperText={errorTelefono ? 'Este campo es obligatorio.' : ''}
                                                onChange={changeTelefono}
                                                value={telefono}
                                                InputLabelProps={{
                                                    style: {
                                                        fontSize: '24px', // Tamaño inicial del label
                                                        transition: 'font-size 0.8s ease', // Transición lenta
                                                        color: 'black',

                                                    },
                                                }}
                                                InputProps={{
                                                    style: { fontSize: '20px' }, // Tamaño del texto dentro del campo
                                                }}
                                                // Utiliza el estilo para el estado enfocado
                                                sx={{
                                                    '& .MuiInputLabel-root.Mui-focused': {
                                                        fontSize: '100px', // Tamaño del label al estar enfocado
                                                    },
                                                }}

                                            />

                                            <div>
                                                <br />

                                                <FormControlLabel control={<Checkbox

                                                    sx={{
                                                        color: 'green',
                                                        '&.Mui-checked': {
                                                            color: 'green',
                                                        },
                                                    }}

                                                    checked={checkAceptar}
                                                    onChange={changeCheckAceptar}

                                                />} label="Acepto el uso de mis datos personales para recibir promociones, ofertas y novedades que Avianca tiene para mí." /><br />
                                                <FormControlLabel control={<Checkbox

                                                    sx={{
                                                        color: 'green',
                                                        '&.Mui-checked': {
                                                            color: 'green',
                                                        },
                                                    }}

                                                    checked={checkRecibir}
                                                    onChange={changeCheckRecibir}

                                                />} label="Recibir mis datos para futuras compras." />


                                            </div>
                                            <button className="boton_infoContacto" onClick={enviar} disabled={!activarTodo} style={{ backgroundColor: activarTodo ? 'black' : 'gray' }}>Guardar y continuar</button>



                                        </div>



                                    </div>
                                </CustomTabPanel>
                            </Box>


                            {/** BoxMovil */}
                            <Box className='BoxPaso2Movil' sx={{ width: '100%'}}>




                                <div>
                                    <label className='label_pasajero' >{`${nombrePasajero} ${apellidoPasajero}`}</label><label>-</label><label className="label_adulto">Adulto1</label><br />
                                    <label className="label_NombreApellido">Ingresa el nombre y primer apellido (de cada pasajero) tal y como aparecen en el pasaporte o documento de identidad.</label>
                                    <div>
                                        <TextField id="standard-size-normal" label="Nombre" variant="standard"
                                            error={errorNombre}
                                            helperText={errorNombre ? 'Por favor, ingresa tu primer nombre.' : ''}
                                            onChange={changeNombre}
                                            value={nombreInicial}
                                            InputLabelProps={{
                                                style: {
                                                    fontSize: '17px', // Tamaño inicial del label
                                                    transition: 'font-size 0.8s ease', // Transición lenta
                                                    color: 'black',

                                                }
                                            }}
                                            sx={{

                                                input: {
                                                    fontSize: '17px',

                                                },
                                                marginTop: '15px'
                                            }}
                                            fullWidth

                                        />
                                        <TextField id="standard-size-normal" label="Apellido" variant="standard"
                                            error={errorApellido}
                                            helperText={errorApellido ? 'Por favor, ingresa tu primer apellido.' : ''}
                                            onChange={changeApellido}
                                            value={apellidoInicial}
                                            InputLabelProps={{
                                                style: {
                                                    fontSize: '17px', // Tamaño inicial del label
                                                    transition: 'font-size 0.8s ease', // Transición lenta
                                                    color: 'black',
                                                }
                                            }}

                                            sx={{
                                                input: {
                                                    fontSize: '17px',
                                                }
                                            }}
                                            fullWidth
                                        />
                                        <div className="div_check" >
                                            <FormControlLabel control={<Checkbox
                                                checked={checklifes}
                                                onChange={changeCheckLifes}

                                                sx={{
                                                    color: 'green',
                                                    '&.Mui-checked': {
                                                        color: 'green',
                                                    },
                                                }}
                                            />} label="Tengo un número de viajero frecuente lifemiles o de otra aerolínea aliada (opcional)."

                                                sx={{

                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: '12px', // Cambia el tamaño del label aquí
                                                    }
                                                }}

                                            />

                                            {checklifes && (
                                                <div className="div_lifeMiles">
                                                    <FormControl >
                                                        <Select

                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            defaultValue={lifes}
                                                            label="Programa de viajero frecuente*"
                                                            onChange={changelifes}
                                                            variant="standard"

                                                            MenuProps={{
                                                                PaperProps: {
                                                                    style: {
                                                                        // Ajusta el ancho y la posición según tus necesidades
                                                                        width: '200px',
                                                                        height: '200px',
                                                                        // Usa Popper.placements para definir la posición
                                                                        position: 'absolute',
                                                                        top: '100%',
                                                                    },
                                                                },
                                                            }}


                                                            sx={{
                                                                width: '300px',
                                                                fontSize: '17px',
                                                                color: 'black',

                                                            }}

                                                        >

                                                            {lifesMiles.map((lista, index) => (
                                                                <MenuItem key={index} value={`${lista.nombre}`}

                                                                    sx={{
                                                                        '&:hover': {
                                                                            color: 'black', // Cambiar el color de la letra al pasar el cursor
                                                                        }
                                                                    }}

                                                                >
                                                                    {`${lista.nombre}`}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>

                                                    <TextField id="standard-size-normal" label="Programa de viajero frecuente*" variant="standard"

                                                        InputLabelProps={{
                                                            style: {
                                                                fontSize: '17px', // Tamaño inicial del label
                                                                transition: 'font-size 0.8s ease', // Transición lenta
                                                                color: 'black',

                                                            }
                                                        }}
                                                        sx={{

                                                            input: {
                                                                fontSize: '17px',

                                                            },
                                                            marginTop: '15px'
                                                        }}
                                                        fullWidth

                                                    />
                                                </div>)}<br />
                                            <FormControlLabel control={<Checkbox

                                                checked={checkservicios}
                                                onChange={changeCheckServicios}
                                                sx={{
                                                    color: 'green',
                                                    '&.Mui-checked': {
                                                        color: 'green',
                                                    },
                                                }}
                                            />} label="Necesito asistencia especial (opcional)."

                                                sx={{

                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: '13px', // Cambia el tamaño del label aquí
                                                    }
                                                }}

                                            />

                                            {checkservicios && (
                                                <div className="div_asisteciaEspecial">
                                                    <label className="label_servicios">Si alguno de los servicios que requieres no se encuentra en la lista, comunícate directamente con nuestro Contact Center y con gusto te ayudaremos.</label>
                                                    <button className="boton_aisitenciaEspecial">Pasajero con discapcidad visual
                                                        <img src={signoMas} className='signoMas' /> </button>

                                                    <button className="boton_aisitenciaEspecial">Pasajero con discapcidad visual  <img src={signoMas} className='signoMas' /></button>
                                                    <button className="boton_aisitenciaEspecial">Animal de servicio  <img src={signoMas} className='signoMas' /></button>
                                                    <button className="boton_aisitenciaEspecial">Animal de soporte emocional  <img src={signoMas} className='signoMas' /></button>
                                                    <button className="boton_aisitenciaEspecial">Silla de ruedas hasta asiento  <img src={signoMas} className='signoMas' /></button>
                                                    <button className="boton_aisitenciaEspecial">Silla de ruedas hasta rampa  <img src={signoMas} className='signoMas' /></button>
                                                    <button className="boton_aisitenciaEspecial">Silla de ruedas para subir y bajar escaleras  <img src={signoMas} className='signoMas' /></button>
                                                    <button className="boton_aisitenciaEspecial">Silla de ruedas a bordo  <img src={signoMas} className='signoMas' /></button>
                                                    <button className="boton_aisitenciaEspecial">Silla de rudas manual  <img src={signoMas} className='signoMas' /></button>
                                                    <label className='label_sinCosto'>Los servicios de asistencia especial no tienen un costo adicional.  <img src={signoMas} className='signoMas' /></label>
                                                </div>)}

                                        </div>
                                    </div>
                                </div>


                                <div>
                                    <label>{<Contacto />}</label><label style={{ marginLeft: '5px' }}>Información de contacto</label><br />
                                    <label style={{ fontSize: '13px' }} >Estos datos serán utilizados para informarte sobre tu reserva.
                                    </label>
                                    <div>
                                        <TextField id="standard-size-normal" label="Correo" variant="standard"
                                            error={errorCorreo}
                                            helperText={errorCorreo ? 'Por favor, ingresa tu correo electrónico.' : ''}
                                            value={correo}
                                            onChange={changeCorreo}
                                            InputLabelProps={{
                                                style: {
                                                    fontSize: '17px', // Tamaño inicial del label
                                                    transition: 'font-size 0.8s ease', // Transición lenta
                                                    color: 'black',

                                                },
                                            }}
                                            sx={{

                                                input: {
                                                    fontSize: '17px',

                                                },
                                                marginTop: '15px',
                                                marginBottom: '20px'
                                            }}
                                            fullWidth

                                        />

                                        <FormControl >

                                            <InputLabel id="demo-simple-select-label"

                                                sx={{
                                                    '&.Mui-focused': {
                                                        fontWeight: 'bold',
                                                        marginTop: '10px',
                                                        color: 'rgba(0, 0, 0, 0.521)'

                                                    },
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    color: 'rgba(0, 0, 0, 0.521)'
                                                }}

                                            >Codigo de área</InputLabel>
                                            <Select

                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={paisIndicativo}
                                                label="Contacto"
                                                onChange={changePaisIndicativo}
                                                variant="standard"

                                                MenuProps={{
                                                    PaperProps: {
                                                        style: {
                                                            // Ajusta el ancho y la posición según tus necesidades
                                                            width: '200px',
                                                            height: '200px',
                                                            // Usa Popper.placements para definir la posición
                                                            position: 'absolute',
                                                            top: '100%',
                                                        },
                                                    },
                                                }}

                                                sx={{
                                                    width: '300px',
                                                    fontSize: '17px',
                                                    color: 'black',

                                                }}

                                            >

                                                {codigosPaises.map((pais, index) => (
                                                    <MenuItem key={index} value={`${pais.nombre} (${pais.código})`}

                                                        sx={{
                                                            '&:hover': {
                                                                color: 'black', // Cambiar el color de la letra al pasar el cursor
                                                            }
                                                        }}

                                                    >
                                                        {`${pais.nombre} (${pais.código})`}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                        <TextField id="standard-size-normal" label="Número de teléfono" variant="standard"
                                            error={errorTelefono}
                                            helperText={errorTelefono ? 'Este campo es obligatorio.' : ''}
                                            onChange={changeTelefono}
                                            value={telefono}
                                            InputLabelProps={{
                                                style: {
                                                    fontSize: '17px', // Tamaño inicial del label
                                                    transition: 'font-size 0.8s ease', // Transición lenta
                                                    color: 'black',

                                                },
                                            }}
                                            sx={{

                                                input: {
                                                    fontSize: '17px',

                                                },
                                                marginTop: '15px'
                                            }}
                                            fullWidth

                                        />

                                        <div>
                                            <br />

                                            <FormControlLabel control={<Checkbox

                                                sx={{
                                                    color: 'green',
                                                    '&.Mui-checked': {
                                                        color: 'green',
                                                    },
                                                }}

                                                checked={checkAceptar}
                                                onChange={changeCheckAceptar}

                                            />} label="Acepto el uso de mis datos personales para recibir promociones, ofertas y novedades que Avianca tiene para mí."

                                                sx={{

                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: '12px', // Cambia el tamaño del label aquí
                                                    }
                                                }}

                                            /><br />
                                            <FormControlLabel control={<Checkbox

                                                sx={{
                                                    color: 'green',
                                                    '&.Mui-checked': {
                                                        color: 'green',
                                                    },
                                                }}

                                                checked={checkRecibir}
                                                onChange={changeCheckRecibir}

                                            />} label="Recibir mis datos para futuras compras."

                                                sx={{

                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: '12px', // Cambia el tamaño del label aquí
                                                    }
                                                }}

                                            />


                                        </div>
                                        <button className="boton_infoContacto" onClick={enviar} disabled={!activarTodo} style={{ backgroundColor: activarTodo ? 'black' : 'gray' }}>Guardar y continuar</button>



                                    </div>



                                </div>

                            </Box>



                        </AccordionDetails>

                    </Accordion>

                </div>


                <div className={`div_datosPaso2Scroll ${showDiv1 ? 'show' : 'hide'}`} >
                    <div className='contenedor_datosPaso2'>
                        <div className="div_fecha" >
                            <p className="p_fecha">{formatDate(selectedDate)}</p>
                            <label className="label_idasalida">
                                <p className='p_idaPaso2'>{ida}</p>
                                <p className='p_salidaPaso2'>{salida}</p>
                            </label>
                            <img src={avionReserva} className="img_avion" />
                            <label className="label_vueltallegada">
                                <p className='p_vueltaPaso2'>{vuelta}</p>
                                <p className='p_llegadaPaso2'>{llegada}</p>
                            </label>
                        </div>
                        <div className="div_adulto">
                            <p className='p_pasajerosPaso2'>Pasajeros</p>
                            <p className='p_adultoPaso2'>1 Adulto</p>
                        </div>
                        <div className="div_totalPasajero">
                            <p className='p_totalPasajerosPaso2'>Total para 1 pasajero</p>
                            <p className='p_precioPaso2'>${precio}<label className='label_copPaso2'>COP</label></p>
                            <p className='p_totalReservaPaso2'>Total de tu reserva</p>
                        </div>
                        <div className='div_boton_continuaPaso2'>

                            <button className='boton_continuaPaso2' disabled={true} >
                                Continuar y pagar
                            </button>
                        </div>

                    </div>

                    <div className="contenedor_datosPaso2Movil">
                        <label className="TextorResumenViajeMovil">Resumen del viaje</label>
                        <label className='label_precioPaso2Movil'>
                            ${precio}<label className='label_copPaso2Movil'>COP
                            </label>
                            <p className="TotalReservaMovil">Total de tu reserva</p>
                        </label>
                    </div>
                </div>

                <div className={`div_datosPaso2 ${!showDiv1 ? 'show' : 'hide'}`} >
                    <div className='contenedor_datosPaso2'>

                        <div className="div_fecha" >
                            <p className="p_fecha">{formatDate(selectedDate)}</p>
                            <label className="label_idasalida">
                                <p className='p_idaPaso2'>{ida}</p>
                                <p className='p_salidaPaso2'>{salida}</p>
                            </label>
                            <img src={avionReserva} className="img_avion" />
                            <label className="label_vueltallegada">
                                <p className='p_vueltaPaso2'>{vuelta}</p>
                                <p className='p_llegadaPaso2'>{llegada}</p>
                            </label>
                        </div>
                        <div className="div_adulto">
                            <p className='p_pasajerosPaso2'>Pasajeros</p>
                            <p className='p_adultoPaso2'>1 Adulto</p>
                        </div>
                        <div className="div_totalPasajero">
                            <p className='p_totalPasajerosPaso2'>Total para 1 pasajero</p>
                            <p className='p_precioPaso2'>${precio}<label className='label_copPaso2'>COP</label></p>
                            <p className='p_totalReservaPaso2'>Total de tu reserva</p>
                        </div>
                        <div className='div_boton_continuaPaso2'>

                            <button className='boton_continuaPaso2' disabled={true} >
                                Continuar y pagar
                            </button>
                        </div>

                    </div>
                    <div className="contenedor_datosPaso2Movil">
                        <label className="TextorResumenViajeMovil">Resumen del viaje</label>
                        <label className='label_precioPaso2Movil'>
                            ${precio}<label className='label_copPaso2Movil'>COP
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

export default Paso2;
