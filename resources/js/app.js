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

// CLOSE AND SHOW SIDEBAR
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

// TAB
function TabNavigation() {
  const links = document.querySelector('.tab-links').children
  const contents = document.querySelector('.tab-content').children
  const defaultOpen = document.querySelector('[data-default]')

  function hideAllContents() {
    contents.forEach((tabContent) => {
      tabContent.style.display = 'none'
    })
  }

  function removeAllClassesActive() {
    links.forEach((tab) => {
      tab.className = tab.className.replace(' active', '')
    })
  }

  function showCurrentTab(id) {
    const tabContent = document.querySelectorAll(`.${id}`)

    tabContent.forEach((tab) => {
      const mediaQueryRule = window.matchMedia('(max-width: 750px)')
      if (mediaQueryRule.matches) {
        tab.style.display = 'flex'
      } else {
        tab.style.display = 'table-row'
      }
    })
  }

  function selectTab(event) {
    hideAllContents()
    removeAllClassesActive()

    const target = event.currentTarget
    target.className += ' active'
    showCurrentTab(target.dataset.id)
  }

  function listenChanges() {
    links.forEach((tab) => {
      tab.addEventListener('click', selectTab)
    })
  }

  function init() {
    hideAllContents()
    listenChanges()

    defaultOpen.click()
  }

  return {
    init,
  }
}

window.addEventListener('load', () => {
  const tabNavigation = TabNavigation()
  tabNavigation.init()
})
