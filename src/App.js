import React, { useState, useEffect } from 'react'
import './index.scss'
import { Success } from './components/Success'
import { Users } from './components/Users'

// Тут список пользователей: https://reqres.in/api/users

function App() {
	const [users, setUsers] = useState([])
	const [userData, setUserData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		avatar: '',
	})
	// const [lastName, setLastName] = useState('')
	// const [email, setEmail] = useState('')
	// const [avatar, setAvatar] = useState('')
	const [invites, setInvites] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [success, setSuccess] = useState(false)
	const [isModal, setIsModal] = useState(false)
	const [searchValue, setSearchValue] = useState('')

	// {
	// 	fetch('https://reqres.in/api/users')
	// 		.then(res => res.json())
	// 		.then(json => {
	// 			setUsers(json.data)
	// 		})
	// 		.catch(err => {
	// 			console.warn(err)
	// 			alert('Ошибка при получении пользователей')
	// 		})
	// 		.finally(() => setIsLoading(false))
	// }
	const fetchUsers = async () => {
		try {
			const response = await fetch(
				'https://65126cf9b8c6ce52b3959ac0.mockapi.io/users'
			)
			if (!response.ok) {
				throw new Error('Failed to fetch users')
			}
			const data = await response.json()
			setUsers(data)
			setIsLoading(false)
		} catch (error) {
			console.error('Error fetching users:', error)
			alert('Ошибка при получении пользователей')
			setIsLoading(false)
		}
	}
	useEffect(() => {
		fetchUsers()
	}, [])

	const onChangeSearchValue = event => {
		setSearchValue(event.target.value)
	}

	// Проверка пользователей по id, если id нет в массиве, то добавляем, если есть - удаляем
	const onClickInvite = id => {
		if (invites.includes(id)) {
			setInvites(prev => prev.filter(_id => _id !== id))
		} else {
			setInvites(prev => [...prev, id])
		}
	}

	const onClickSendInvites = () => {
		setSuccess(true)
	}
	const onClickClosedSuccess = () => {
		setSuccess(false)
	}
	const modalShow = () => {
		setIsModal(true)
	}

	const handleInputChange = e => {
		const { name, value } = e.target
		setUserData({
			...userData,
			[name]: value,
		})
	}
	//обработка файла

	const handleAddUser = async () => {
		try {
			const response = await fetch(
				'https://65126cf9b8c6ce52b3959ac0.mockapi.io/users',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(userData),
				}
			)

			if (!response.ok) {
				throw new Error('Failed to add user')
			}

			// Обновляем список пользователей после успешного добавления
			fetchUsers()
			console.log(userData)
			setIsModal(false)
		} catch (error) {
			console.error('Error adding user:', error)
			alert('Ошибка при добавлении пользователя')
		}
	}

	return (
		<div className='App'>
			{success ? (
				<Success
					count={invites.length}
					onClickClosedSuccess={onClickClosedSuccess}
				/>
			) : (
				<Users
					isModal={isModal}
					modalShow={modalShow}
					userData={userData}
					handleInputChange={handleInputChange}
					items={users}
					isLoading={isLoading}
					searchValue={searchValue}
					onChangeSearchValue={onChangeSearchValue}
					onClickSendInvites={onClickSendInvites}
					invites={invites}
					onClickInvite={onClickInvite}
					handleAddUser={handleAddUser}
				/>
			)}
		</div>
	)
}

export default App
