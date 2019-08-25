import Sequelize from 'sequelize'

export default (sequelize: any, DataTypes: any) => {
    const Recipe = sequelize.define('recipe', {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        servings: {
            type: Sequelize.INTEGER
        },
        time: {
            type: Sequelize.INTEGER
        }
    })

    Recipe.associate = function(models: any) {
        Recipe.belongsTo(models.category)
        Recipe.hasMany(models.ingredient)
        Recipe.hasMany(models.step)
    }

    return Recipe
}

