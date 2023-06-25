import * as React from "react";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import Input from "../ui/Input";
export default function Horaire() {
  const authValidationShema = Yup.object().shape({
    // destination: est maps
    destination: Yup.string().required("Destination obligatoire"),
    dateentrer: Yup.date().required("Date entrer obligatoire"),
    datesortie: Yup.date().required("Date sortie obligatoire"),
  });

  const formik = useFormik({
    initialValues: {
      destination: "",
      dateentrer: "",
      datesortie: "",
    },
    onSubmit: (data) => {
      console.log(data);
      // logique
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
              <FormikProvider value={formik}>
                <Form className="space-y-4 md:space-y-6">
                  <div>
                    <Input
                      {...getFieldProps("destination")}
                      label={"Destination"}
                      error={Boolean(errors.destination)}
                      errorMessage={errors.destination}
                      type={"text"}
                      icon={"mdi:map-marker"}
                    />
                  </div>
                  <div>
                    <Input
                      {...getFieldProps("dateentrer")}
                      label={"Date entrer"}
                      error={Boolean(errors.dateentrer)}
                      errorMessage={errors.dateentrer}
                      type={"datetime-local"}
                      icon={"mdi:calendar"}
                    />
                  </div>
                  <div>
                    <Input
                      {...getFieldProps("datesortie")}
                      label={"Date sortie"}
                      error={Boolean(errors.datesortie)}
                      errorMessage={errors.datesortie}
                      type={"datetime-local"}
                      icon={"mdi:calendar"}
                    />
                  </div>
                  <button
                    type="submit"
                    className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                  >
                    je consulte les horaires
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
