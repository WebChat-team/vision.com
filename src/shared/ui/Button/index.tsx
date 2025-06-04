// imports =================================================== //
import Loader from '../Loader';
import getClassName from './helpers/getClassName';
import type { Button as ButtonType } from './types';

// main ====================================================== //
const Button: ButtonType = ({
    isLoading = false,
    wide = false,
    level = "primary",
    className,
    children,
    ...props
}) => {

    return (
        <button
            className={getClassName(wide, level, className)}
            disabled={isLoading}
            {...props}
        >
            {children}
            {isLoading && <Loader />}
        </button>
    );

};

// exports ================================================== //
export default Button;