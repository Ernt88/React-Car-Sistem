import Car from '../models/Car'
import CarComponent from './CarComponent';

export type CarType = {
    carList: Car[]
    setLoadValue: (value: boolean) => void;
    getDataToUpdateCar: (car: Car) => void;
}

export default function CarsList(props: CarType) {

    const renderCars = () => props.carList.map(c =>
        (<CarComponent key={c.id} car={c} setLoadValue={props.setLoadValue} getDataToUpdateCar={props.getDataToUpdateCar} />)
    );

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-body">

                            <table className="table">

                                <thead>
                                    <th>Marca</th>
                                    <th>Modelo</th>
                                    <th>Color</th>
                                    <th>Matricula</th>
                                    <th>Km. recorridos</th>
                                    <th></th>
                                    <th></th>
                                </thead>

                                <tbody>

                                   {renderCars()}
                                    
                                </tbody>

                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}