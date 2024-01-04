import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from 'shared/ui/Input'
import UserIcon from 'shared/icons/general/user.svg'
import PasswordIcon from 'shared/icons/general/password.svg'
import EyeIcon from 'shared/icons/general/eye.svg'
import styles from './AuthForm.module.less'
import CrossIcon from 'shared/icons/general/cross.svg'
import { memo, useCallback, useMemo, useState } from 'react'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import { HStack, VStack } from 'shared/ui/Flex'
import Heading from 'shared/ui/Heading/Heading'
import Button from 'shared/ui/Button/ui/Button'
import { ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'
import { Spinner } from 'shared/ui/Spinner'
import { Paragraph } from 'shared/ui/Paragraph'
import { FormErrorMap } from 'shared/lib/FormErrorMap/FormErrorMap'

export type Inputs = {
	email: string
	password: string
}

interface AuthFormProps {
	onSubmit?: (credentials: Inputs) => void
	heading?: string
	buttonText?: string
	isLoading?: boolean
	error?: string
}

export default memo(function AuthForm({
	buttonText = 'Sign in',
	heading = 'PLAY NOW!',
	onSubmit,
	isLoading,
	error,
}: AuthFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		defaultValues: {
			email: '',
			password: '',
		},
	})
	const onSubmit_: SubmitHandler<Inputs> = (data) => onSubmit?.(data)

	const [hidden, setHidden] = useState<boolean>(true)

	const toggleHidden = useCallback(() => {
		setHidden((prev) => !prev)
	}, [])

	const emailOptions = useMemo(() => ({ required: true }), [])
	const passwordOptions = useMemo(() => ({ required: true, minLength: 8  }), [])


	const passwordEnd = useMemo(
		() => (
			<button
				type='button'
				className={ClassNames(styles.toggle, {
					[styles.clicked]: !hidden,
				})}
				onClick={toggleHidden}
			>
				<EyeIcon />
			</button>
		),
		[hidden],
	)

	const emailStart = useMemo(() => <UserIcon />, [])
	const passwordStart = useMemo(() => <PasswordIcon />, [])

	return (
		<VStack
			gap={28}
			as='form'
			aria-autocomplete='both'
			aria-required='true'
			onSubmit={handleSubmit(onSubmit_)}
			className={ClassNames(ColorMapper('item-dark', 'bg'), {}, [
				styles.modal,
			])}
		>
			<Heading size={2} align='center'>
				{heading}
			</Heading>
			<VStack gap={4}>
				<Input
					start={emailStart}
					{...register('email', emailOptions)}
					placeholder='Email'
					type='email'
					aria-label='Email'
				/>
				{errors.email && (
					<span
						className={ClassNames(styles.error, {}, [
							ColorMapper('secondary', 'text'),
						])}
					>
						{FormErrorMap(emailOptions)[errors.email.type]}
					</span>
				)}
			</VStack>
			<VStack gap={4}>
				<Input
					start={passwordStart}
					end={passwordEnd}
					{...register('password', passwordOptions)}
					placeholder='Password'
					type={hidden ? 'password' : 'text'}
					aria-label='Password'
				/>
				{errors.password && (
					<span
						className={ClassNames(styles.error, {}, [
							ColorMapper('secondary', 'text'),
						])}
					>
						{FormErrorMap(passwordOptions)[errors.password.type]}
					</span>
				)}
			</VStack>
			{isLoading ? (
				<Spinner className={styles.spinner} />
			) : (
				<Button className={styles.button} type='submit'>
					{buttonText}
				</Button>
			)}
			{error ? (
				<HStack
					gap={32}
					align='align-center'
					className={ClassNames(ColorMapper('error', 'bg'), {}, [
						styles.error,
						ColorMapper('primary', 'text'),
					])}
				>
					<CrossIcon />
					<Paragraph>{error}</Paragraph>
				</HStack>
			) : null}
		</VStack>
	)
})
