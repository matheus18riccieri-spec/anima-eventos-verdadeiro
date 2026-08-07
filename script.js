document.documentElement.classList.replace('no-js', 'js')

document.getElementById('year').textContent = new Date().getFullYear()

const menuToggle = document.getElementById('menuToggle')
const mainNav = document.getElementById('mainNav')

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open')
  menuToggle.setAttribute('aria-expanded', String(isOpen))
})

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open')
    menuToggle.setAttribute('aria-expanded', 'false')
  })
})

const galleryTrack = document.getElementById('galleryTrack')
if (galleryTrack) {
  const slides = Array.from(galleryTrack.children)
  const dotsWrap = document.getElementById('galleryDots')

  const dots = slides.map((slide, i) => {
    const dot = document.createElement('button')
    dot.type = 'button'
    dot.className = 'gallery-dot'
    dot.setAttribute('aria-label', `Ir para foto ${i + 1}`)
    dot.addEventListener('click', () => {
      slide.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    })
    dotsWrap.appendChild(dot)
    return dot
  })

  const setActiveDot = index => {
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index))
  }
  setActiveDot(0)

  if ('IntersectionObserver' in window) {
    const dotObserver = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveDot(slides.indexOf(entry.target))
          }
        }
      },
      { root: galleryTrack, threshold: 0.6 },
    )
    slides.forEach(slide => dotObserver.observe(slide))
  }

  const scrollBySlide = dir => {
    const amount = slides[0].getBoundingClientRect().width + 18
    galleryTrack.scrollBy({ left: amount * dir, behavior: 'smooth' })
  }
  document.querySelector('.gallery-prev').addEventListener('click', () => scrollBySlide(-1))
  document.querySelector('.gallery-next').addEventListener('click', () => scrollBySlide(1))
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          observer.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
  )

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
} else {
  document
    .querySelectorAll('.reveal')
    .forEach(el => el.classList.add('in-view'))
}
