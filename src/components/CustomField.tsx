import { ErrorMessage, Field, type FormikErrors, getIn, type FormikTouched } from 'formik';
import styles from './CustomForm.module.scss';
import type { FC } from 'react';
import type { IObligations, IField } from './types';

const obligationTypes = [
	{ value: 'creditCard', label: 'Кредитная карта' },
	{ value: 'mortgage', label: 'Ипотечный кредит' }
];

interface CustomFieldProps extends IField {
	index: number;
	errors: FormikErrors<IObligations>;
	touched: FormikTouched<IObligations>;
	remove: <X = any>(index: number) => X | undefined;
	values: IObligations;
}

const CustomField: FC<CustomFieldProps> = ({ index, errors, touched, typeDisabled, values, remove }) => {
	const typeError = getIn(errors, `obligations[${index}].type`);
	const typeTouched = getIn(touched, `obligations[${index}].type`);
	const maxAttemptsError = getIn(errors, `obligations[${index}].maxAttempts`);
	const maxAttemptsTouched = getIn(touched, `obligations[${index}].maxAttempts`);

	return (
		<div className={styles.fieldWrapper}>
			<label className={styles.field}>
				<h6 className={styles.title}>
					Тип обязательства <span style={{ color: 'red' }}>*</span>
				</h6>
				<Field
					as='select'
					name={`obligations[${index}].type`}
					disabled={typeDisabled}
					value={values.obligations[index].type || ''}
					className={typeError && typeTouched ? styles.errorInput : ''}
				>
					{obligationTypes.map(type => (
						<option
							key={type.value}
							value={type.value}
						>
							{type.label}
						</option>
					))}
				</Field>
				<ErrorMessage
					name={`obligations[${index}].type`}
					component='div'
					className={styles.errorMessage}
				/>
			</label>
			<label className={styles.field}>
				<h6 className={styles.title}>
					Максимальное количество попыток <span style={{ color: 'red' }}>*</span>
				</h6>
				<Field
					type='number'
					name={`obligations[${index}].maxAttempts`}
					min='0'
					value={values.obligations[index].maxAttempts || ''}
					className={maxAttemptsError && maxAttemptsTouched ? styles.errorInput : ''}
				/>
				<ErrorMessage
					name={`obligations[${index}].maxAttempts`}
					component='div'
					className={styles.errorMessage}
				/>
			</label>
			<label className={styles.switchLabel}>
				<div className='flex items-center gap-2'>
					<Field
						type='checkbox'
						name={`obligations[${index}].checkSign`}
						className={styles.switchInput}
					/>
					<span className={styles.switchSlider}></span>
					<span className='text-xs text-[#2f3441]'>Признак работы механизма</span>
				</div>
			</label>
			<div className='ml-auto'>
				<button
					type='button'
					onClick={() => remove(index)}
					className='text-sm text-red-500'
				>
					Удалить
				</button>
			</div>
		</div>
	);
};

export default CustomField;
