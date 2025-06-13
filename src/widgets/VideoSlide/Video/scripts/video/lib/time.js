
function getTimeInMs(videoTime) {
    return Math.round(videoTime * 1000);
}

function getFormatedTime(timeInSeconds = 0) {

    if (Number.isNaN(timeInSeconds)) return "";

    const timeInMilliseconds = Math.floor(timeInSeconds * 1000);
    const hours = Math.floor(timeInMilliseconds / 3600000);
    const minutes = Math.floor((timeInMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);

    const formattedTime = [
        hours > 0 ? String(hours) : null, 
        hours === 0 ? String(minutes) : String(minutes).padStart(2, "0"),
        String(seconds).padStart(2, "0")
    ];

    return formattedTime.filter((time) => time && time.length).join(":");

}

export { getTimeInMs, getFormatedTime };