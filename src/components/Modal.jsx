import React from 'react'
const Modal = ({ handleAddUser, userData, handleInputChange, handleFileChange, fileLoaded }) => {
	return (
		<div className='add_user-block'>
			<input
				type='text'
				value={userData.first_name}
				name='first_name'
				onChange={handleInputChange}
				placeholder='Имя'
			/>
			<input
				type='text'
				value={userData.last_name}
				name='last_name'
				onChange={handleInputChange}
				placeholder='Фамилия'
			/>
			<input
				type='email'
				value={userData.email}
				name='email'
				onChange={handleInputChange}
				placeholder='Email'
			/>
			<div className='file-upload'>
				<label>
					<input 
					type='file' 
					name='avatar'
					accept='image/*'
					onChange={handleFileChange} />
					<span>Загрузить аватарку</span>
				</label>
			</div>
			{fileLoaded && <span>Аватарка успешно загружена!</span>}
		
			<button onClick={handleAddUser} className='send-add-btn'>
				Добавить
			</button>
		</div>
	)
}
export default Modal
