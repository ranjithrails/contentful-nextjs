import { Navbar, Container, Nav} from 'react-bootstrap';
import Image from 'next/image';
const Navapp = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
    <Container>
    <Navbar.Brand href="/">
    <Image
      src={'/assets/personio-logo.png'}
      alt="Personio"
      width={127}
      height={40}
    />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ms-auto">
        <Nav.Link href="/">Product</Nav.Link>
        <Nav.Link href="/">Why Personio</Nav.Link>
        <Nav.Link href="/">Pricing</Nav.Link>
        <Nav.Link href="/">About Personio</Nav.Link>
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>
 )
};

export default Navapp;