import React, { useState } from 'react';
import { Button, Dialog, DialogContent, Slide } from '@mui/material';

// Función de transición para hacer que el modal aparezca desde abajo
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalFromBottom() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* Botón que abre el modal */}
      <Button variant="contained" onClick={handleClickOpen}>
        Abrir Modal
      </Button>

      {/* Modal que aparece desde la parte inferior */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="modal-desde-abajo"
        sx={{
          '& .MuiDialog-paper': {
            margin: 0,
            position: 'fixed',
            bottom: 0,
            width: '100%',
            maxWidth: '100%', // Asegura que el modal ocupe todo el ancho de la pantalla
            borderRadius: '10px 10px 0 0', // Bordes redondeados en la parte superior
          },
        }}
      >
        <DialogContent>
          <h2>Este es un modal desde abajo</h2>
          <p>Aquí puedes colocar cualquier contenido que desees.</p>
          <Button variant="outlined" onClick={handleClose}>
            Cerrar Modal
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
