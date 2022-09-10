const InvitationForm = () => {
  return (
    <form className="w-1/3 flex flex-col space-y-2">
      <label htmlFor="invitationEmail">Email</label>
      <input type="text" placeholder="Invitation email" id="invitationEmail" />
      <button className="w-full">Invite</button>
    </form>
  );
};

export default InvitationForm;
