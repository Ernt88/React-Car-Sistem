import fs from 'fs';
import path from 'path';
import IRepository from './IRepository';
import coche from './coche';

export default class cocheRepository implements IRepository<coche> {
    private coches: coche[] = [];

    private static readonly COCHE_FILE_PATH = path.join(
        __dirname,
        'data/coches.json'
    );

    public constructor() {
      this.load();
    }

    list(): coche[] {
        return this.coches;
    }

    get(id: string): coche {
        return <coche>this.coches.find((car) => car.id === id);
    }

    add(entity: coche): coche {
      console.log(this.coches)
      console.log(entity)
        this.coches.push(entity);
        this.save();
        return entity;
    }

    update(entity: coche): coche {
        this.coches = this.coches.reduce(
            (accumulation: coche[], currentCar) => {
              if (currentCar.id === entity.id) {
                accumulation.push(entity);
              } else {
                accumulation.push(currentCar);
              }
      
              return accumulation;
            },
            []
          );
      
          this.save();
      
          return entity;
    }
    
    delete(id: string): void {
        this.coches = this.coches.reduce(
            (accumulation: coche[], currentCar) => {
              if (currentCar.id !== id) {
                accumulation.push(currentCar);
              } 
      
              return accumulation;
            },
            []
          );
      
          this.save();
    }

    private load(): void {
        const cochesJson = fs.readFileSync(cocheRepository.COCHE_FILE_PATH);
        this.coches = <coche[]>JSON.parse(cochesJson.toString());
    }

    private save(): void {
        const cochesJson = JSON.stringify(this.coches);
        fs.writeFileSync(cocheRepository.COCHE_FILE_PATH, cochesJson);
    }
}
