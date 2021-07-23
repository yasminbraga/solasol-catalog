import '../css/app.css'

const deleteForms = document.querySelectorAll('.confirm-deletion')

deleteForms.forEach((deleteForm) => {
  const button = deleteForm.querySelector('button')
  button.onclick = () => {
    const confirmation = confirm('Deseja deletar')
    if (confirmation) {
      deleteForm.submit()
    }
  }
})
