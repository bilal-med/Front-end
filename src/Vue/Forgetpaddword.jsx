import * as React from "react";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import Input from "../ui/Input";
import axios from "axios";
import Swal from "sweetalert2";

export default function ForgetPasswoord() {
  const authValidationShema = Yup.object().shape({
    email: Yup.string()
      .email("email n'est pa valide")
      .required("email  obligatoire"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (data) => {
      Swal.fire({
        icon: "success",
        text: "'Demande de réinitialisation de mot de passe envoyée",
      });
      axios
        .post("http://localhost:8000/forgotPassword", data)
        .then((response) => {
          if (response.status) {
            Swal.fire({
              icon: "success",
              text: "'Demande de réinitialisation de mot de passe envoyée",
            });
          } else {
            Swal.fire({
              icon: "success",
              text: "Erreur lors de la demande de réinitialisation de mot de passe",
            });
          }
        })
        .catch((error) => {
          // Traitement en cas d'erreur de la requête
          console.error("Erreur lors de la requête", error);
        });
      formik.resetForm();
    },

    validationSchema: authValidationShema,
  });
  const { errors, getFieldProps } = formik;
  return (
    <div className="flex flex-col">
      <section className="bg-gray-50">
        <div
          className="flex flex-col items-center justify-center 
                px-8 py-10 mx-auto md:h-screen lg:py-0"
        >
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 text-center">
                Forgot password
              </h1>
              <FormikProvider value={formik}>
                <Form className="space-y-4 md:space-y-6">
                  <div>
                    <Input
                      {...getFieldProps("email")}
                      label={"Email"}
                      error={Boolean(errors.email)}
                      errorMessage={errors.email}
                      type={"email"}
                      icon={"mdi:email"}
                    />
                  </div>
                  <button
                    type="submit"
                    className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                  >
                    Recover password
                  </button>
                </Form>
              </FormikProvider>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
