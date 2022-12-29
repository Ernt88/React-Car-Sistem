import { ChangeEvent, useState, MouseEvent } from "react";
import axios from "axios";
import Car from "../models/Car";

export type createCarProps = {
    setValueForLoad: (value: boolean) => void;
    fillCarDataToUpdate: Car | null;
}


export default function CreateCarForm(props: createCarProps) {
    const [id, setId] = useState<string>('');
    const [marca, setMarca] = useState<string>('');
    const [modelo, setModelo] = useState<number>(0);
    const [color, setColor] = useState<string>('');
    const [matricula, setMatricula] = useState<string>('');
    const [kilometros, setKilometros] = useState<number>(0);

    console.log(id);
    //console.log('id: ' , id , ' Marca: ', marca, ' Modelo: ', modelo, ' Color: ', color, ' Matricula: ' , matricula , ' Kilometros: ', kilometros);

    function handleIdChange(event: ChangeEvent<HTMLInputElement>) {
        const newValueForId = event.target.value;
        setId(newValueForId);
    }

    function handleMarcaChange(event: ChangeEvent<HTMLInputElement>) {
        const newValueForMarca = event.target.value;
        setMarca(newValueForMarca);
    }

    function handleModeloChange(event: ChangeEvent<HTMLInputElement>) {
        const newValueForModelo = Number(event.target.value);
        setModelo(newValueForModelo);
    }

    function handleColorChange(event: ChangeEvent<HTMLInputElement>) {
        const newValueForColor = event.target.value;
        setColor(newValueForColor);
    }

    function handleMatriculaChange(event: ChangeEvent<HTMLInputElement>) {
        const newValueForMatricula = event.target.value;
        setMatricula(newValueForMatricula);
    }

    function handleKilometrosChange(event: ChangeEvent<HTMLInputElement>) {
        const newValueForKilometros = Number(event.target.value);
        setKilometros(newValueForKilometros);
    }

    async function handleSave(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const carToCreate = new Car(id, marca, modelo, color, matricula, kilometros);
        await CreateCar(carToCreate)

        clearForm();
        props.setValueForLoad(false);
        window.alert('Car created');
    }

    async function handleUpdate(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const carToUpdate = new Car(id, marca, modelo, color, matricula, kilometros);
        const responseFromApi = await updateCar(carToUpdate);

        if (!responseFromApi) {
            //No funciona ya que la api no busca el id en el metodo PUT. Se puede optimizar.
            window.alert('Couldnt found the id, try again with a valid one please :)');
        } else {
            clearForm();
            props.setValueForLoad(false);
            window.alert('Car updated');
        }

    }

    async function CreateCar(car: Car) {
        await axios.post('http://localhost:3005/coches', car, {
            headers: {
                'Content-type': 'application/json'
            }
        });
    }

    async function updateCar(car: Car) {
        return await axios.put('http://localhost:3005/coches', car, {
            headers: {
                'Content-type': 'application/json'
            }
        });
    }

    function clearForm() {
        setId('');
        setMarca('');
        setModelo(0);
        setColor('');
        setMatricula('');
        setKilometros(0);
    }

    function fillDataInputs() {
        if (props.fillCarDataToUpdate !== null && props.fillCarDataToUpdate.id !== id) {
            setId(props.fillCarDataToUpdate.id);
            setMarca(props.fillCarDataToUpdate.marca);
            setModelo(props.fillCarDataToUpdate.modelo);
            setColor(props.fillCarDataToUpdate.color);
            setMatricula(props.fillCarDataToUpdate.matricula);
            setKilometros(props.fillCarDataToUpdate.kilometros_Recorridos);
        }
    }

    return (
        fillDataInputs(),

        <div className="container">
            <div className="row">
                <div className="col-lg-6 offset-lg-3">

                    <div className="card mt-4">
                        <div className="card-body text-center">
                            <span className="card-title h2">Registre un nuevo vehiculo</span>
                            <form className="form-group mt-2">

                                <input type="text" className="form-control" placeholder="ID" value={id} onChange={handleIdChange} />
                                <br />
                                <input type="text" className="form-control" placeholder="Marca" value={marca} onChange={handleMarcaChange} />
                                <br />
                                <input type="number" className="form-control" placeholder="Modelo" value={modelo} onChange={handleModeloChange} />
                                <br />
                                <input type="text" className="form-control" placeholder="Color" value={color} onChange={handleColorChange} />
                                <br />
                                <input type="text" className="form-control" placeholder="Matricula" value={matricula} onChange={handleMatriculaChange} />
                                <br />
                                <input type="number" className="form-control" placeholder="Kilometros recorridos" value={kilometros} onChange={handleKilometrosChange} />
                                <br />


                                <div className="d-flex justify-content-between">
                                    <button onClick={handleSave} className="btn btn-success mr-2">Guardar</button>
                                    <button onClick={handleUpdate} className="btn btn-primary">Actualizar</button>
                                </div>


                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
}



