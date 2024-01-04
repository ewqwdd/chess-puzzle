import { User } from 'entities/User'
import { HStack, VStack } from 'shared/ui/Flex'
import styles from './Profile.module.less'
import { Skeleton } from 'shared/ui/Skeleton'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import { ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'
import Heading from 'shared/ui/Heading/Heading'
import { Paragraph } from 'shared/ui/Paragraph'
import { Logo } from 'shared/ui/logo'
import { TimerToString } from 'entities/Timer'
import { Spinner } from 'shared/ui/Spinner'
import { memo, useCallback, useEffect } from 'react'
import { useNotify } from 'entities/Notification'
import { useForm } from 'react-hook-form'
import { TextArea } from 'shared/ui/TextArea'
import Button from 'shared/ui/Button/ui/Button'
import { inputOptions } from './inputOptions'
import InputWithError from './InputWithError/InputWithError'
import { FormErrorMap } from 'shared/lib/FormErrorMap/FormErrorMap'
import { useWindowResize } from 'shared/hooks/useWindowResize'

interface ProfileProps {
	className?: string
	user: User
	averageTime?: number
	solved?: number
	statsLoading?: boolean
	statsError?: string
	edit?: boolean
	toggleEdit?: () => void
	onSubmit?: (e: DeepPartial<User>) => void
}
export default memo(function Profile({
	user,
	className,
	averageTime,
	solved,
	statsError,
	statsLoading,
	edit = true,
	toggleEdit,
	onSubmit,
}: ProfileProps) {
	const { add } = useNotify()
	const {width} = useWindowResize()
	const { register, handleSubmit, formState, reset } = useForm<
		DeepPartial<User>
	>({
		values: {
			description: user.description,
			email: user.email,
			lastName: user.lastName,
			firstName: user.firstName,
			username: user.username,
		},
	})

	const cancel = useCallback(() => {
		reset()
		toggleEdit?.()
	}, [toggleEdit, reset])

	const submitFunc = handleSubmit((e) => {
		onSubmit?.(e)
	})

	useEffect(() => {
		if (statsError) add(statsError)
	}, [statsError])
	const statsContent = (
		<>
			<HStack gap={8} align='align-center' className={styles.end}>
				<Paragraph size={4} color='secondary'>
					Avg:
				</Paragraph>
				<Logo size={2} className={styles.logo}>
					{Number.isInteger(averageTime) ? (
						<TimerToString timer={Number(averageTime)} />
					) : (
						'00:00'
					)}
				</Logo>
			</HStack>
		</>
	)
	console.log(formState.errors)

	return (
		<HStack
			className={ClassNames(className)}
			onSubmit={submitFunc}
			as={edit ? 'form' : undefined}
		>
			{user.avatar ? (
				<img src={user.avatar} className={styles.avatar} />
			) : (
				<Skeleton
					color={'secondary'}
					className={ClassNames(styles.avatar, {}, [
						ColorMapper('dark', 'text'),
					])}
				/>
			)}
			<VStack align='align-stretch' className={styles.details} gap={14}>
				<HStack justify='between'>
					{edit ? (
						<InputWithError
							{...register('username', inputOptions['username'])}
							variant='mui'
							placeholder='Username'
						>
							{formState.errors.username &&
								FormErrorMap(inputOptions['username'])[
									formState.errors.username.type
								]}
						</InputWithError>
					) : (
						<Heading size={2}>{user.username}</Heading>
					)}
					<VStack className={styles.stats}>
						{statsLoading ? <Spinner /> : statsContent}
					</VStack>
				</HStack>
				<HStack justify='between' gap={8}>
					<VStack gap={14}>
						<HStack gap={8}>
							{edit ? (
								<InputWithError
									{...register(
										'firstName',
										inputOptions['firstName'],
									)}
									variant='mui'
									placeholder='First name'
								>
									{formState.errors.firstName &&
										FormErrorMap(inputOptions['firstName'])[
											formState.errors.firstName.type
										]}
								</InputWithError>
							) : (
								<Paragraph size={2} as='span'>
									{user.firstName}
								</Paragraph>
							)}
							{edit ? (
								<InputWithError
									{...register(
										'lastName',
										inputOptions['lastName'],
									)}
									variant='mui'
									placeholder='Last name'
								>
									{formState.errors.lastName &&
										FormErrorMap(inputOptions['lastName'])[
											formState.errors.lastName.type
										]}
								</InputWithError>
							) : (
								<Paragraph size={2} as='span'>
									{user.lastName}
								</Paragraph>
							)}
						</HStack>
						{edit ? (
							<InputWithError
								{...register('email', inputOptions['email'])}
								variant='mui'
								type='email'
								placeholder='Email'
							>
								{formState.errors.email &&
									FormErrorMap(inputOptions['email'])[
										formState.errors.email.type
									]}
							</InputWithError>
						) : (
							<Paragraph size={2} as='span'>
								{user.email}
							</Paragraph>
						)}
						{edit ? (
							<VStack gap={4}>
								<TextArea
									className={styles.textarea}
									variant='mui'
									placeholder='Description'
									{...register(
										'description',
										inputOptions['description'],
									)}
								/>
								{formState.errors.description && (
									<Paragraph size={4} color='warning'>
										{
											FormErrorMap(
												inputOptions['description'],
											)[formState.errors.description.type]
										}
									</Paragraph>
								)}
							</VStack>
						) : (
							<Paragraph className={styles.description} size={3}>
								{user.description}
							</Paragraph>
						)}
					</VStack>
					<VStack className={styles.end} gap={14}>
						<HStack gap={18} align='align-center'>
							<Paragraph size={4} color='secondary'>
								Solved:
							</Paragraph>
							<Logo size={3} className={styles.logo}>
								{Number.isInteger(solved) ? solved : null}
							</Logo>
						</HStack>
						<Button
							color='bg-primary'
							type={'reset'}
							onClick={cancel}
						>
							<Paragraph size={3} textAlign='center'>
								{edit ? 'Cancel' : 'Edit'}
							</Paragraph>
						</Button>
						{edit && (
							<Button color='bg-secondary' type={'submit'}>
								<Paragraph size={3} textAlign='center'>
									Submit
								</Paragraph>
							</Button>
						)}
					</VStack>
				</HStack>
			</VStack>
		</HStack>
	)
})
