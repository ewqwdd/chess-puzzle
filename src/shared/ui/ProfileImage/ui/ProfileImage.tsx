import { getAvatarLoading, getUser } from 'entities/User'
import { HTMLAttributes } from 'react'
import { useSelector } from 'react-redux'
import { Skeleton } from 'shared/ui/Skeleton'
import UserIcon from 'shared/icons/general/user.svg'

interface ProfileImageProps extends HTMLAttributes<HTMLImageElement> {

}

export default function ProfileImage({className, ...props}: ProfileImageProps) {
	const isLoading = useSelector(getAvatarLoading)
	const avatar = useSelector(getUser)?.avatarUrl

	if (isLoading) {
		return <Skeleton className={className} icon={'img'}/>
	}
	if (!avatar) {
		<UserIcon className={className} />
	}

	return (
		<img src={avatar} className={className} {...props} />
	)
}
