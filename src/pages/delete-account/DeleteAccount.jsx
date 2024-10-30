import WebsiteWrapper from '../WebsiteWrapper'
import classes from './DeleteAccount.module.css'

const DeleteAccount = () => {
    return (
        <WebsiteWrapper>
            <div className={classes.delete_account_wrapper}>
                <h1>Delete Account</h1>
                <form action="">
                    <div className={classes.input_container}>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="phone">Phone</label>
                        <input type="number" name="phone" id="phone" />
                    </div>
                    <button>Delete</button>
                </form>
            </div>
        </WebsiteWrapper>
    )
}

export default DeleteAccount