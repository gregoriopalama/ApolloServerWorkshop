import Sequelize from 'sequelize'

export default (sequelize: any, DataTypes: any) => {
    const Step = sequelize.define('step', {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        order: {
            type: Sequelize.INTEGER
        }
    })

    Step.associate = function(models: any) {
        Step.belongsTo(models.recipe)
    }

    return Step
}

