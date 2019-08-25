import Sequelize from 'sequelize'

export default (sequelize: any, DataTypes: any) => {
    const Category = sequelize.define('category', {
        name: {
            type: Sequelize.STRING
        }
    })

    Category.associate = function(models: any) {
        Category.hasMany(models.recipe)
    }

    return Category
}

