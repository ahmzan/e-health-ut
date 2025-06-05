import { LucideMenu } from 'lucide-react'

const Navbar = () => {
  const toggleMenu = () => {
    const mobileMenu = document.getElementById('mobileMenu')

    mobileMenu?.classList.toggle('hidden')
  }

  const cssMobile =
    'hidden bg-white absolute top-16 w-full left-0 p-4 shadow-lg flex flex-col text-center text-xl space-y-4'
  const cssDesktop =
    'md:flex md:relative md:top-auto md:w-auto md:left-auto md:p-0 md:shadow-none md:flex-row md:space-y-0 md:space-x-8'

  return (
    <nav className='bg-white shadow-lg fixed w-full z-50'>
      <div className='container mx-auto px-6 py-4'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold text-blue-800'>E-Health</h1>
          <ul className={cssMobile + ' ' + cssDesktop} id='mobileMenu'>
            <li>
              <a href='/#home' className='text-gray-600 hover:text-blue-800 transition duration-300'>
                Beranda
              </a>
            </li>
            <li>
              <a href='/#artikel' className='text-gray-600 hover:text-blue-800 transition duration-300'>
                Artikel
              </a>
            </li>
            <li>
              <a href='/#kategori' className='text-gray-600 hover:text-blue-800 transition duration-300'>
                Kategori
              </a>
            </li>
            <li>
              <a href='/#tentang' className='text-gray-600 hover:text-blue-800 transition duration-300'>
                Tentang
              </a>
            </li>
            <li>
              <a href='/#kontak' className='text-gray-600 hover:text-blue-800 transition duration-300'>
                Kontak
              </a>
            </li>
          </ul>

          <button className='md:hidden' id='mobileMenuButton' onClick={toggleMenu}>
            <LucideMenu />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
