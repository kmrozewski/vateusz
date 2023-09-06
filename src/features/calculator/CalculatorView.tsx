import React, {useEffect, useState} from 'react';
import {TextField, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import t from '../../assets/translations';

const Bold = styled('span')`
  font-weight: 700;
`;

const Input = styled(TextField)`
  margin-bottom: 12px;
`;

const CalculatorView: React.FC = () => {
  const [rate, setRate] = useState('');
  const [times, setTimes] = useState('');
  const [presentValue, setPresentValue] = useState('');
  const [payment, setPayment] = useState('');

  const calculatePayment = () => {
    const rateMonthly = Number(rate) / 100 / 12;
    const lower = Math.pow(1 + rateMonthly, -Number(times));

    return (Number(presentValue) * (rateMonthly / (1 - lower))).toFixed(2);
  };

  useEffect(() => {
    const newPayment = calculatePayment();
    if (newPayment) {
      setPayment(String(newPayment));
    }
  }, [rate, times, presentValue]);

  return (
    <>
      <Typography variant="h2" sx={{marginBottom: '24px', marginTop: '12px'}}>
        {t.calculator.title}
      </Typography>
      <Input label={t.calculator.rate} value={rate} onChange={e => setRate(e.target.value)} type="number" fullWidth />
      <Input label={t.calculator.times} value={times} onChange={e => setTimes(e.target.value)} type="number" fullWidth />
      <Input
        label={t.calculator.presentValue}
        value={presentValue}
        onChange={e => setPresentValue(e.target.value)}
        type="number"
        fullWidth
      />
      {payment && (
        <Typography variant="h2" sx={{marginTop: '20px'}}>
          {t.calculator.result}
          <Bold>{payment}</Bold>
        </Typography>
      )}
    </>
  );
};

export default CalculatorView;
