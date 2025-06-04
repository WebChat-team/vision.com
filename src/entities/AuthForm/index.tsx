"use client"

import Button from '@/shared/ui/Button';
// imports ================================================== //
import styles from './index.module.css';
import type { AuthForm as AuthFormType } from './types';
import { FormEvent, useState } from 'react';

// main ===================================================== // 
const AuthForm: AuthFormType = ({ children, name, onSubmit, ...props }) => {

    const [isPending, setIsPending] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {

        setIsPending(true);

        if (onSubmit) {
            if (onSubmit.constructor.name === "AsyncFunction") {
                await onSubmit(event);
            } else {
                onSubmit(event);
            }
        }

        setIsPending(false);

    }

    return (
        <div className={styles.container_form} >
            <h2 className={styles.title}>
                {name}
            </h2>
            <form
                onSubmit={handleSubmit}
                className={styles.form}
                {...props}
            >
                {children}
                <Button
                    wide
                    level="primary"
                    type="submit"
                    isLoading={isPending}
                >
                    Продолжить
                </Button>
            </form>
        </div>
    );
}

// export =================================================== //
export default AuthForm;