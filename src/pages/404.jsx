import React from 'react'
import {ReactComponent as NotFoundImage} from '../assets/illustrations/oops-404-error-with-a-broken-robot-animate.svg'
import Seo from '../components/seo'
import '../styles/svg.css'

export default function NotFoundPage() {
  return (
    <div className="svg-wrapper">
      <Seo title='page not found' />
      <NotFoundImage />
        
    </div>
  )
}
