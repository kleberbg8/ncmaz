'use client'
import { FC, useEffect, useState } from 'react'
import NcDropDown, { NcDropDownItem } from '../NcDropDown/NcDropDown'
import { SOCIALS_DATA, TSocialShareItem } from '../SocialsShare/SocialsShare'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import getTrans from '@/utils/getTrans'
import { Share05Icon } from '../Icons/Icons'

export interface Props {
	className?: string
	bgClass?: string
	sizeClass?: string
	itemClass?: string
	href?: string
}
const T = getTrans()

type TDropDownShareItem = TSocialShareItem | 'copylink'

const initActions: NcDropDownItem<TDropDownShareItem>[] = [
	{
		id: 'copylink',
		name: T['Copy link'],
		icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
</svg>`,
	},
	...SOCIALS_DATA,
]

const SocialsShareDropdown: FC<Props> = ({
	className = ' ',
	sizeClass = 'h-9 w-9',
	bgClass = 'bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700',
	itemClass,
	href = '',
}) => {
	// get current link to share
	const [currentLink, setCurrentLink] = useState(href || '')
	const router = useRouter()

	// update current link to share
	useEffect(() => {
		setCurrentLink(window.location.href)
	}, [router])

	const link = currentLink || ''

	const handleClick = (item: NcDropDownItem<TDropDownShareItem>) => {
		if (item.id === 'copylink') {
			navigator.clipboard.writeText(link)
			toast.success(T['Link copied to clipboard'])
			return
		}
	}

	const actions = initActions.map((item) => {
		if (item.id === 'Facebook') {
			item.href = `https://www.facebook.com/sharer/sharer.php?u=${link}`
		} else if (item.id === 'Twitter') {
			item.href = `https://twitter.com/intent/tweet?url=${link}`
		} else if (item.id === 'Linkedin') {
			item.href = `https://www.linkedin.com/shareArticle?mini=true&url=${link}`
		}
		return item
	})

	return (
		<div className={`nc-SocialsShare flex-shrink-0 ${className}`}>
			<NcDropDown
				className={`flex flex-shrink-0 items-center justify-center rounded-full text-neutral-700 focus:outline-none dark:text-neutral-200 ${sizeClass} ${bgClass}`}
				renderTrigger={() => <Share05Icon className="h-[18px] w-[18px]" />}
				onClick={handleClick}
				data={actions}
				dropdownItemsClass={itemClass}
			/>
		</div>
	)
}

export default SocialsShareDropdown
