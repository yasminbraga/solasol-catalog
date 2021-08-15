import Category from 'App/Models/Category'

export default class CategoriesController {
  public async index() {
    const categories = await Category.all()

    return {
      categories: categories.map((i) => i.toJSON()),
    }
  }
}
