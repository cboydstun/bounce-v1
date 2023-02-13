export { Page }

import React from 'react'

import Home from '../Home'

function Page(props) {

  return (
    <div>
      <Home props={props} />
    </div>
  )
}
