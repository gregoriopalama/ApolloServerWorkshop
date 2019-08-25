import Sequelize from 'sequelize'

export default (sequelize: any, DataTypes: any) => {
    const Ingredient = sequelize.define('ingredient', {
        name: {
            type: Sequelize.STRING
        },
        unit: {
            type: Sequelize.STRING
        },
        quantity: {
            type: Sequelize.STRING
        }
    })

    Ingredient.associate = function(models: any) {
        Ingredient.belongsTo(models.recipe)
    }

    return Ingredient
}

