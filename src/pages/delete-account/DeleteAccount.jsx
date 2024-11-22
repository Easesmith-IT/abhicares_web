import React, { useState } from 'react';
import WebsiteWrapper from '../WebsiteWrapper';
import classes from './DeleteAccount.module.css';
import DeleteAccountModal from '../../components/delete-account-modal/DeleteAccountModal';

const DeleteAccount = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({ name: '', phone: '' });
    const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePhoneChange = (e) => {
        const input = e.target.value;
        if (input.length <= 10) {
            setPhone(input);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = {};

        if (!name.trim()) {
            validationErrors.name = 'Name is required.';
        }

        if (phone.length !== 10) {
            validationErrors.phone = 'Phone number must be exactly 10 digits.';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            setIsDeleteAccountModalOpen(true);
            // Proceed with form submission or API call
            console.log('Form submitted with:', { name, phone });
        }
    };

    return (
        <WebsiteWrapper>
            <div className={classes.delete_account_wrapper}>
                <h1>Delete Account</h1>
                <form onSubmit={handleSubmit}>
                    <div className={classes.input_container}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={handleNameChange}
                        />
                        {errors.name && <p className={classes.error}>{errors.name}</p>}
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="number"
                            name="phone"
                            id="phone"
                            value={phone}
                            onChange={handlePhoneChange}
                        />
                        {errors.phone && <p className={classes.error}>{errors.phone}</p>}
                    </div>
                    <button type="submit">Delete</button>
                </form>

                {isDeleteAccountModalOpen &&
                    <DeleteAccountModal
                        isOpen={isDeleteAccountModalOpen}
                        setIsDeleteModalOpen={setIsDeleteAccountModalOpen}
                    />
                }
            </div>
        </WebsiteWrapper>
    );
};

export default DeleteAccount;
