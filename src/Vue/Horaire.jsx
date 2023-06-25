import * as React from "react";
import { useEffect } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import Input from "../ui/Input";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import axios from "axios";
import Swal from "sweetalert2";

export default function Horaire() {
  const navigate = useNavigate();
  const authValidationSchema = Yup.object().shape({
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
      const { destination, dateentrer, datesortie } = data;
      const url = `/maps?destination=${encodeURIComponent(
        destination
      )}&dateentrer=${encodeURIComponent(
        dateentrer
      )}&datesortie=${encodeURIComponent(datesortie)}`;

      navigate(url);
      Swal.fire({
        icon: "success",
        title: "Votre demande a été envoyé",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    validationSchema: authValidationSchema,
  });

  const { errors, getFieldProps } = formik;

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       async (position) => {
  //         const { latitude, longitude } = position.coords;
  //         const apiUrl = `https://geocoding-api.com/v1/reverse?lat=${latitude}&lon=${longitude}&key=AIzaSyCHc5NI8qU_WJ7X0UqoOD33VzvKibsxVkU`;
  //         try {
  //           const response = await axios.get(
  //             // Use the CORS Anywhere proxy URL
  //             `https://cors-anywhere.herokuapp.com/${apiUrl}`
  //           );
  //           const location = response.data?.address || "";
  //           formik.setFieldValue("destination", location);
  //         } catch (error) {
  //           console.error("Error retrieving location:", error);
  //         }
  //       },
  //       (error) => {
  //         console.error("Error getting current position:", error);
  //       }
  //     );
  //   } else {
  //     console.error("Geolocation is not supported by this browser.");
  //   }
  // }, [formik]);

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
