'use client';

import React from 'react';
import { StoreInfo as StoreInfoType } from '../types';

interface StoreInfoProps {
  info: StoreInfoType;
}

const StoreInfo: React.FC<StoreInfoProps> = ({ info }) => {
  return (
    <div className="store-info">
      <img
        src={info.illustration}
        alt="Solovino Store Illustration"
        className="store-illustration"
        style={{ width: '600px', height: '400px', objectFit: 'contain' }}
      />
      <div className="store-info-content">
        <div className="store-title">
          <span className="store-location">{info.location.toUpperCase()}</span>
        </div>
        <div className="store-hours">{info.hours}&nbsp;<span>{info.hours.includes('hrs.') ? '' : 'hrs.'}</span></div>
        <div className="store-address">
          {info.address.split('<br>').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < info.address.split('<br>').length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreInfo; 