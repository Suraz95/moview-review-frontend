import React from "react";

const ConfirmModal = ({ title, subtitle, onConfirm, loading }) => {
  return (
    <div>
      <dialog id="confirm_modal" className="modal">
        <div method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{subtitle}</p>
          <div className="modal-action">
            {loading ? (
              <>
                <span className="loading loading-spinner"></span>
                Please wait while we process your request
              </>
            ) : (
              <>
                <button
                  className="btn btn-sm btn-info btn-outline"
                  type="button"
                  onClick={() => window.confirm_modal.close()}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-sm btn-error"
                  type="button"
                  disabled={loading}
                  onClick={onConfirm}
                >
                  Confirm
                </button>
              </>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ConfirmModal;
