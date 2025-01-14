import React from "react";

export default function Modal() {
  return (
    <>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="adminAlertModal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Peringatan</h3>
          <p className="py-4">
            Untuk sementara ini, data keranjang hanya disimpan pada penyimpanan
            lokal dan bukan melalui akun.
          </p>
          <div className="modal-action">
            <label htmlFor="adminAlertModal" className="btn">
              OK
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
