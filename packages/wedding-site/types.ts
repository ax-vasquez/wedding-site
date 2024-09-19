export type ParallaxImageData = {
    title: string
    imageUrl: string
    key: {
        current: string
        _type: 'slug'
    }
}

export type PreparationItemData = {
    title: string
    description: any
    mitigations: string[]
}

export type VenueInfoItemData = {
    title: string
    venueOverview: any
    venueContact: string[]
    venueAddress: any
    venueHours: string[]
    venueAmenities: string[]
    roomAmenities: string[]
    dogAmenities: string[]
}

export type ApiResponseV1 = {
    status: number
    message: string
    data: {
        token: string | null
        refresh_token: string | null
    }
}
