import React from "react";

const CastModal = ({ profiles = [], removeActor }) => {
  return (
    <>
      <dialog id="cast_modal" className="modal">
        <form method="dialog" className="modal-box ">
          <h3 className="font-bold text-lg">Writers</h3>
          {!profiles.length ? (
            <p className="text-error"> No Cast Selected</p>
          ) : (
            <section className="flex items-center space-x-5 justify-center">
              {profiles?.map((p, idx) => {
                const { _id, name, avatar } = p.profile;
                return (
                  <div key={_id} className="flex flex-col gap-2 mb-4">
                    <img
                      className="w-32 max-w-32 object-fill rounded-md shadow-sm "
                      src={avatar?.url}
                      alt={name}
                    />
                    <p className="text-lg font-semibold">{name}</p>
                    <button
                      className="btn btn-xs btn-outline btn-error"
                      onClick={() => removeActor(_id)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </section>
          )}

          <div className="modal-action">
            {/* if there is a button, it will close the modal */}
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default CastModal;
