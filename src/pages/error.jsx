import React from 'react'
import {ReactComponent as ErrorImage} from '../assets/illustrations/Missed chances-amico.svg'
import Seo from '../components/seo'
import '../styles/svg.css'

export default function ErrorPage() {
  return (
    <div className="svg-wrapper">
      <Seo title='order failed' />

      <h1>ORDER FAILED </h1>
      <ErrorImage />
        
    </div>
  )
}
