import { IResolvers } from 'graphql-tools';

const resolvers = {
  Query: {
    category: async(_: any, { id }: any, { db }: any) => {
        let category = await db.category.findByPk(id)
        return category
    },
    categories: async(_: any, args: any, { db }: any) => {
        let categories = await db.category.findAll()
        return categories
    }
  },
  Mutation: {
    createCategory: async(_: any, { data }: any, { db }: any) => {
        let category = await db.category.create({
            name: data.name
        })
        return category
    },
    updateCategory: async(_: any, { id, data }: any, { db }: any) => {
        let res = await db.category.update({
            name: data.name
        }, {
            where: {
                id: id
            }
        })
        if (!res)
            throw new Error("Error while updating category")

        const category = db.category.findByPk(id)
        return category
    },
    deleteCategory: async(_: any, { id}: any, { db }: any) => {
        const deletedCategories = await db.category.destroy({
            where: {
                id: id
            }
        })
        if (deletedCategories == 0)
            return false

        return true
    }
  },
  Category: {
    recipes: async (category: any) => {
        const recipes = category.getRecipes()
        return recipes
    }
  },
};
export default resolvers;