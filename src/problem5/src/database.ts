import { Sequelize, SequelizeOptions } from "sequelize-typescript";

export interface SequelizeConnectionOptions {
    database?: string;
    username?: string;
    password?: string;
    options?: SequelizeOptions;
}

export async function initSequelize(sequelizeConfig: SequelizeConnectionOptions): Promise<void> {
    const sequelize = new Sequelize(sequelizeConfig);
    
    sequelize.addModels([
        __dirname + "/models/*.ts"
    ]);  
      
    sequelize.authenticate()
        .then(() => {
            console.log('Database connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
}