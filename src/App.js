// import React from 'react'
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import { Navbar, Sidebar, Footer } from './components'
// import {
//   Home,
//   Products,
//   SingleProduct,
//   About,
//   Cart,
//   Error,
//   Checkout,
//   HomeDash,
// } from './pages'

// function App() {
//   return (
//     <div>
//       <Router>
//         <Navbar />
//         <Sidebar />
//         <Switch>
//           <Route exact path='/'>
//             <Home />
//           </Route>
//           <Route exact path='/about'>
//             <About />
//           </Route>
//           <Route exact path='/cart'>
//             <Cart />
//           </Route>
//           <Route exact path='/products'>
//             <Products />
//           </Route>
//           <Route exact path='/Admin'>
//             <HomeDash />
//           </Route>
//           <Route exact path='/products/:id' children={<SingleProduct />} />
//           <Route exact path='/checkout'>
//             <Checkout />
//           </Route>
//           <Route exact path='/*'>
//             <Error />
//           </Route>
//         </Switch>
//         <Footer />
//       </Router>
//     </div>
//   )
// }

// export default App
import React from 'react'

import './Styling/Global.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
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
  AddProduct,
  LivraisonDash,
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

const Layout = ({ children }) => (
  <>
    <Navbar />
    <Sidebar />
    {children}
    <Footer />
  </>
)
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
  return (
    // <div>
    //   <Router>
    //     <Switch>
    //       <Route
    //         render={({ location2 }) => (
    //           <Layout2>
    //             <Switch location={location2}>
    //               <Route exact path='/Admin'>
    //                 <HomeDash />
    //               </Route>
    //               <Route exact path='/product'></Route>
    //               <Route exact path='/orders'></Route>
    //             </Switch>
    //           </Layout2>
    //         )}
    //       />

    //       {/* Separate route for HomeDash without Navbar and Footer */}
    //       {/* <Route exact path='/Admin'>
    //         <HomeDash />
    //       </Route>
    //       <Route exact path='/product'>
    //         <HomeDash />
    //       </Route> */}

    //       {/* Wrap other routes with Layout */}
    //       <Route
    //         render={({ location }) => (
    //           <Layout>
    //             <Switch location={location}>
    //               <Route exact path='/' component={Home} />
    //               <Route exact path='/about' component={About} />
    //               <Route exact path='/cart' component={Cart} />
    //               <Route exact path='/products' component={Products} />
    //               <Route exact path='/products/:id' component={SingleProduct} />
    //               <Route exact path='/checkout' component={Checkout} />
    //               <Route exact path='/*' component={Error} />
    //             </Switch>
    //           </Layout>
    //         )}
    //       />
    //     </Switch>
    //   </Router>
    // </div>
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

          <Route exact path='/login' component={LoginPage} />

          <Route
            render={({ location }) => (
              <Layout>
                <Switch location={location}>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/cart' component={Cart} />
                  <Route exact path='/products' component={Products} />
                  <Route exact path='/products/:id' component={SingleProduct} />
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
