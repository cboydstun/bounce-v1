export { Page }

import React from 'react'

import { Container } from 'react-bootstrap';

import HeroCarousel from '../../components/HeroCarousel';
import EmailForm from '../../components/EmailForm';

function Page() {
  return (
    <>
    <h1>HELLO WORLD</h1>
      <Container>
        <HeroCarousel />
        <EmailForm />

      </Container>
    </>
  )
}
