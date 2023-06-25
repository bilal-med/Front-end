import React from "react";
import { useNavigate } from "react-router-dom";
import  qrcode1 from "./qrCode/1.png"
import  qrcode2 from "./qrCode/2.png"
import  qrcode3 from "./qrCode/3.png"
import  qrcode4 from "./qrCode/4.png"
import  qrcode5 from "./qrCode/5.png"
import  qrcode6 from "./qrCode/6.png"
import  qrcode7 from "./qrCode/7.png"
import  qrcode8 from "./qrCode/8.png"
import  qrcode9 from "./qrCode/9.png"
import  qrcode10 from "./qrCode/10.png"

export default function Ticket() {
  const images = [qrcode1, qrcode2, qrcode3, qrcode4, qrcode5, qrcode6, qrcode7, qrcode8, qrcode9, qrcode10]
  const randomNumber = Math.floor(Math.random() * 10) + 1;

  const img = (images[randomNumber] != null) ? images[randomNumber]: qrcode3;

  const navigate = useNavigate();

  const handleClick = () => {
    // Action à effectuer lors du clic sur le bouton
    // Vous pouvez ajouter votre logique ici
    // Par exemple, naviguer vers une autre page en utilisant `navigate('/chemin-de-la-page')`

  };

  return (
      <div className="flex flex-col">
        <section className="bg-gray-50">
          <div className="flex flex-col items-center justify-center px-8 py-10 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 text-center">
                  Vérifier votre ticket
                </h1>
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <img src={img} alt="Votre ticket" />
                  </div>

                  <button
                      type="button"
                      className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                      onClick={handleClick}
                  >
                    Trajet optimal vers la place de stationnement
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}
