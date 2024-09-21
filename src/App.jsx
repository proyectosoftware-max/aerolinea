import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DataProvider } from './componentes/Context';
import Principal from './Principal';
import Paso1 from './componentes/Paso1';
import Resumen from './componentes/Resumen';
import Paso2 from './componentes/Paso2';
import Adicionales from './componentes/adicionales';
import Paso3 from './componentes/Paso3';


function App() {

  return (
    <div className='claseApp' style={{ backgroundColor: 'rgb(235, 235, 235)', border:'1px solid rgb(235, 235, 235)'}}>
      <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Principal />} />
          <Route path='/paso1' element={<Paso1 />} />
          <Route path='/paso2/:ida/:vuelta/:precio/:salida/:llegada/:tiempo/:nombre/:apellido/:telefono' element={<Paso2 />} />
          <Route path='/resumen/:corigen/:cdestino/:ida/:vuelta/:tiempo/:precio/:salida/:llegada/:ao/:ad' element={<Resumen/>} />
          <Route path='/adicionales/:ida/:vuelta/:precio/:salida/:llegada/:tiempo/:nombre/:apellido/:telefono' element={<Adicionales />} />
          <Route path='/paso3/:ida/:vuelta/:precio/:salida/:llegada/:tiempo/:nombre/:apellido/:telefono' element={<Paso3 />} />
        </Routes>
      </BrowserRouter>
      </DataProvider>
    </div>
  );

}

export default App;

<div _ngcontent-phe-c68="" class="bullet ng-star-inserted"><div _ngcontent-phe-c68="" class="number-breadcrumb">1</div></div>