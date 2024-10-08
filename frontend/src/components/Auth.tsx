import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { SignUp } from '../../../common/src/types';

export const Auth = ({ type }: { type: 'signup' | 'signin' }) => {
	const navigate = useNavigate();
	const [postInputs, setPostInputs] = useState<SignUp>({
		firstName: '',
		lastName: '',
		username: '',
		email: '',
		password: '',
	});

	async function sendRequest() {
		try {
			console.log(postInputs);
			const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === 'signup' ? 'signup' : 'signin'}`, postInputs, {
				headers: {
					'Content-Type': 'application/json',
				},
			});

			// Assuming the JWT is returned in response.data.jwt
			const jwt = response.data;
			console.log('JWT:', jwt);
			localStorage.setItem('token', jwt.jwt);

			// Navigate to the blogs page after successful signup/signin
			navigate('/blogs');
		} catch (e) {
			console.error('Error during signup/signin:', e);
			alert('Error while signing up/signing in');
		}
	}

	return (
		<div className="h-screen flex justify-center flex-col">
			<div className="flex justify-center">
				<div>
					<div className="px-10">
						<div className="text-3xl font-extrabold">{type === 'signup' ? 'Create an account' : 'Sign in'}</div>
						<div className="text-slate-500">
							{type === 'signin' ? "Don't have an account?" : 'Already have an account?'}
							<Link className="pl-2 underline" to={type === 'signin' ? '/signup' : '/signin'}>
								{type === 'signin' ? 'Sign up' : 'Sign in'}
							</Link>
						</div>
					</div>
					<div className="pt-8">
						{type === 'signup' && (
							<>
								<LabelledInput
									label="First Name"
									placeholder="First Name"
									onChange={(e) =>
										setPostInputs({
											...postInputs,
											firstName: e.target.value,
										})
									}
								/>
								<LabelledInput
									label="Last Name"
									placeholder="Last Name"
									onChange={(e) =>
										setPostInputs({
											...postInputs,
											lastName: e.target.value,
										})
									}
								/>
								<LabelledInput
									label="Username"
									placeholder="Username"
									onChange={(e) =>
										setPostInputs({
											...postInputs,
											username: e.target.value,
										})
									}
								/>
							</>
						)}
						<LabelledInput
							label="Email"
							placeholder="email@example.com"
							onChange={(e) =>
								setPostInputs({
									...postInputs,
									email: e.target.value,
								})
							}
						/>
						<LabelledInput
							label="Password"
							type="password"
							placeholder="Enter your password"
							onChange={(e) =>
								setPostInputs({
									...postInputs,
									password: e.target.value,
								})
							}
						/>
						<button
							onClick={sendRequest}
							type="button"
							className="text-white w-full mt-4 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
						>
							{type === 'signup' ? 'Sign up' : 'Sign in'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

interface LabelledInputType {
	label: string;
	placeholder: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
	return (
		<div className="mb-4">
			<label className="block mb-0.5 text-sm font-semibold text-black">{label}</label>
			<input
				onChange={onChange}
				type={type || 'text'}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				placeholder={placeholder}
				required
			/>
		</div>
	);
}
