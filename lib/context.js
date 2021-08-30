import React, { createContext, useContext, useEffect, useState } from 'react'

// Set our initial context states
const initialContext = {
  meganav: {
    isOpen: false,
    activeID: null,
  },
}

// Set context
const SiteContext = createContext({
  context: initialContext,
  setContext: () => null,
})

/*  ------------------------------ */
/*  Our Context Wrapper
/*  ------------------------------ */

const SiteContextProvider = ({ children }) => {
  const [context, setContext] = useState(initialContext)

  return (
    <SiteContext.Provider
      value={{
        context,
        setContext,
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}

// Access our global context states
function useSiteContext() {
  const { context } = useContext(SiteContext)
  return context
}

// Toggle Mega Navigation states
function useToggleMegaNav() {
  const {
    context: { meganav },
    setContext,
  } = useContext(SiteContext)

  async function toggleMegaNav(state, id = null) {
    setContext((prevState) => {
      return {
        ...prevState,
        meganav: {
          isOpen: state === 'toggle' ? !meganav.isOpen : state,
          activeID: state === 'toggle' && meganav.isOpen ? null : id,
        },
      }
    })
  }
  return toggleMegaNav
}

export { SiteContextProvider, useSiteContext, useToggleMegaNav }
