import React, { useEffect, useState } from 'react'
import './Styling/Global.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import i18n from './i18n'
import {
  Navbar,
  Sidebar,
  Footer,
  NavbarDash,
  Menu,
  OrderDash,
  Outlet,
  LoginPage,
  CategoryDash,
  LivraisonDash,
  HeroDash,
} from './components'
import {
  Home,
  Products,
  SingleProduct,
  About,
  Cart,
  Error,
  Checkout,
  HomeDash,
} from './pages'

function Layout({ children, selectedLanguage, changeLanguage }) {
  return (
    <>
      <Navbar
        selectedLanguage={selectedLanguage}
        changeLanguage={changeLanguage}
      />
      <Sidebar />
      {children}
      <Footer />
    </>
  )
}
const Layout2 = () => (
  <>
    <div className='main'>
      <NavbarDash />
      <div className='container'>
        <div className='menuContainer'>
          <Menu />
        </div>
        <div className='contentContainer'>
          <Outlet />
        </div>
      </div>
    </div>
  </>
)

function App() {
  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
    localStorage.setItem('selectedLanguage', language)
    setSelectedLanguage(language)
  }
  useEffect(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage')
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage)
      setSelectedLanguage(storedLanguage)
    }
  }, [])
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem('selectedLanguage') || 'en'
  )
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/Admin'>
            <Layout2>
              <HomeDash />
            </Layout2>
          </Route>
          <Route exact path='/product'>
            <Layout2>
              <HomeDash />
            </Layout2>
          </Route>
          <Route exact path='/category'>
            <div className='main'>
              <NavbarDash />
              <div className='container'>
                <div className='menuContainer'>
                  <Menu />
                </div>
                <div className='contentContainer'>
                  <CategoryDash />
                </div>
              </div>
            </div>
          </Route>
          <Route exact path='/livraison'>
            <div className='main'>
              <NavbarDash />
              <div className='container'>
                <div className='menuContainer'>
                  <Menu />
                </div>
                <div className='contentContainer'>
                  <LivraisonDash />
                </div>
              </div>
            </div>
          </Route>
          <Route exact path='/orders'>
            <div className='main'>
              <NavbarDash />
              <div className='container'>
                <div className='menuContainer'>
                  <Menu />
                </div>
                <div className='contentContainer'>
                  <OrderDash />
                </div>
              </div>
            </div>
          </Route>
          <Route exact path='/HeroDash'>
            <div className='main'>
              <NavbarDash />
              <div className='container'>
                <div className='menuContainer'>
                  <Menu />
                </div>
                <div className='contentContainer'>
                  <HeroDash />
                </div>
              </div>
            </div>
          </Route>

          <Route exact path='/login' component={LoginPage} />

          <Route
            render={({ location }) => (
              <Layout
                selectedLanguage={selectedLanguage}
                changeLanguage={changeLanguage}
              >
                <Switch location={location}>
                  <Route
                    exact
                    path='/'
                    render={(props) => (
                      <Home {...props} selectedLanguage={selectedLanguage} />
                    )}
                  />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/cart' component={Cart} />
                  <Route exact path='/products' component={Products} />
                  <Route
                    exact
                    path='/products/:id'
                    render={(props) => (
                      <SingleProduct
                        {...props}
                        selectedLanguage={selectedLanguage}
                      />
                    )}
                  />

                  <Route exact path='/checkout' component={Checkout} />
                  <Route exact path='/*' component={Error} />
                </Switch>
              </Layout>
            )}
          />
        </Switch>
      </Router>
    </div>
  )
}

export default App
