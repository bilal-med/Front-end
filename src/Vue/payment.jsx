import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../ui/Input";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  // Define validation rules for your form fields
  // Example:
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Payment = () => {
  const initialValues = {
    email: "",
    password: "",
    // Add other form fields as needed
  };

  const handleSubmit = (values) => {
    // Handle form submission logic here
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
        />
        {/* Add other form fields using the Input component */}
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default Payment;
