import '../css/app.css'

// HIGHLIGHT CURRENT PAGE LINK IN SIDEBAR
const currentPage = document.location.href
const navLinks = document.querySelectorAll('.nav-link')

navLinks.forEach((navLink) => {
  if (currentPage.includes(navLink.href)) {
    navLink.classList.add('highlight')
  }
})

// GENERAL PROMPT TO EVERY DELETE RESOURCE REQUEST
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

// IMAGE PREVIEW FOR CREATE AND EDIT OF PRODUCTS
const image = document.querySelector('#product-image')
const preview = document.querySelector('#image-preview')

if (image && preview) {
  image.onchange = function () {
    const [file] = image.files
    preview.src = URL.createObjectURL(file)
  }
}

const closeSidebar = document.querySelector('#close-sidebar')
const showSidebar = document.querySelector('#show-sidebar')

const sidebarOverlay = document.querySelector('.sidebar-overlay')
const sidebar = document.querySelector('.sidebar')

if (closeSidebar) {
  closeSidebar.addEventListener('click', function () {
    sidebar.style.left = '-200px'
    sidebarOverlay.style.display = 'none'
  })
}

if (showSidebar) {
  showSidebar.addEventListener('click', function () {
    sidebar.style.left = '0px'
    sidebarOverlay.style.display = 'flex'
  })
}
