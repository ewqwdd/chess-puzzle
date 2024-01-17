import { User, userActions } from 'entities/User'
import { HStack, VStack } from 'shared/ui/Flex'
import styles from './Profile.module.less'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import Heading from 'shared/ui/Heading/Heading'
import { Paragraph } from 'shared/ui/Paragraph'
import { Logo } from 'shared/ui/logo'
import { TimerToString } from 'entities/Timer'
import { Spinner } from 'shared/ui/Spinner'
import { memo, useCallback, useEffect, useState } from 'react'
import { useNotify } from 'entities/Notification'
import { useForm } from 'react-hook-form'
import { TextArea } from 'shared/ui/TextArea'
import Button from 'shared/ui/Button/ui/Button'
import { inputOptions } from './inputOptions'
import InputWithError from './InputWithError/InputWithError'
import { FormErrorMap } from 'shared/lib/FormErrorMap/FormErrorMap'
import { ProfileImage } from 'shared/ui/ProfileImage'
import ImageUpload from 'shared/ui/ImageUpload/ui/ImageUpload'
import { Props } from 'pages/ProfilePage/model/service/putProfile'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'

interface ProfileProps {
	className?: string
	user: User
	averageTime?: number
	solved?: number
	statsLoading?: boolean
	statsError?: string
	edit?: boolean
	toggleEdit?: () => void
	onSubmit?: (e: DeepPartial<Props>) => Promise<void>
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
	const dispatch = useAppDispatch()
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
	const [image, setImage] = useState<File | null>(null)
	
	const uploadFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setImage(e.target.files?.[0] || null)
	}, [])

	const clearFile = useCallback(() => {
		setImage(null)
	}, [])

	const cancel = useCallback(() => {
		reset()
		toggleEdit?.()
		setImage(null)
	}, [toggleEdit, reset])

	const submitFunc = handleSubmit(async (e) => {
		await onSubmit?.({...e, avatar: image ?? undefined})
		if (image) {
			dispatch(userActions.setAvatar(URL.createObjectURL(image)))
		}
		setImage(null)
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
					{(typeof averageTime === 'number') ? (
						<TimerToString timer={Number(averageTime)} />
					) : (
						'00:00'
					)}
				</Logo>
			</HStack>
		</>
	)

	return (
		<HStack
			className={ClassNames(className, {}, [styles.avatarUrl])}
			onSubmit={submitFunc}
			as={edit ? 'form' : undefined}
		>
			{edit ? (
				<ImageUpload className={styles.avatar} onChange={uploadFile} clear={clearFile} preview={image ?? undefined}/>
			) : (
				<ProfileImage className={styles.avatar} />
			)}
			<VStack align='align-stretch' className={styles.details} gap={14}>
				<HStack justify='between' className={styles.heading}>
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
				<HStack justify='between' gap={8} className={styles.data}>
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
