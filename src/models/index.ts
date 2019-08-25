import { Sequelize, Options } from 'sequelize'
import category from './category'
import ingredient from './ingredient'
import recipe from './recipe'
import step from './step'

import config from './../config/config.json'

const sequelize = new Sequelize({
    dialect: config.dialect,
    storage: config.storage
  } as Options)

const modules = [
  category,
  recipe,
  ingredient,
  step,
]

let dbModules = [] as any
const modelsToBeAssociated = []

for (let mod of modules) {
  const model = mod(sequelize, Sequelize);
  dbModules[model.name] = model;

  if (dbModules[model.name].associate) {
    modelsToBeAssociated.push(model.name)
  }
}

for (let i in modelsToBeAssociated) {
  dbModules[modelsToBeAssociated[i]].associate(dbModules)
}

const db = {
  sequelize: sequelize,
  Sequelize: Sequelize,
  ...dbModules
}

export default db