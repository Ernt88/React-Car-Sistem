import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CarsList from './components/CarsList';
import CreateCarForm from './components/CreateCarForm';
import Car from './models/Car';

function App() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [dataToUpdateCar, setdataToUpdateCar] = useState<Car | null>(null);

  async function getCars() {
    const response = await axios.get('http://localhost:3005/coches');
    setCars(
      response.data.map((c: Car) => new Car(c.id, c.marca, c.modelo, c.color, c.matricula, c.kilometros_Recorridos))
    );
    setLoaded(true);
  }

  useEffect(() => {
    if (!loaded) {
      getCars();
    }
  }, [cars, loaded]
  );

  function updateView(value: boolean) {
    setLoaded(value);
  }

  function getDataToUpdateCar(car: Car) {
    setdataToUpdateCar(car)
    //console.log('imprimir primero ', dataToUpdateCar);
  }



  return (
    <div className="App">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossOrigin="anonymous"></link>

      <CreateCarForm setValueForLoad={updateView} fillCarDataToUpdate={dataToUpdateCar} />
      <hr />
      <CarsList carList={cars} setLoadValue={updateView} getDataToUpdateCar={getDataToUpdateCar} />


      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossOrigin="anonymous"></script>
    </div>
  );
}

export default App;
