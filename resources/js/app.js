import '../css/app.css'

const ImagesUpload = {
  input: '',
  preview: document.querySelector('#images-preview'),
  uploadLimit: 4,
  files: [],
  handleFileInput(event) {
    console.log(event)
  },
}

export function clicou() {
  console.log('clicou')
}

const click = document.getElementById('product-image')
click.addEventListener('click', clicou)
