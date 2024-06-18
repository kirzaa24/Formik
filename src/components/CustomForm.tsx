import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import styles from './CustomForm.module.scss';
import { FC, useState } from 'react';
import CustomField from './CustomField';

const validationSchema = Yup.object().shape({
	obligations: Yup.array().of(
		Yup.object().shape({
			type: Yup.string().required('Обязательное поле'),
			maxAttempts: Yup.number().required('Обязательное поле').min(1, 'Минимальное значение - 1')
		})
	)
});

const initialValues = {
	obligations: [
		{ type: 'creditCard', maxAttempts: 5, typeDisabled: true, checkSign: false },
		{ type: 'creditCard', maxAttempts: 4, typeDisabled: false, checkSign: false },
		{ type: 'creditCard', maxAttempts: 1, typeDisabled: false, checkSign: false },
		{ type: 'mortgage', maxAttempts: 1, typeDisabled: true, checkSign: false }
	]
};

const CustomForm: FC = () => {
	const [validateForm, setValidateForm] = useState(false);

	return (
		<div>
			<h1 style={{ marginBottom: '10px' }}>Obligation Form</h1>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={values => {
					console.log(values);
					setValidateForm(true);
				}}
			>
				{({ values, errors, touched }) => (
					<Form>
						<FieldArray name='obligations'>
							{({ remove, push }) => (
								<div className='flex flex-col gap-6'>
									{values.obligations.map((obligation, index) => (
										<CustomField
											key={index}
											index={index}
											{...obligation}
											errors={errors}
											touched={touched}
											values={values}
											remove={remove}
										/>
									))}
									<button
										type='button'
										className={styles.addButton}
										onClick={() =>
											push({
												id: values.obligations.length + 1,
												type: 'creditCard',
												maxAttempts: 1
											})
										}
									>
										Добавить настройку счётчика
									</button>
								</div>
							)}
						</FieldArray>
						<div className='flex gap-2'>
							<button
								type='submit'
								className={styles['button-blue']}
							>
								Сохранить
							</button>
							<button
								type='reset'
								className={styles.button}
								onClick={() => setValidateForm(false)}
							>
								Отмена
							</button>
						</div>
					</Form>
				)}
			</Formik>
			<div>{validateForm && 'Форма отправлена'}</div>
		</div>
	);
};

export default CustomForm;
