import '../css/app.css'

// HIGHLIGHT CURRENT PAGE LINK IN SIDEBAR
const currentPage = document.location.href
const navLinks = document.querySelectorAll('.nav-link')

navLinks.forEach((navLink) => {
  const baseUrl = navLink.getAttribute('data-base-url')
  if (currentPage.includes(baseUrl)) {
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

// CLOSE AND SHOW SIDEBAR
const closeSidebarBtn = document.querySelector('#close-sidebar')
const showSidebarBtn = document.querySelector('#show-sidebar')

const sidebarOverlay = document.querySelector('.sidebar-overlay')
const sidebar = document.querySelector('.sidebar')

function closeSidebar() {
  sidebar.style.left = '-200px'
  sidebarOverlay.style.display = 'none'
}

if (closeSidebarBtn) {
  closeSidebarBtn.addEventListener('click', closeSidebar)
}

if (showSidebarBtn) {
  showSidebarBtn.addEventListener('click', function () {
    sidebar.style.left = '0px'
    sidebarOverlay.style.display = 'flex'
  })
}

document.addEventListener('click', function (ev) {
  if (ev.target.className.includes('sidebar-overlay')) {
    closeSidebar()
  }
})

// DROPDOWN
const dropdownTriggers = document.querySelectorAll('[data-toggle="dropdown"]')

if (dropdownTriggers) {
  dropdownTriggers.forEach((trigger) => {
    const target = document.getElementById(trigger.getAttribute('data-target'))

    // wrapper for detect click outside of element
    const dropdownOffset = document.createElement('span')
    dropdownOffset.classList.add('dropdown-menu-offset')

    trigger.addEventListener('click', function () {
      target.parentElement.appendChild(dropdownOffset)
      target.classList.toggle('show')
    })

    dropdownOffset.addEventListener('click', (ev) => {
      target.classList.remove('show')
      dropdownOffset.remove()
    })
  })
}

// SHARE PANEL
const shareBtns = document.querySelectorAll('.share-catalog-btn')
const shareOverlays = document.querySelectorAll('.share-catalog-overlay')

if (shareBtns) {
  shareBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      const url = btn.getAttribute('data-url')

      if (navigator.share) {
        navigator
          .share({
            text: 'Compartilhe este catálogo com seus contatos',
            title: 'Compartilhar catálogo',
            url,
          })
          .then(() => {
            // colocar uma feedback de copiado
            console.log('Thanks for sharing')
          })
          .catch(() => {})
      } else {
        btn.parentNode.querySelector('.share-panel').classList.toggle('show')
        const overlay = btn.parentNode.querySelector('.share-catalog-overlay')
        overlay.classList.toggle('show')

        overlay.addEventListener('click', function () {
          btn.parentNode.querySelector('.share-panel').classList.remove('show')
          overlay.classList.remove('show')
        })
      }
    })
  })
}

const btnCopyLinks = document.querySelectorAll('.btn-copy-link')

if (btnCopyLinks) {
  const copyCheckStatus = (btn) => {
    btn.innerHTML = `
    <i class="material-icons edit-color">done</i>
  `

    setTimeout(() => {
      btn.innerHTML = `
      <i class="material-icons edit-color">content_copy</i>
    `
    }, 2000)
  }

  btnCopyLinks.forEach((btn) => {
    btn.addEventListener('click', function () {
      const inputUrl = btn.parentNode.querySelector('input')
      inputUrl.focus()

      if (navigator.clipboard) {
        navigator.clipboard.writeText(inputUrl.value).then(() => {
          copyCheckStatus(btn)
        })
      } else {
        inputUrl.select()

        document.execCommand('copy')
        copyCheckStatus(btn)
      }
    })
  })
}

// PRICE MASK INPUT
const priceField = document.getElementById('price_field')

function priceMask(value) {
  let masked = value.replace(/\D/g, '')
  masked = Number(masked) / 100

  const formater = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return formater.format(masked)
}

function formatPrice() {
  this.value = priceMask(this.value)
}

if (priceField) {
  priceField.addEventListener('input', formatPrice)
}

// MASK INPUT ON LOAD
window.onload = function () {
  const maskedInputs = document.querySelectorAll('.price-field')

  if (maskedInputs) {
    maskedInputs.forEach((input) => {
      input.value = priceMask(input.value)
    })
  }
}
