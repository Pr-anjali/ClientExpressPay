import React from 'react';
import QRCode from 'qrcode.react';
import Barcode from 'react-barcode';
import '../styles/CouponPage.css';

const CouponPage = ({ name, amount, purpose, expiryDate, barcode, qrCode }) => {
  return (
    <div className="coupon">
      <h2>{name}</h2>
      <p>Amount: {amount}</p>
      <p>Purpose: {purpose}</p>
      <p>Expires on: {expiryDate}</p>
      <div className="qr-code">
        <QRCode value={qrCode} />
      </div>
      <div className="barcode">
        <Barcode value={barcode} />
      </div>
    </div>
  );
};

export default CouponPage;
