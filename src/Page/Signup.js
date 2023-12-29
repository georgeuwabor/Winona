import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertShow, setAlertShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlertMessage("Password do not match.");
      setAlertVariant("danger");
      setAlertShow(true);
    } else {
      try {
        const response = await fetch("/api/users/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        if (response.ok) {
          setAlertMessage("Signup successful. Redirecting to login page...");
          setAlertVariant("success");
          setAlertShow(true);
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000);
        } else {
          const error = await response.json();
          setAlertMessage(error.message);
          setAlertVariant("danger");
          setAlertShow(true);
        }
      } catch (error) {
        setAlertMessage(
          "An unexpected error occurred. Please try again later."
        );
        setAlertVariant("danger");
        setAlertShow(true);
      }
    }
  };

  return (
    <Container>
      <h1 className="signup-text">Signup</h1>
      <Form onSubmit={handleSubmit} className="form">
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <Alert show={alertShow} variant={alertVariant} className="alert-text">
        {alertMessage}
      </Alert>
    </Container>
  );
};

export default Signup;
