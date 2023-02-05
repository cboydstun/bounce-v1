export { Page }

import React from 'react'

import { Container } from 'react-bootstrap';

import HeroCarousel from '../../components/HeroCarousel';
import EmailForm from '../../components/EmailForm';

function Page() {
  return (
    <>
      <Container>
        <HeroCarousel />
        <EmailForm />

      </Container>
    </>
  )
}
