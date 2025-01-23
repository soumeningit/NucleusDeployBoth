import React from 'react'

export function ExtractTimeAndDate(data) {
    let createdAt = data;
    let dateObject = new Date(createdAt);
    let day = dateObject.getDate().toString().padStart(2, '0');
    let month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    let year = dateObject.getFullYear();

    let actualDate = day + "/" + month + "/" + year
    let actualTime = dateObject.toLocaleTimeString(); // Extract time

    return `${actualDate} at ${actualTime}`;
}