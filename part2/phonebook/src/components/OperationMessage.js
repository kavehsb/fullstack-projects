const OperationMessage = ({message, operation}) => {
    if (message === null) {
        return null
    } else if (operation === 'Delete') {
        return (
            <div className='delMessage'>
                {message}
            </div>
        )
    }
    return (
        <div className='opMessage'>
            {message}
        </div>
    )
}

export default OperationMessage