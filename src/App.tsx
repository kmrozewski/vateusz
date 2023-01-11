import React, {Suspense} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <Suspense fallback={<>Loading</>}>
      <AppRouter />
    </Suspense>
  );
}

export default App;
