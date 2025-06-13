function range(min, value, max) {
    return (
        value < min ? min :
            value > max ? max :
                value
    );
}

export default range;