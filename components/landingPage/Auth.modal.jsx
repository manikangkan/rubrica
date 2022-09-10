import InvitationForm from "./Invitation.form";

const Auth = ({ setIsAuthModalOpen }) => {
  return (
    <div className="h-full w-full fixed top-0 flex flex-col justify-end">
      {/* form */}
      <div className="h-1/3 bg-white flex flex-col justify-center items-center z-50 relative">
        <div className="w-20 h-1 rounded-full bg-black absolute top-2" />
        <InvitationForm />
      </div>
      {/* overlay */}
      <div
        className="w-full h-full bg-black/50 absolute cursor-pointer text-white flex justify-center items-center"
        onClick={() => setIsAuthModalOpen(false)}>
        <p>Tap here to close the modal</p>
      </div>
    </div>
  );
};

export default Auth;
