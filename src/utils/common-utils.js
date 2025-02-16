export const downloadMedia = async (e, originalImage) => {
    console.log(originalImage)
    e.preventDefault();
    try {
        fetch(originalImage)
            .then(resp => resp.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                console.log(url)
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;

                const nameSplit = originalImage.split("/");
                const duplicateName = nameSplit.pop();

                // the filename you want
                a.download = "" + duplicateName + "";
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => console.log('Error while downloading the image ', error))

    } catch (error) {
        console.log('Error while downloading the image ', error);
    }
}

export const formatTime = (mongoDate) => {
    // Create a Date object from the MongoDB date
    const date = new Date(mongoDate);

    // Get hours, minutes, and whether it's AM or PM
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';

    // Convert 24-hour time to 12-hour time
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be treated as 12

    // Pad minutes to ensure two digits
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    // Return the formatted time in the "HH.MM am/pm" format
    return `${hours}.${formattedMinutes} ${ampm}`;
}

export const formatMongoDate = (date) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const daySuffix = (day) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };
    return `${day}${daySuffix(day)} ${month}, ${year}`;

}


export function extractTimeFromDate(mongoDate) {
    if (!(mongoDate instanceof Date)) {
      throw new Error(
        "Invalid date. Please provide a valid MongoDB Date object."
      );
    }

    // Extract hours and minutes
    let hours = mongoDate.getHours();
    const minutes = String(mongoDate.getMinutes()).padStart(2, "0");

    // Determine AM/PM
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'

    // Format the time as hh:mm AM/PM
    const formattedTime = `${String(hours).padStart(
      2,
      "0"
    )}:${minutes} ${ampm}`;
    return formattedTime;
  }