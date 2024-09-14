import { Container, Navbar, Nav, Card, Accordion, Modal } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import React, { useState, useEffect, useRef, useContext } from 'react';
import logo from '../material/logo.png';
import data from './data.json';
import RadioButton from './radio.jsx';
import { FaChevronDown } from 'react-icons/fa';
import { DataContext } from './Context';
import TextField from '@mui/material/TextField'
import { Backdrop } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Popover from '@mui/material/Popover';
import dayjs from 'dayjs';
import uno from '../material/1.jpg';
import dos from '../material/2.jpg';
import tres from '../material/3.jpg';
import icono_idioma from '../material/icono_idioma.jpg';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));



/* https://www.avianca.com/es/booking/select/?origin1=BAQ&destination1=MDE&departure1=2024-09-02&adt1=1&tng1=0&chd1=0&inf1=0&currency=COP&posCode=CO */

const MenuNavBar = () => {


  const [lgShow, setLgShow] = useState(false);
  const [ciudadOrigen, setCiudadOrigen] = useState("Barranquilla(BAQ)");
  const [ciudadDestino, setCiudadDestino] = useState("Medellín(MDE)");
  const [scrolled, setScrolled] = useState(false);
  const {sharedData, setOrigen, setDestino, selectedDate, setSelectedDate } = useContext(DataContext);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [adulto, setAdulto] = useState(1);
  const [inputAdulto, setInputAdulto] = useState(1);
  const [language, setLanguage] = useState('Español');

  const idioma = (event) => {
    setLanguage(event.target.value);
  };



  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [query1, setQuery1] = useState(ciudadOrigen);
  const [filteredData1, setFilteredData1] = useState([]);
  const [query2, setQuery2] = useState(ciudadDestino);
  const [filteredData2, setFilteredData2] = useState([]);

  useEffect(() => {
    // Si necesitas realizar alguna operación con los datos, puedes hacerlo aquí
  }, []);

  const handleChange1 = (e) => {
    const value = e.target.value;
    setQuery1(value);
    if (value) {
      const results = data.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData1(results);
    } else {
      setFilteredData1([]);
    }
  };

  const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escapar todos los caracteres especiales
};

  const highlightText1 = (text, query1) => {
    const escapedQuery = escapeRegExp(query1);
    const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === query1.toLowerCase() ? (
            <strong key={index}>{part}</strong>
          ) : (
            part
          )
        )}
      </span>
    );
  };


  const handleClick1 = (name) => {
    setQuery1(name);
    setFilteredData1([]);
  };

  const handleChange2 = (e) => {
    const value = e.target.value;
    setQuery2(value);
    if (value) {
      const results = data.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData2(results);
    } else {
      setFilteredData2([]);
    }
  };

  const highlightText2 = (text, query2) => {
    const escapedQuery = escapeRegExp(query1);
    const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === query2.toLowerCase() ? (
            <strong key={index}>{part}</strong>
          ) : (
            part
          )
        )}
      </span>
    );
  };


  const handleClick2 = (name) => {
    setQuery2(name);
    setFilteredData2([]);
  };


  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [paragraphText, setParagraphText] = useState('¿Cuándo vas a volar?');
  const calendarRef = useRef(null);

  const today = new Date(); // Fecha actual
  today.setHours(0, 0, 0, 0);
  const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  const daysOfWeek = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

  const handleDateClick = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate && date > startDate) {
      setEndDate(date);
    }
    setIsCalendarVisible(false);
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setIsCalendarVisible(false);
    }
  };

  const handleFocus = (inputType) => {
    setIsCalendarVisible(true);
    if (inputType === 'start') {
      setParagraphText('¿Cuándo vas a volar?');
    } else if (inputType === 'end') {
      setParagraphText('¿Cuándo vuelves?');
    }
  };


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderCalendar = (month, year) => {
    const firstDayOfMonth = new Date(year, month, 1).getDay() || 7; // Primer día de la semana (corregido para que comience en lunes)
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    // Rellenar con días en blanco si el mes no comienza en lunes
    for (let i = 1; i < firstDayOfMonth; i++) {
      days.push(<div key={`blank-${i}`} className="day blank"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isDisabled = date < today;
      days.push(
        <div
          key={i}
          className={`day ${isDisabled ? 'disabled' : ''} ${startDate && date.toDateString() === startDate.toDateString() ? 'selected' : ''
            }`}
          onClick={() => !isDisabled && handleDateClick(date)}
        >
          {i}
        </div>
      );
    }

    return (
      <div className="calendar-month">
        <div className="month-year">
          <span className="arrow" onClick={() => handleMonthChange(-1)}>&lt;</span>
          {`${months[month]} ${year}`}
          <span className="arrow" onClick={() => handleMonthChange(1)}>&gt;</span>
        </div>
        <div className="days-of-week">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="day-of-week">
              {day}
            </div>
          ))}
        </div>
        <div className="days">{days}</div>
      </div>
    );
  };

  const handleMonthChange = (direction) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };


  const [activeKey, setActiveKey] = useState(null);
  const [contarA, setContarA] = useState(0);
  const [contarJ, setContarJ] = useState(0);
  const [contarN, setContarN] = useState(0);
  const [contarB, setContarB] = useState(0);
  const [sumacontar, setSumacontar] = useState(0);

  const toggleAccordion = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

  const incrementoA = () => {
    setContarA(preconteo => preconteo + 1);
    setSumacontar(preconteo => preconteo + 1);


  }

  const incrementoJ = () => {
    setContarJ(preconteo => preconteo + 1);
    setSumacontar(preconteo => preconteo + 1);
  }

  const incrementoN = () => {
    setContarN(preconteo => preconteo + 1);
    setSumacontar(preconteo => preconteo + 1);

  }

  const incrementoB = () => {
    setContarB(preconteo => preconteo + 1);
    setSumacontar(preconteo => preconteo + 1);
  }


  const decrementoA = () => {
    if (contarA > 0) {
      setContarA(preconteo => preconteo - 1);
      setSumacontar(preconteo => preconteo - 1);
    }
  }

  const decrementoJ = () => {
    if (contarJ > 0) {
      setContarJ(preconteo => preconteo - 1);
      setSumacontar(preconteo => preconteo - 1);

    }
  }

  const decrementoN = () => {
    if (contarN > 0) {
      setContarN(preconteo => preconteo - 1);
      setSumacontar(preconteo => preconteo - 1);
    }
  }

  const decrementoB = () => {
    if (contarB > 0) {
      setContarB(preconteo => preconteo - 1);
      setSumacontar(preconteo => preconteo - 1);
    }
  }


  const formatDateWithYear = (date) => {
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('es-ES', options);

    // Convertir la primera letra del mes y el día de la semana a mayúscula
    const [weekdayWithComma, day, month, year] = formattedDate.split(' ');
    const weekday = weekdayWithComma.replace(',', '').charAt(0).toUpperCase() + weekdayWithComma.slice(1, -1);
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

    // Combinar todas las partes con puntos
    return `${weekday}. ${day} ${capitalizedMonth}. ${year}`;
  };

  const cambioValorAdulto = (event) =>{
     
     setAdulto(event.target.value);
  }

  const clickBotonConfirmar = () =>{
    setInputAdulto(adulto);
    cerrarVentana();
  }

  const Buscar = () => {
    setCiudadOrigen(query1);
    setCiudadDestino(query2);
    setLgShow(false);
    setSelectedDate(actualizarFecha);
    
    console.log('SelectedDate ' + selectedDate.format('DD MMM YYYY'));
  }


 useEffect(() => {
  console.log("SelectedDate en MenuNavBar " + selectedDate);
   localStorage.setItem('selectedDate', setSelectedDate(selectedDate));
   setSelectedDate(selectedDate);
}, [selectedDate]);


  useEffect(() => {
    localStorage.setItem('origen', setOrigen(ciudadOrigen));
  }, [ciudadOrigen]);


  useEffect(() => {
    localStorage.setItem('destino', setDestino(ciudadDestino));
  }, [ciudadDestino]);


  const [isFocused, setIsFocused] = useState(false);

  const focus = () => {
    setIsFocused(true);
  };

  const blur = () => {
    setIsFocused(false);

  }

  const abrirVentana = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const cerrarVentana = () => {
    setAnchorEl(null);
  };

  const abrir = Boolean(anchorEl);
  const id = abrir ? 'simple-popover' : undefined;

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue.toDate());
  };



  return (
    <>
      <Backdrop
        open={isFocused}
        style={{ zIndex: 1, color: '#fff' }}
        onClick={() => setIsFocused(false)} // Cierra el fondo oscuro al hacer clic en él
      />
      <Navbar className={'navbarEscritorio'} expand="lg" fixed='top'>
        <Container className='container1'>
          <Navbar.Brand href="" className='navbar-brand'>
            <img src={logo}  className='logo' />
            <img src={icono_idioma}/>
            <select style={{border:'none', outline:'none', borderRadius:'300px'}} value={language} onChange={idioma}>
           <option style={{border:'none'}}>Español</option>
           <option style={{border:'none'}}>Inglés</option>
          </select>
  
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

      <Navbar className={'navbarModificarBusqueda'} expand="lg" fixed='top' >
        <Container className='containerModificarBusqueda'>

          <Navbar.Collapse id="bascic navbar-nav">
            <Nav className='flex-column'>

              <div className='div_origenDestino' >
                <table>
                  <tr>
                    <td>
                      <div className='desde'>
                        <p className='desdeHacia'>Desde</p>
                        <TextField
                          defaultValue=""
                          variant="filled"
                          className='textField'
                          onFocus={focus}
                          onBlur={blur}
                          value={query1}
                          onChange={handleChange1}
                          sx={{
                            input: {
                              color: 'black', // Cambia el color del texto a blanco
                              backgroundColor: 'white', // Elimina el fondo gris predeterminado
                            }}}
                        /></div></td>
                    <td>
                      <div className='hacia'>
                        <p className='desdeHacia'>Hacia</p>
                        <TextField
                          defaultValue=""
                          variant="filled"
                          className='textField'
                          onFocus={focus}
                          onBlur={blur}
                          value={query2}
                          onChange={handleChange2}
                          sx={{
                            input: {
                              color: 'black', // Cambia el color del texto a blanco
                              backgroundColor: 'white', // Elimina el fondo gris predeterminado
                            }}}
                        />
                      </div></td>
                    <td>
                      <div className='fechaOrigen' onFocus={focus}
                        onBlur={blur}>
                        <p className='fecha_desdeHacia'>Fecha del viaje</p>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
  <DatePicker
    className='datepicker'
    value={dayjs(selectedDate)}
    onChange={handleDateChange}
    slotProps={{ textField: { variant: 'filled' }}}
    inputFormat="DD MMM"
    views={['day', 'month']}
    format="DD MMM."
    sx={{
      input: {
      color: 'black', // Cambia el color del texto a blanco
      backgroundColor: 'white', // Elimina el fondo gris predeterminado
      }}}
  />
</LocalizationProvider>

                      </div></td>
                    <td>
                      <div className='pasajeros'>
                        <p className='desdeHacia'>Pasajeros</p>
                        <TextField
                          defaultValue=""
                          variant="filled"
                          className='textField'
                          value={inputAdulto + " Adulto"}
                          onFocus={focus}
                          onBlur={blur}
                          onClick={abrirVentana}
                          sx={{
                            input: {
                              color: 'black', // Cambia el color del texto a blanco
                              backgroundColor: 'white', // Elimina el fondo gris predeterminado
                            }}}
                        />
                      </div>
                    </td>
                    <td>
                      <div className='div_botonModificar'>
                        <button className='botonModificar' onClick={Buscar} >Modificar búsqueda</button>

                      </div>
                    </td>
                  </tr>
                </table>

              </div>







            </Nav>
          </Navbar.Collapse>


        </Container>
      </Navbar>
      <div className='div_ciudadOrigen'>
        {filteredData1.length > 0 && (
          <ul>
            {filteredData1.map((item) => (
              <li className='li_ciudad' key={item.id} onClick={() => handleClick1(item.name)}>
                {highlightText1(item.name, query1)}<p className='label_aeropuerto'>{item.aeropuerto}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className='div_ciudadDestino'>
        {filteredData2.length > 0 && (
          <ul>
            {filteredData2.map((item) => (
              <li className='li_ciudad' key={item.id} onClick={() => handleClick2(item.name)}>
                {highlightText2(item.name, query2)}<p className='label_aeropuerto'>{item.aeropuerto}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Popover
        id={id}
        open={abrir}
        anchorEl={anchorEl}
        onClose={cerrarVentana}
        className='clasePopover'
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
       
      ><button onClick={cerrarVentana} className='botonCerrarPasajeros' style={{ float: 'right' }}>X</button>
     <p className='p_pasajeros' > Añade Pasajeros</p>
        <Typography sx={{ p: 2, marginTop: '-37px' }} > 
          <Typography gutterBottom className='contenedorPasajeros'>
        <p className='tituloPasajero' >Adulto</p>
        <p className='subtituloPasajero'>Igual o mayores de 12 años*</p>
          <TextField
            id="filled-number"
            type="number"
            variant="filled"
            value={adulto}
            onChange={cambioValorAdulto}
            inputProps={{min:1}}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />



        </Typography>
          <Typography gutterBottom className='contenedorPasajeros'>
          <p className='tituloPasajero'>Niños</p>
          <p className='subtituloPasajero'>2 - 11 años*</p>
            <TextField
              id="filled-number"
              type="number"
              variant="filled"
              value={0}
              inputProps={{min:0}}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Typography>
          <Typography gutterBottom className='contenedorPasajeros'>
          <p className='tituloPasajero'>Bebés</p>
          <p className='subtituloPasajero'>Menores de 2 años*</p>
            <TextField
              id="filled-number"
              type="number"
              variant="filled"
              value={0}
              inputProps={{min:0}}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Typography>
          <button onClick={clickBotonConfirmar} >Confirmar</button>
          </Typography>
      </Popover>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Modal title
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>

        </DialogContent>
        <DialogActions>
          <button autoFocus onClick={handleClose} className='botonPasajeros'>
            Confirmar
          </button>
        </DialogActions>
      </BootstrapDialog>
      <div className='div_modal'>

        <Modal
          size="xl"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
          closeButton
          className='modal'
          dialogClassName="custom-modal-size"
        >
          <Modal.Header className='header' closeButton >

          </Modal.Header>
          <Modal.Body className='modalBody'>
            <div className='letra_editar_busqueda'>Editar búsqueda</div>
            <RadioButton />
            <table border="1" cellPadding="10" cellSpacing="0" className='tabla_imput1'>

              <tbody>
                <tr>
                  <td className='td_ciudad'>
                    <div className='input_ciudad'>


                      <input
                        type="text"
                        value={query1}
                        onChange={handleChange1}
                      />
                      <input
                        type="text"
                        value={query2}
                        onChange={handleChange2}
                      />

                    </div>
                  </td>

                  <td className='td_fecha'> <div className="date-picker">
                    <input
                      type="text"
                      value={startDate ? startDate.toLocaleDateString() : ''}
                      onFocus={() => handleFocus('start')}
                      placeholder="Inicio"
                      readOnly
                      className="inputFechaOrigen"
                    />
                    <input
                      type="text"
                      value={endDate ? endDate.toLocaleDateString() : ''}
                      onFocus={() => handleFocus('end')}
                      placeholder="Fin"
                      readOnly
                      className="inputFechaDestino"
                    />
                    {isCalendarVisible && (
                      <div ref={calendarRef} className="calendar-container">
                        <div className='div_volar'>{paragraphText}</div>
                        <div className='div_calendario'>
                          {renderCalendar(currentMonth, currentYear)}
                          {renderCalendar(currentMonth + 1 > 11 ? 0 : currentMonth + 1, currentMonth + 1 > 11 ? currentYear + 1 : currentYear)}
                        </div>
                      </div>
                    )}
                  </div></td>

                  <td><Accordion activeKey={activeKey} onClick={() => toggleAccordion('0')}
                    aria-expanded={activeKey === '0'}
                  >
                    <Card className="custom-card">
                      <Card.Header className='CardHeader'>
                        <div className="accordion-header">
                          <h5>{sumacontar}</h5>
                          <button
                            onClick={() => toggleAccordion('0')}
                            aria-expanded={activeKey === '0'}
                            className={`toggle-button ${activeKey === '0' ? 'rotate' : ''}`}

                          >
                            <FaChevronDown />
                          </button>
                        </div>
                      </Card.Header>

                    </Card>


                  </Accordion>
                  </td>
                  <td className='td_botonBuscar'><button className='botonBuscar' closeButton onClick={Buscar} >Buscar</button></td>
                </tr>
              </tbody>
            </table>
          </Modal.Body>
        
       
          <div>
            {activeKey === '0' && (
              <div className="accordion-content">
                <Card.Body>
                  <table style={{ border: '1px solid blue', textAlign: 'center', width: '100%', marginBottom: '0px' }}>
                    <tr ><td colspan="4">¿Quienes vuelan?</td></tr>
                    <tbody border="1">
                      <tr style={{ border: '1px solid blue' }} >
                        <td style={{ border: '1px solid red' }}>
                          <p className='p1'>Adultos</p>
                          <p className='p2'>Desde 15 años</p>
                        </td>
                        <td style={{ border: '1px solid red' }}><button className='boton_menos' onClick={decrementoA}>-</button></td>
                        <td style={{ border: '1px solid red' }} className='numeros'>{contarA}</td>
                        <td style={{ border: '1px solid red' }}><button className='boton_mas' onClick={incrementoA}>+</button></td>
                      </tr>
                      <tr style={{ border: '1px solid blue' }} >
                        <td style={{ border: '1px solid red' }}>
                          <p className='p1'>Jóvenes</p>
                          <p className='p2'>De 12 a 14 años</p></td>

                        <td style={{ border: '1px solid red' }}><button className='boton_menos' onClick={decrementoJ}>-</button></td>
                        <td style={{ border: '1px solid red' }} className='numeros'>{contarJ}</td>
                        <td style={{ border: '1px solid red' }}><button className='boton_mas' onClick={incrementoJ}>+</button></td>
                      </tr>
                      <tr style={{ border: '1px solid blue' }} >
                        <td>
                          <p className='p1'>Niños</p>
                          <p className='p2'>De 2 a 11 años</p>
                        </td>

                        <td style={{ border: '1px solid red' }}><button className='boton_menos' onClick={decrementoN}>-</button></td>
                        <td style={{ border: '1px solid red' }} className='numeros'>{contarN}</td>
                        <td style={{ border: '1px solid red' }}><button className='boton_mas' onClick={incrementoN}>+</button></td>
                      </tr>

                      <tr style={{ border: '1px solid blue' }} >
                        <td style={{ border: '1px solid red' }}>
                          <p className='p1'>Bebés</p>
                          <p className='p2'>Menores de 2 años</p>
                        </td>
                        <td style={{ border: '1px solid red' }}><button className='boton_menos' onClick={decrementoB}>-</button></td>
                        <td style={{ border: '1px solid red' }} className='numeros'>{contarB}</td>
                        <td style={{ border: '1px solid red' }}><button className='boton_mas' onClick={incrementoB}>+</button></td>
                      </tr>
                      <tr>
                        <td colSpan={4}><button className='boton_confirmar' onClick={() => toggleAccordion('null')} >Confirmar</button></td>
                      </tr>

                    </tbody>

                  </table>
                </Card.Body>
              </div>
            )}
          </div>
        </Modal>




      </div>
    </>
  );
}

export default MenuNavBar;

/*
import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

function MenuNavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
     
      <Navbar className={`navbar ${scrolled ? 'hidden' : ''}`} fixed="top" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Navbar 1</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#acerca">Acerca de mí</Nav.Link>
              <Nav.Link href="#proyectos">Proyectos</Nav.Link>
              <Nav.Link href="#contacto">Contacto</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      
      <Navbar className={`navbar navbar-scroll ${scrolled ? 'visible' : 'hidden'}`} fixed="top" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Navbar 2</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#acerca">Acerca de mí</Nav.Link>
              <Nav.Link href="#proyectos">Proyectos</Nav.Link>
              <Nav.Link href="#contacto">Contacto</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
} 
*/

