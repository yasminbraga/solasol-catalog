import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionSController {
  public async index({ view }: HttpContextContract) {
    return view.render('sessions/index')
  }
  public async store({ request, auth, response, session }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])
    try {
      await auth.attempt(email, password)

      return response.redirect().toRoute('products.index')
    } catch (error) {
      console.log(error)
      session.flash({ error: 'Usuário ou senha inválidos' })
      return response.redirect().back()
    }
  }
}
