import { Sequelize, Model } from 'sequelize';

// Define a generic interface for model initialization functions
export interface ModelInitFunction {
  (sequelize: Sequelize): typeof Model;
}

// Define the type for your models object using the generic interface
export interface Models {
}
