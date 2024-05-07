import React, { useState } from 'react';
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import { Spinner } from '@chakra-ui/react';

function VerifyInputIcon(props) {
  // check if input is valid
  const [validInput, setValidInput] = useState(true);

  console.log(setValidInput);
  const isLoading = true;

  if (isLoading) {
    return (
      <div>
        <Spinner colorScheme="gray" size="xs" />
      </div>
    );
  } else if (validInput) {
    return (
      <CheckCircleIcon colorScheme="green" size="xs" variant="solid" />
    );
  } else {
    return (
      <WarningIcon colorScheme="red" size="xs" variant="solid" />
    );
  }
}

export default VerifyInputIcon;