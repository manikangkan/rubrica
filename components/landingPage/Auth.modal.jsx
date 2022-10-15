import { useState } from "react";
import { authFormState } from "../../data/authFormState";
import AuthForm from "./Auth.form";

const AuthModal = ({ setIsAuthModalOpen }) => {
  // catch the token from localStorage and set it to the state
  const isAdministratorLoggedIn = localStorage.getItem("rubrica admin");

  return (
    <div className="h-full w-full fixed top-0 flex flex-col justify-end">
      {/* form */}
      <div className="h-1/2 bg-white flex flex-col justify-center items-center z-50 relative">
        <div className="w-20 h-1 rounded-full bg-black absolute top-2" />
        {isAdministratorLoggedIn ? (
          <AuthForm
            data={authFormState[0]}
            setIsAuthModalOpen={setIsAuthModalOpen}
          />
        ) : (
          <AuthForm
            data={authFormState[1]}
            setIsAuthModalOpen={setIsAuthModalOpen}
          />
        )}
      </div>
      {/* overlay */}
      <div
        className="w-full h-full bg-black/50 absolute cursor-pointer text-white flex justify-center items-center"
        onClick={() => setIsAuthModalOpen(false)}
      >
        {/* <p className="text-white">Tap here to close the modal</p> */}
      </div>
    </div>
  );
};

export default AuthModal;
