import axios from "axios";
import Car from "../models/Car";
import { MouseEvent } from "react";

type CarProps = {
    car: Car
    setLoadValue: (value: boolean) => void;
    getDataToUpdateCar: (car: Car) => void;
}

export default function CarComponent(props: CarProps) {

    async function handleDeleteAction(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        await DeleteCar(props.car.id)
        props.setLoadValue(false);
        window.alert('Car deleted');
    }

    async function DeleteCar(id: string) {
        await axios.delete(`http://localhost:3005/coches/${id}`)
    }

    function fillDataToUpdateCar(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        props.getDataToUpdateCar(props.car);
        //console.log('Imprimir despues de ejecutar el flujo de la funcion getDataToUpdateCar', props.car);
    }

    return (

        <tr>
            <td>{props.car.marca}</td>
            <td>{props.car.modelo}</td>
            <td>{props.car.color}</td>
            <td>{props.car.matricula}</td>
            <td>{props.car.kilometros_Recorridos}</td>
            <td><i className="fa-solid fa-pen-to-square" onClick={fillDataToUpdateCar}></i></td>
            <td><i className="fa-solid fa-trash-can" onClick={handleDeleteAction}></i></td>
        </tr>
        
    )
}
