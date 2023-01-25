export const authControllersHandleErrors = (error) => {
  console.log(error.message, error.code)
  let errorMessage = ''
  if (error.message.includes('Please enter a first name')) {
    errorMessage = 'Please enter a first name'
  } else if (error.message.includes('Please enter a last name')) {
    errorMessage = 'Please enter a last name'
  } else if (error.message.includes('Please enter a username')) {
    errorMessage = 'Please enter a username'
  } else if (error.message.includes('Please enter a birthday')) {
    errorMessage = 'Please enter a birthday'
  } else if (error.message.includes('Please enter an email')) {
    errorMessage = 'Please enter an email'
  } else if (error.message.includes('Please enter a valid email')) {
    errorMessage = 'Please enter a valid email'
  } else if (error.message.includes('Please enter a password')) {
    errorMessage = 'Please enter a password'
  } else if (error.message.includes('Password length is less than 8 characters')) {
    errorMessage = 'Password length is less than 8 characters'
  } else if (error.message.includes('Please enter a valid password with at least 8 characters, 1 number, 1 special character')) {
    errorMessage = 'Please enter a valid password with at least 8 characters, 1 number, 1 special character'
  }
  if (errorMessage != '') {
    return errorMessage
  }
  return error.message
}
