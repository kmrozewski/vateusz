import React, {useState} from 'react';
import {Box, Button, TextField, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import translations from '../../assets/translations';
import {MathJax} from 'better-react-mathjax';
import {useForm} from 'react-hook-form';

interface IForm {
  rate: number;
  times: number;
  presentValue: number;
}

const Bold = styled('span')`
  font-weight: 700;
`;

const Small = styled(Typography)`
  font-size: 14px;
`;

const t = translations.calculator;
const validationOptions = {
  required: t.form.required,
  min: {value: 0, message: t.form.min},
};

const getMaxValidationOption = (value: number) => ({value, message: `${t.form.max} ${value}`});

const CalculatorView: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<IForm>();
  const [payment, setPayment] = useState('');

  const onSubmit = ({rate, times, presentValue}: IForm) => {
    const rateMonthly = Number(rate) / 100 / 12;
    const lower = Math.pow(1 + rateMonthly, -Number(times));
    const installment = Number(presentValue) * (rateMonthly / (1 - lower));

    if (!isNaN(installment) && isFinite(installment)) {
      setPayment(installment.toFixed(2));
    }
  };

  return (
    <>
      <Typography variant="h2" sx={{marginBottom: '24px', marginTop: '12px'}}>
        {t.title}
      </Typography>
      <div>
        <MathJax>
          <Typography>{t.formula.pmt}</Typography>
          <Typography>{t.formula.monthlyRate}</Typography>
        </MathJax>
        <Box sx={{marginTop: '12px', marginBottom: '16px'}}>
          <Small>{t.formula.monthlyRateDescription}</Small>
          <Small>{t.formula.rate}</Small>
          <Small>{t.formula.n}</Small>
          <Small>{t.formula.pv}</Small>
          <Small>{t.formula.pmtDescription}</Small>
        </Box>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label={t.rate}
          type="number"
          fullWidth
          margin="normal"
          {...register('rate', {...validationOptions, max: getMaxValidationOption(200)})}
          error={!!errors.rate}
          helperText={errors.rate?.message}
          required
        />
        <TextField
          label={t.times}
          type="number"
          fullWidth
          margin="normal"
          {...register('times', {...validationOptions, max: getMaxValidationOption(1000)})}
          error={!!errors.times}
          helperText={errors.times?.message}
          required
        />
        <TextField
          label={t.presentValue}
          type="number"
          fullWidth
          margin="normal"
          {...register('presentValue', {...validationOptions, max: getMaxValidationOption(Number.MAX_SAFE_INTEGER)})}
          error={!!errors.presentValue}
          helperText={errors.presentValue?.message}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          {t.button}
        </Button>
      </form>
      {payment && (
        <Typography variant="h2" sx={{marginTop: '20px'}}>
          {t.result}
          <Bold>{payment}</Bold>
        </Typography>
      )}
    </>
  );
};

export default CalculatorView;
