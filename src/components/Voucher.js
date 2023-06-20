
import React, { useState, useEffect } from 'react';
import '../styles/Voucher.css';
import voucherImage from '../images/voucher.png';
import axios from 'axios';


const Voucher = () => {
  const [receiverName, setReceiverName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [purpose, setPurpose] = useState('');
  const [num,setNum]=useState('');
  const [submitted, setSubmitted] = useState(false); // Track form submission
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [barcodeUrl, setBarcodeUrl] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault()
    var data = JSON.stringify({
      "type": "DISCOUNT_VOUCHER",
      "discount": {
        "amount_off": "2000",
        "type": "AMOUNT"
      },
      "redemption": {
        "quantity": 1
      },
      "metadata": {}
    });

    var config = {
      method: 'post',
      url: `https://as1.api.voucherify.io/v1/vouchers/${num}`,
      headers: {
        'X-App-Id': '75ed398e-2e66-4c03-a1cd-bd2b7683ab53',
        'X-App-Token': 'eee6eebb-9855-4bb9-9eaa-b1edbbaac064',
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setSubmitted(true); // Update the state to indicate form submission
      setQrCodeUrl(response.data.assets.qr.url);
      setBarcodeUrl(response.data.assets.barcode.url);
    })
    .catch(function (error) {
      console.log(error);
    });
};

// Render coupon box if form is submitted
const renderCouponBox = () => {
  if (submitted) {
    return (
      <div className="coupon-box">
        <div className="coupon-content">
          <h3 className="coupon-heading">Voucher Details</h3>
          <p className="coupon-text">Receiver's Name: {receiverName}</p>
          <p className="coupon-text">Amount: {amount}</p>
          <p className="coupon-text">Purpose: {purpose}</p>
          <p className="expiry-date">Expiry Date: {expiryDate}</p>
        </div>
        <div className="code-images">
          <img src={qrCodeUrl} alt="QR Code" className="qr-code" />
          <img src={barcodeUrl} alt="Barcode" className="barcode" />
        </div>
        
      </div>
    );
  }
  return null;
};

  return (
    <div className="voucher-container">
      <h2 className="voucher-heading">Voucher</h2>
      <div className="voucher-inner-container">
        <form className="voucher-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              placeholder="Receiver's Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Mobile Number"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount (Max: 100000)"
              max={100000}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="Expiry Date (Max: 1 year)"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Purpose"
              required
            />
          </div>
          <button type="submit" className="voucher-submit-btn">
            Submit
          </button>
        </form>
      </div>
      <div className="coupon-container">{renderCouponBox()}</div>
      <img src={voucherImage} alt="Voucher" className="voucher-image" />
    </div>
  );
};

export default Voucher;