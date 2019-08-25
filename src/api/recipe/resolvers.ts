import { IResolvers } from 'graphql-tools';

const resolvers = {
  Query: {
    recipe: async(_: any, { id }: any, { db }: any) => {
        let recipe = await db.recipe.findByPk(id)
        return recipe
    },
    recipes: async(_: any, args: any, { db }: any) => {
        let recipes = await db.recipe.findAll()
        return recipes
    }
  },
  Mutation: {
    createRecipe: async(_: any, { data }: any, { db }: any) => {
        let category = await db.category.findByPk(data.category)
        if (category == null) {
            throw new Error("No category with the given ID")
        }

        let recipe = await db.recipe.create({
            name: data.name,
            description: data.description,
            servings: data.servings,
            time: data.time
        })
        recipe.setCategory(category)

        return recipe
    },
    updateRecipe: async(_: any, { id, data }: any, { db }: any) => {
        let category = null
        if (data.category) {
            category = await db.category.findByPk(data.category)
            if (category == null) {
                throw new Error("No category with the given ID")
            }
        }

        let res = await db.recipe.update({
            name: data.name,
            description: data.description,
            servings: data.servings,
            time: data.time
        }, {
            where: {
                id: id
            }
        })
        if (!res)
            throw new Error("Error while updating recipe")

        const recipe = db.recipe.findByPk(id)

        if (category != null) 
            recipe.setCategory(category)

        return recipe
    },
    deleteRecipe: async(_: any, { id}: any, { db }: any) => {
        const deletedRecipes = await db.recipe.destroy({
            where: {
                id: id
            }
        })
        if (deletedRecipes == 0)
            return false

        return true
    },
    addIngredientToRecipe: async(_: any, { recipeId, data }: any, { db }: any) => {
        let recipe = await db.recipe.findByPk(recipeId)
        if (recipe == null) {
            throw new Error("No recipe with the given ID")
        }

        let ingredient = await db.ingredient.create({
            name: data.name,
            unit: data.unit,
            quantity: data.quantity
        })
        ingredient.setRecipe(recipe)

        return recipe
    },
    updateIngredientForRecipe: async(_: any, { id, data }: any, { db }: any) => {
        let res = await db.ingredient.update({
            name: data.name,
            unit: data.unit,
            quantity: data.quantity
        }, {
            where: {
                id: id
            }
        })
        if (!res)
            throw new Error("Error while updating ingredient")

        const ingredient = db.ingredient.findByPk(id)
        return ingredient.getRecipe()
    },
    deleteIngredientFromRecipe: async(_: any, { id }: any, { db }: any) => {
        const deletedIngredients = await db.ingredient.destroy({
            where: {
                id: id
            }
        })
        if (deletedIngredients == 0)
            return false

        return true
    },
    addStepToRecipe: async(_: any, { recipeId, data }: any, { db }: any) => {
        let recipe = await db.recipe.findByPk(recipeId)
        if (recipe == null) {
            throw new Error("No recipe with the given ID")
        }

        let step = await db.step.create({
            name: data.name,
            description: data.description,
            order: data.order
        })
        step.setRecipe(recipe)

        return recipe
    },
    updateStepForRecipe: async(_: any, { id, data }: any, { db }: any) => {
        let res = await db.step.update({
            name: data.name,
            description: data.description,
            order: data.order
        }, {
            where: {
                id: id
            }
        })
        if (!res)
            throw new Error("Error while updating step")

        const step = db.step.findByPk(id)
        return step.getRecipe()
    },
    deleteStepFromRecipe: async(_: any, { id }: any, { db }: any) => {
        const deletedSteps = await db.step.destroy({
            where: {
                id: id
            }
        })
        if (deletedSteps == 0)
            return false

        return true
    }
  },
  Recipe: {
    category: async(recipe: any) => {
        const category = await recipe.getCategory()
        return category
    },
    ingredients: async(recipe: any) => {
        const ingredients = await recipe.getIngredients()
        return ingredients
    },
    steps: async(recipe: any) => {
        const steps = await recipe.getSteps()
        return steps
    }
  },
};
export default resolvers;