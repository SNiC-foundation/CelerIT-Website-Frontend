import React from 'react';
import { Check, Clear } from '@mui/icons-material';

interface Props {
  hasEightCharacters: boolean;
  hasLowerCase: boolean;
  hasUpperCase: boolean;
  hasNumbers: boolean;
  hasSymbols: boolean;
}

function PasswordResetFormRequirements({
  hasEightCharacters, hasLowerCase, hasUpperCase, hasNumbers, hasSymbols,
}: Props) {
  const options = [{
    checked: hasEightCharacters,
    label: 'At least 8 characters long',
  }, {
    checked: hasLowerCase,
    label: 'At least 1 lowercase character',
  }, {
    checked: hasUpperCase,
    label: 'At least 1 uppercase character',
  }, {
    checked: hasNumbers,
    label: 'At least 1 number',
  }, {
    checked: hasSymbols,
    label: 'At least 1 special symbol',
  }];

  return (
    <table
      style={{
        textAlign: 'left',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontStyle: 'italic',
      }}
    >
      {options.map((o) => (
        <tbody>
          <tr>
            <td>{o.checked ? <Check color="success" /> : <Clear color="error" />}</td>
            <tr>{o.label}</tr>
          </tr>
        </tbody>
      ))}
    </table>
  );
}

export default PasswordResetFormRequirements;
