import React from 'react'
import { Skeleton } from './Skeleton'
import { User } from './User'
import Modal from '../Modal'

export const Users = ({
	items,
	isLoading,
	searchValue,
	onChangeSearchValue,
	invites,
	onClickInvite,
	onClickSendInvites,
	handleAddUser,
	userData,
	handleInputChange,
	isModal,
	modalShow,
	handleFileChange,
	fileLoaded,
}) => {
	return (
		<>
			{isModal ? (
				<Modal
					userData={userData}
					handleInputChange={handleInputChange}
					handleAddUser={handleAddUser}
					handleFileChange={handleFileChange}
					fileLoaded={fileLoaded}
				/>
			) : (
				<div className='search'>
					<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
						<path d='M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z' />
					</svg>
					<input
						value={searchValue}
						onChange={onChangeSearchValue}
						type='text'
						placeholder='Найти пользователя...'
					/>
					<img
						onClick={modalShow}
						className='users-add'
						src='/assets/plus.svg'
						alt='Action'
					/>
				</div>
			)}
			{isLoading ? (
				<div className='skeleton-list'>
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</div>
			) : (
				<ul className='users-list'>
					{/*
          Поиск по имени или почте
          toLowerCase() - перевод в нижний регистр
          */}
					{items
						.filter(obj => {
							const fullName = (obj.first_name + obj.last_name).toLowerCase()

							return (
								fullName.includes(searchValue.toLowerCase()) ||
								obj.email.toLowerCase().includes(searchValue)
							)
						})
						.map(obj => (
							<User
								onClickInvite={onClickInvite}
								isInvited={invites.includes(obj.id)}
								{...obj}
								key={obj.id}
							/>
							// или получить все пропсы из объекта по отдельности, или все сразу - { ...obj }
						))}
				</ul>
			)}
			{invites.length > 0 && (
				<button onClick={onClickSendInvites} className='send-invite-btn'>
					Отправить приглашение
				</button>
			)}
		</>
	)
}
