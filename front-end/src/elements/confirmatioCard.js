import "../elements/css/showModuls.sass";
function ConfirmationCard({ setConfirmDel, delName, deleteModule }) {
  return (
    <div class="d-flex flex-column aligns-items-center justify-content-center text-center w-75 mx-auto">
      <div class="alert alert-warning" role="alert">
        <strong>WARNING!</strong>
      </div>
      <div>
        <p class="card-top">
          Some node are using
          <strong style={{ color: "red" }}> {delName} </strong>. Are youshure
          you want to delete {delName}?
        </p>
        <div class="card-body" style={{ color: "black" }}>
          <p>
            If you decide to delete it, the nodes using the module wil be
            deleted too
          </p>
          <div className="deleteFormButtons">
            <button
              type="button"
              class="no deleteModul"
              onClick={() => deleteModule(delName, true)}
            >
              Yes
            </button>
            <button
              type="button"
              class="yes NoDeleteModul"
              onClick={() => setConfirmDel(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ConfirmationCard;
