import React, { useState, useEffect } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  CardElement,
  /*useElements, useStripe*/
} from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#333",
      color: "#555",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#aaa" },
    },
    invalid: {
      iconColor: "#ff4444",
      color: "#ff4444",
    },
  },
};

const PaymentForm = () => {
  const redirect = useNavigate();
  const location = useLocation();
  const [parkingName, setParkingName] = useState("");
  const [parkingCapacity, setParkingCapacity] = useState("");
  const [parkingPrice, setParkingPrice] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setParkingName(queryParams.get("parkingName") || "");
    setParkingCapacity(queryParams.get("parkingCapacity") || "");
    setParkingPrice(queryParams.get("parkingPrice") || "");
  }, [location.search]);

  const [touched, setTouched] = useState({
    cardNumber: false,
    expirationDate: false,
    cvc: false,
  });

  const paymentValidationSchema = Yup.object().shape({
    cardNumber: Yup.string().required("Card number is required"),
    expirationDate: Yup.string().required("Expiration date is required"),
    cvc: Yup.string().required("CVC is required"),
  });

  const handleSubmit = async (values) => {
    // Perform Stripe payment processing here using the `stripe` and `elements` objects

    Swal.fire({
      title: "Enter your email",
      input: "email",
      inputLabel: "Email",
      inputPlaceholder: "Enter your email address",
      showCancelButton: true,
      confirmButtonText: "envoyer QR code",
      cancelButtonText: "Cancel",
      preConfirm: (email) => {
        // Do something with the retrieved email
        console.log("Entered email:", email);

        const body = {email: email}
        axios.post("http://localhost:8000/ticket", body)
        // Perform any necessary actions with the email (e.g., send it to the server)
        Swal.fire({
          title: "Payment Successful!",
          text: `You have successfully paid for your order at ${parkingName}. Capacity: ${parkingCapacity}, Price: ${parkingPrice}`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      },
    });

    // Get the query parameters from the current URL
    const queryParams = new URLSearchParams(window.location.search);
    const parkingName = queryParams.get("parkingName");
    const parkingCapacity = queryParams.get("parkingCapacity");
    const parkingPrice = queryParams.get("parkingPrice");
    const parkingLat = queryParams.get("parkingLat");
    const parkingLng = queryParams.get("parkingLng");

    // Redirect to "/mapspay" with the retrieved query parameters
    redirect(
      `/mapspay?parkingName=${parkingName}&parkingCapacity=${parkingCapacity}&parkingPrice=${parkingPrice}&parkingLat=${parkingLat}&parkingLng=${parkingLng}`
    );
  };

  const handleCardElementChange = (event) => {
    setTouched((prevTouched) => ({
      ...prevTouched,
      [event.elementType]: event.empty || event.error ? true : false,
    }));
  };

  return (
    <div className="flex flex-col">
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-8 py-10 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 text-center">
                Payment Details
              </h1>

              <Formik
                initialValues={{
                  cardNumber: "",
                  expirationDate: "",
                  cvc: "",
                }}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form className="space-y-4 md:space-y-6">
                    <div>
                      <label htmlFor="cardNumber">Card Number</label>
                      <CardElement
                        id="cardNumber"
                        options={{
                          ...CARD_OPTIONS,
                          style: {
                            ...CARD_OPTIONS.style,
                            base: {
                              ...CARD_OPTIONS.style.base,
                              color: "#000",
                              "::placeholder": { color: "#999" },
                            },
                          },
                        }}
                        onChange={handleCardElementChange}
                      />
                      {touched.cardNumber && errors.cardNumber && (
                        <ErrorMessage
                          name="cardNumber"
                          component="div"
                          className="text-red-500"
                        />
                      )}
                    </div>
                    {/* Add other form fields and error messages here */}
                    <button
                      type="submit"
                      className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                    >
                      Pay
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentForm;
