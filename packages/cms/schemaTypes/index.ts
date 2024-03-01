import personalCareConcern from './attendeePrepTypes/personalCareConcern'
import travelOption from './attendeePrepTypes/travelOption'
import weatherConcern from './attendeePrepTypes/weatherConcern'
import blockContent from './blockContent'
import venueImage from './venueImage'
import welcomePage from './welcomePage'

const attendeePrepTypes = [
    personalCareConcern,
    travelOption,
    weatherConcern
]

export const schemaTypes = [
    welcomePage,
    venueImage,
    blockContent,
    ...attendeePrepTypes
]
