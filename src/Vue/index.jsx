import * as React from "react";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import Input from "../ui/Input";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

export default function SignIn() {
  const navigate = useNavigate();
  const authValidationShema = Yup.object().shape({
    email: Yup.string()
      .email("email n'est pa valide")
      .required("email  obligatoire"),
    password: Yup.string().required("mot de passe  obligatoire"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (data) => {
      navigate("/horaire");
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
                Connectez Vous
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
                  <div>
                    <Input
                      {...getFieldProps("password")}
                      label={" Mot de passe"}
                      error={Boolean(errors.password)}
                      errorMessage={errors.password}
                      type={"password"}
                      icon={"mdi:password"}
                    />
                  </div>

                  <button
                    type="submit"
                    className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                  >
                    Se connecter
                  </button>
                  <p>
                    {" "}
                    <Link to={"/SignUp"}>Vous n'avez pas un compte ? </Link>
                    <Link to={"/forgotPassword"}>mot de passe oublier? </Link>
                  </p>
                </Form>
              </FormikProvider>
            </div>
          </div>
        </div>
        {/* <Link to={"/payment"}>payment test </Link> */}
      </section>
    </div>
  );
}
