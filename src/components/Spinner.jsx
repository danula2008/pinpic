import React from 'react';
import { DNA } from 'react-loader-spinner';

const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <DNA
        height="100"
        width="100"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
  />

      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}

export default Spinner;