import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import Input from "../ui/Input";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function SignUp() {
  const navigate = useNavigate();
  const authValidationShema = Yup.object().shape({
    email: Yup.string()
      .email("email n'est pa valide")
      .required("email  obligatoire"),
    nameuser: Yup.string().required("name  obligatoire"),
    numerotel: Yup.string().required("numerotel  obligatoire"),
    password: Yup.string().required("password  obligatoire"),
  });

  const formik = useFormik({
    initialValues: {
      nameuser: "",
      email: "",
      numerotel: "",
      password: "",
    },
    onSubmit: (data) => {
      axios
        .post("http://localhost:8000/register", data)
        .then((response) => {
          // Traitement en cas de succès de la requête
          if (response.status) {
            Swal.fire({
              icon: "success",
              text: "'signup avec succés",
            });
            navigate("/horaire");
          } else {
            Swal.fire({
              icon: "success",
              text: "Erreur lors de l'inscription",
            });
          }
        })
        .catch((error) => {
          // Traitement en cas d'erreur de la requête
          console.error("Erreur lors de la requête", error);
        });
    },
    validationSchema: authValidationShema,
  });
  const { errors, getFieldProps } = formik;
  return (
    <div className="flex flex-col">
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-8 py-10 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 text-center">
                Create new account
              </h1>

              <FormikProvider value={formik}>
                <Form className="space-y-4 md:space-y-6">
                  <div>
                    <Input
                      {...getFieldProps("nameuser")}
                      label={"Name"}
                      placeholder={"please enter your name"}
                      error={Boolean(errors.nameuser)}
                      errorMessage={errors.nameuser}
                      type={"text"}
                      icon={"mdi:account"}
                    />
                  </div>

                  <div>
                    <Input
                      {...getFieldProps("email")}
                      label={"Email"}
                      placeholder={"please enter your email @gmail.com"}
                      error={Boolean(errors.email)}
                      errorMessage={errors.email}
                      type={"email"}
                      icon={"mdi:email"}
                    />
                  </div>
                  <div>
                    <Input
                      {...getFieldProps("numerotel")}
                      label={"Phone"}
                      placeholder={"please enter your phone number"}
                      error={Boolean(errors.numerotel)}
                      errorMessage={errors.numerotel}
                      type={"text"}
                      icon={"mdi:phone"}
                    />
                  </div>
                  <div>
                    <Input
                      {...getFieldProps("password")}
                      label={"Password"}
                      placeholder={"****************"}
                      error={Boolean(errors.password)}
                      errorMessage={errors.password}
                      type={"password"}
                      icon={"mdi:lock"}
                    />
                  </div>
                  <button
                    type="submit"
                    className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                  >
                    Create account
                  </button>
                </Form>
              </FormikProvider>
              <p>
                {" "}
                <Link to={"/"}>you have an account ? </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
