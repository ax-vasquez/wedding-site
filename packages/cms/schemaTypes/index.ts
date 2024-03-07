import personalCareConcern from './attendeePrepTypes/personalCareConcern'
import travelOption from './attendeePrepTypes/travelOption'
import weatherConcern from './attendeePrepTypes/weatherConcern'
import blockContent from './blockContent'
import venueImage from './venueImage'
import venueInfo from './venueTypes/venueInfo'
import welcomePage from './welcomePage'

const attendeePrepTypes = [
    personalCareConcern,
    travelOption,
    weatherConcern
]

const venueTypes = [
    venueInfo
]

export const schemaTypes = [
    welcomePage,
    venueImage,
    blockContent,
    ...attendeePrepTypes,
    ...venueTypes
]
