import React from 'react'
import { Container } from 'react-bootstrap'

export default function Footer() {
  return (
    <footer className="py-4 bg-light border-top mt-auto">
      <Container className="text-center small">
        © {new Date().getFullYear()} FER202 Assignment. All rights reserved. |
        {' '}
        <a href="https://github.com/NguyenDat204/FER202" target="_blank" rel="noreferrer">MyGithub</a>
      </Container>
    </footer>
  )
}
